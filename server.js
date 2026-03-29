import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "public");
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const USER_AGENT = "CometHunter/1.0 (+local observatory dashboard)";

const DEFAULT_OBSERVER = {
  label: "Sarajevo",
  latitude: 43.8563,
  longitude: 18.4131,
  elevationKm: 0.55
};

const SOURCE_GUIDE = [
  {
    key: "aerith",
    name: "Seiichi Yoshida / Aerith",
    purpose: "Sedmična selekcija vidljivih kometa i praktični komentari za amatere.",
    url: "http://www.aerith.net/comet/weekly/current.html"
  },
  {
    key: "jplSbdb",
    name: "JPL Small-Body Database",
    purpose: "Orbitalni elementi, klase orbita i nesigurnosti parametara.",
    url: "https://ssd-api.jpl.nasa.gov/doc/sbdb.html"
  },
  {
    key: "jplHorizons",
    name: "JPL Horizons",
    purpose: "Precizna trenutna efemerida za zadanu lokaciju posmatrača.",
    url: "https://ssd-api.jpl.nasa.gov/doc/horizons.html"
  },
  {
    key: "cobs",
    name: "COBS",
    purpose: "Svježa mjerenja sjaja, kome i repa od posmatrača širom svijeta.",
    url: "https://cobs.si/help/cobs_api/observation_list_api/"
  },
  {
    key: "mpc",
    name: "Minor Planet Center",
    purpose: "Službena orbitna i opservaciona evidencija IAU/MPC.",
    url: "https://www.minorplanetcenter.net/db_search"
  },
  {
    key: "theskylive",
    name: "TheSkyLive",
    purpose: "Finder karte i vizuelna provjera po kometi.",
    url: "https://theskylive.com/comets"
  }
];

const cache = new Map();

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

const HTML_ENTITIES = new Map([
  ["&nbsp;", " "],
  ["&amp;", "&"],
  ["&lt;", "<"],
  ["&gt;", ">"],
  ["&quot;", "\""],
  ["&#39;", "'"],
  ["&apos;", "'"],
  ["&ndash;", "-"],
  ["&mdash;", "-"],
  ["&deg;", "°"],
  ["&rsquo;", "'"],
  ["&lsquo;", "'"],
  ["&ldquo;", "\""],
  ["&rdquo;", "\""],
  ["&hellip;", "..."]
]);

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || `${HOST}:${PORT}`}`);

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    });
    response.end();
    return;
  }

  try {
    if (url.pathname === "/api/health") {
      return sendJson(response, 200, {
        ok: true,
        now: new Date().toISOString()
      });
    }

    if (url.pathname === "/api/comets") {
      return handleCometsApi(url, response);
    }

    return serveStatic(url.pathname, response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Nepoznata greška";
    return sendJson(response, 500, {
      ok: false,
      error: message
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Comet Hunter radi na http://${HOST}:${PORT}`);
  console.log(`Comet Hunter running at http://${HOST}:${PORT}`);
});

// Graceful shutdown
function shutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000);
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

async function handleCometsApi(url, response) {
  const observer = {
    label: url.searchParams.get("label")?.trim() || DEFAULT_OBSERVER.label,
    latitude: clampNumber(url.searchParams.get("lat"), -90, 90, DEFAULT_OBSERVER.latitude),
    longitude: normalizeLongitude(clampNumber(url.searchParams.get("lon"), -180, 180, DEFAULT_OBSERVER.longitude)),
    elevationKm: clampNumber(url.searchParams.get("elev"), 0, 8, DEFAULT_OBSERVER.elevationKm)
  };

  const limit = Math.round(clampNumber(url.searchParams.get("limit"), 4, 16, 10));
  const payload = await buildSnapshot(observer, limit);
  return sendJson(response, 200, payload);
}

async function buildSnapshot(observer, limit) {
  const warnings = [];
  const now = new Date();

  const weeklyFeed = await getAerithWeeklyFeed(Math.min(limit + 1, 14));
  const enrichedSettled = await mapSettledLimit(
    weeklyFeed.comets,
    4,
    (comet) => enrichComet(comet, observer)
  );

  const comets = enrichedSettled
    .map((result, index) => settleOrWarn(result, warnings, `Obrada komete ${weeklyFeed.comets[index]?.displayName || index + 1}`))
    .filter(Boolean)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);

  const aggregatedWarnings = dedupeWarnings([
    ...warnings,
    ...comets.flatMap((comet) => comet.warnings || [])
  ]);
  const visibleNow = comets.filter((comet) => comet.status.visibilityBand === "night").length;
  const aboveHorizonNow = comets.filter((comet) => comet.status.aboveHorizon).length;
  const sourceStatus = buildSourceStatusReport(comets, weeklyFeed, now);
  const featuredBrightest = selectBrightestEveningComet(comets);
  const featuredOperational = selectOperationalComet(comets);

  return {
    ok: true,
    generatedAt: now.toISOString(),
    observer,
    meta: {
      title: "Comet Hunter",
      author: "ALAN CATOVIC",
      visibleNow,
      aboveHorizonNow,
      trackedCount: comets.length,
      weeklyFeedTitle: weeklyFeed.title,
      weeklyFeedUpdated: weeklyFeed.updated,
      tonightSummary: buildTonightSummary(featuredOperational, observer),
      brightestSummary: buildTonightSummary(featuredBrightest, observer)
    },
    sourceGuide: SOURCE_GUIDE,
    sourceStatus,
    featured: featuredOperational,
    featuredOperational,
    featuredBrightest,
    warnings: aggregatedWarnings,
    comets
  };
}

async function enrichComet(baseComet, observer) {
  const warnings = [];
  const [sbdbSettled, horizonsSettled, cobsSettled, mpcSettled] = await Promise.allSettled([
    getSbdbSummary(baseComet.designation),
    getHorizonsSummary(baseComet.designation, observer),
    getCobsSummary(baseComet.designation),
    getMpcSummary(baseComet.designation)
  ]);

  const sbdb = settleOrWarn(sbdbSettled, warnings, `${baseComet.displayName}: JPL SBDB`) || {};
  const horizons = settleOrWarn(horizonsSettled, warnings, `${baseComet.displayName}: JPL Horizons`) || {};
  const cobs = settleOrWarn(cobsSettled, warnings, `${baseComet.displayName}: COBS`) || {};
  const mpc = settleOrWarn(mpcSettled, warnings, `${baseComet.displayName}: MPC`) || {};

  const preferredMagnitude =
    cobs.medianMagnitude ??
    cobs.latest?.magnitude ??
    horizons.totalMagnitude ??
    baseComet.weekly?.predictedMagnitude ??
    null;

  const status = buildVisibilityStatus(horizons, preferredMagnitude);
  const uncertainty = buildUncertaintyBadge({
    conditionCode: sbdb.conditionCode,
    rmsArcsec: mpc.residualRmsArcsec ?? sbdb.rmsArcsec,
    observationsUsed: mpc.observationsUsed,
    lastObservation: sbdb.lastObs ?? mpc.firstObservation
  });
  const tailMotion = buildTailMotionComparison(cobs.latest?.tailLength?.positionAngleDeg, horizons.skyMotionPositionAngleDeg);
  const visibilityWindow = horizons.visibilityWindow || buildVisibilityWindow(horizons.altitudeCurve || []);
  const operational = buildOperationalAssessment({
    magnitude: preferredMagnitude,
    currentAltitudeDeg: horizons.altitudeDeg,
    bestNightAltitudeDeg: visibilityWindow.bestNightAltitudeDeg,
    nightVisibleHours: visibilityWindow.nightVisibleHours,
    solarElongationDeg: horizons.solarElongationDeg ?? baseComet.weekly?.solarElongationDeg ?? null,
    skyMotionArcsecPerMin: horizons.skyMotionArcsecPerMin,
    uncertaintyScore: uncertainty.score
  });
  const score = computeScore({
    magnitude: preferredMagnitude,
    altitudeDeg: visibilityWindow.bestNightAltitudeDeg ?? horizons.altitudeDeg,
    visibilityBand: status.visibilityBand,
    freshnessHours: cobs.latest?.hoursAgo,
    solarElongationDeg: horizons.solarElongationDeg ?? baseComet.weekly?.solarElongationDeg ?? null,
    skyMotionArcsecPerMin: horizons.skyMotionArcsecPerMin,
    visibilityWindowScore: operational.visibilityWindowScore
  });

  return {
    id: baseComet.id,
    designation: baseComet.designation,
    displayName: baseComet.displayName,
    nickname: baseComet.nickname,
    summary: baseComet.summary,
    score,
    status,
    instrumentHint: pickInstrumentHint(preferredMagnitude),
    uncertainty,
    operational,
    visibilityWindow,
    tailMotion,
    visuals: {
      thumbnailUrl: baseComet.imageUrl || null,
      orbitPreview: buildOrbitPreview(sbdb.elements?.eccentricity?.value, sbdb.elements?.perihelionDistance?.value)
    },
    sky: {
      rightAscension: horizons.rightAscension || baseComet.weekly?.rightAscension || null,
      declination: horizons.declination || baseComet.weekly?.declination || null,
      azimuthDeg: horizons.azimuthDeg ?? null,
      altitudeDeg: horizons.altitudeDeg ?? null,
      skyMotionArcsecPerMin: horizons.skyMotionArcsecPerMin ?? null,
      skyMotionPositionAngleDeg: horizons.skyMotionPositionAngleDeg ?? null,
      totalMagnitude: horizons.totalMagnitude ?? null,
      nuclearMagnitude: horizons.nuclearMagnitude ?? null,
      constellation: horizons.constellation || null,
      earthDistanceAu: horizons.earthDistanceAu ?? baseComet.weekly?.earthDistanceAu ?? null,
      solarDistanceAu: baseComet.weekly?.solarDistanceAu ?? null,
      solarElongationDeg: horizons.solarElongationDeg ?? baseComet.weekly?.solarElongationDeg ?? null,
      solarState: horizons.solarState || null,
      timestamp: horizons.timestamp || null,
      altitudeCurve: horizons.altitudeCurve || []
    },
    weekly: baseComet.weekly,
    observations: {
      medianMagnitude: cobs.medianMagnitude ?? null,
      latest: cobs.latest || null,
      recentCount: cobs.recentCount || 0,
      comaDiameterArcmin: cobs.medianComaDiameterArcmin ?? cobs.latest?.comaDiameterArcmin ?? null,
      tailLength: cobs.latest?.tailLength || null,
      observers: cobs.observers || [],
      recentSeries: cobs.recentSeries || []
    },
    orbit: {
      className: sbdb.orbitClassName || null,
      conditionCode: sbdb.conditionCode || null,
      elements: sbdb.elements || {},
      covarianceLabels: sbdb.covarianceLabels || [],
      covarianceEpoch: sbdb.covarianceEpoch || null,
      rmsArcsec: sbdb.rmsArcsec ?? null,
      firstObs: sbdb.firstObs || null,
      lastObs: sbdb.lastObs || null,
      solutionDate: sbdb.solutionDate || null
    },
    mpc: {
      epochsFound: mpc.epochsFound ?? null,
      discoverySite: mpc.discoverySite || null,
      discoveryCircular: mpc.discoveryCircular || null,
      firstObservation: mpc.firstObservation || null,
      observationsUsed: mpc.observationsUsed ?? null,
      residualRmsArcsec: mpc.residualRmsArcsec ?? null,
      reference: mpc.reference || null
    },
    links: {
      aerith: baseComet.aerithUrl,
      cobs: cobs.sourceUrl || `https://cobs.si/api/obs_list.api?format=json&des=${encodeURIComponent(baseComet.designation)}`,
      jplSbdb: sbdb.sourceUrl || `https://ssd-api.jpl.nasa.gov/sbdb.api?des=${encodeURIComponent(baseComet.designation)}`,
      horizons: horizons.sourceUrl || buildHorizonsUrl(baseComet.designation, observer),
      mpc: mpc.sourceUrl || `https://www.minorplanetcenter.net/db_search/show_object?object_id=${encodeURIComponent(baseComet.designation)}`,
      theSkyLive: buildTheSkyLiveUrl(baseComet.designation)
    },
    warnings
  };
}

async function getAerithWeeklyFeed(limit) {
  return withCache("aerith-weekly-feed", 30 * 60 * 1000, async () => {
    const sourceUrl = "http://www.aerith.net/comet/weekly/current.html";
    const html = await fetchText(sourceUrl);
    const title = cleanupText(extractFirst(html, /<title>([\s\S]*?)<\/title>/i) || "Weekly Bright Comets");
    const updated = cleanupText(extractFirst(html, /<em>([\s\S]*?)<\/em>/i) || "Nepoznato");
    const chunks = html.split(/<h2>/i).slice(1);
    const comets = chunks
      .map((chunk, index) => parseAerithChunk(chunk, sourceUrl, index))
      .filter(Boolean)
      .slice(0, limit);

    return {
      title,
      updated,
      comets,
      sourceUrl
    };
  });
}

function parseAerithChunk(chunk, baseUrl, index) {
  const titleMatch = chunk.match(/<a href="([^"]+)">([\s\S]*?)<\/a><\/h2>/i);
  if (!titleMatch) {
    return null;
  }

  const [, relativePageUrl, rawTitle] = titleMatch;
  const imageMatch = chunk.match(/<img src="([^"]+)"/i);
  const summaryMatch = chunk.match(/<p>\s*([\s\S]*?)<\/p>/i);
  const preMatch = chunk.match(/<pre>\s*([\s\S]*?)<\/pre>/i);

  const displayName = cleanupText(rawTitle);
  const designation = extractDesignation(displayName);
  const nickname = extractNickname(displayName);
  const ephemerisRows = parseAerithPreTable(preMatch?.[1] || "");
  const weekly = ephemerisRows.at(-1) || null;

  return {
    id: slugify(`${designation}-${index}`),
    designation,
    displayName,
    nickname,
    summary: cleanupText(summaryMatch?.[1] || ""),
    imageUrl: imageMatch ? new URL(imageMatch[1], baseUrl).href : null,
    aerithUrl: new URL(relativePageUrl, baseUrl).href,
    weekly
  };
}

function parseAerithPreTable(rawPre) {
  return rawPre
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .map(parseAerithEphemerisLine)
    .filter(Boolean);
}

function parseAerithEphemerisLine(line) {
  const match = line.match(
    /^([A-Z][a-z]{2}\.\s+\d+)\s+(\d+)\s+([\d.]+)\s+([+\-]?\d+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+(\d+)\s+([\d.]+)\s+(\d{1,2}:\d{2})\s+\(\s*([-\d]+),\s*([-\d]+)\)$/
  );

  if (!match) {
    return null;
  }

  const [, dateLabel, raHour, raMinute, decDegree, decMinute, earthDistanceAu, solarDistanceAu, solarElongationDeg, predictedMagnitude, bestTimeLocal, bestAzimuthDeg, bestAltitudeDeg] = match;

  return {
    dateLabel,
    rightAscension: `${raHour.padStart(2, "0")}h ${raMinute}m`,
    declination: `${Number(decDegree) >= 0 ? "+" : ""}${decDegree}° ${decMinute}'`,
    earthDistanceAu: toNumber(earthDistanceAu),
    solarDistanceAu: toNumber(solarDistanceAu),
    solarElongationDeg: toNumber(solarElongationDeg),
    predictedMagnitude: toNumber(predictedMagnitude),
    bestTimeLocal,
    bestAzimuthDeg: toNumber(bestAzimuthDeg),
    bestAltitudeDeg: toNumber(bestAltitudeDeg),
    raw: line.trim()
  };
}

async function getSbdbSummary(designation) {
  return withCache(`sbdb:${designation}`, 12 * 60 * 60 * 1000, async () => {
    const sourceUrl = `https://ssd-api.jpl.nasa.gov/sbdb.api?des=${encodeURIComponent(designation)}&full-prec=true&cov=mat`;
    const payload = await fetchJson(sourceUrl);
    const elementsList = Array.isArray(payload.orbit?.elements) ? payload.orbit.elements : [];
    const elements = {};

    for (const element of elementsList) {
      const key = mapSbdbElementName(element.name);
      if (!key) {
        continue;
      }
      elements[key] = {
        symbol: element.label || element.name,
        value: toNumber(element.value),
        sigma: toNumber(element.sigma),
        units: element.units || null,
        title: element.title || null
      };
    }

    return {
      sourceUrl,
      fullName: payload.object?.fullname || designation,
      orbitClassName: payload.object?.orbit_class?.name || null,
      conditionCode: payload.orbit?.condition_code || null,
      rmsArcsec: toNumber(payload.orbit?.rms),
      firstObs: payload.orbit?.first_obs || null,
      lastObs: payload.orbit?.last_obs || null,
      solutionDate: payload.orbit?.soln_date || null,
      covarianceLabels: payload.orbit?.covariance?.labels || [],
      covarianceEpoch: payload.orbit?.covariance?.epoch || null,
      elements
    };
  });
}

async function getHorizonsSummary(designation, observer) {
  const cacheKey = [
    "horizons",
    designation,
    observer.latitude.toFixed(2),
    observer.longitude.toFixed(2),
    observer.elevationKm.toFixed(2),
    Math.floor(Date.now() / (10 * 60 * 1000))
  ].join(":");

  return withCache(cacheKey, 10 * 60 * 1000, async () => {
    const sourceUrl = buildHorizonsUrl(designation, observer, {
      durationHours: 24,
      stepMinutes: 30
    });
    const payload = await fetchJson(sourceUrl);
    const resultText = payload.result || "";
    const lines = resultText.split(/\r?\n/);
    const startIndex = lines.findIndex((line) => line.includes("$$SOE"));
    const endIndex = lines.findIndex((line) => line.includes("$$EOE"));
    const dataLines = startIndex >= 0 && endIndex > startIndex
      ? lines.slice(startIndex + 1, endIndex).map((line) => line.trim()).filter(Boolean)
      : [];

    if (!dataLines.length) {
      throw new Error(`Horizons nije vratio efemeridu za ${designation}`);
    }

    const parsedLines = dataLines.map(parseHorizonsLine);
    const parsed = parsedLines[0];
    const parsedNext = parsedLines[1] || null;
    const fallbackSkyMotionArcsecPerMin =
      parsed.skyMotionArcsecPerMin ??
      (parsedNext
        ? computeAngularMotionArcsecPerMin(
            parsed.rightAscension,
            parsed.declination,
            parsedNext.rightAscension,
            parsedNext.declination,
            parsed.timestamp,
            parsedNext.timestamp
          )
        : null);
    const altitudeCurve = parsedLines.map((entry) => ({
      timestamp: entry.timestamp,
      altitudeDeg: entry.altitudeDeg,
      azimuthDeg: entry.azimuthDeg,
      totalMagnitude: entry.totalMagnitude,
      solarState: entry.solarState
    }));

    return {
      sourceUrl,
      ...parsed,
      skyMotionArcsecPerMin: fallbackSkyMotionArcsecPerMin,
      altitudeCurve,
      visibilityWindow: buildVisibilityWindow(altitudeCurve)
    };
  });
}

function buildHorizonsUrl(designation, observer, options = {}) {
  const durationHours = options.durationHours ?? 24;
  const stepMinutes = options.stepMinutes ?? 30;
  const start = new Date();
  const stop = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
  const command = buildHorizonsCommand(designation);
  const stepLabel = stepMinutes % 60 === 0 ? `${stepMinutes / 60} h` : `${stepMinutes} m`;

  const params = new URLSearchParams({
    format: "json",
    COMMAND: `'${command}'`,
    OBJ_DATA: "'NO'",
    MAKE_EPHEM: "'YES'",
    EPHEM_TYPE: "'OBSERVER'",
    CENTER: "'coord'",
    COORD_TYPE: "'GEODETIC'",
    SITE_COORD: `'${observer.longitude},${observer.latitude},${observer.elevationKm}'`,
    START_TIME: `'${formatHorizonsTime(start)}'`,
    STOP_TIME: `'${formatHorizonsTime(stop)}'`,
    STEP_SIZE: `'${stepLabel}'`,
    QUANTITIES: "'1,4,9,20,23,24,29,47'"
  });

  return `https://ssd.jpl.nasa.gov/api/horizons.api?${params.toString()}`;
}

function parseHorizonsLine(line) {
  const tokens = line.trim().split(/\s+/);
  if (tokens.length < 19) {
    throw new Error("Neočekivan Horizons format");
  }

  const hasSkyMotion = tokens.length >= 22;
  const constellation = tokens[18];
  const sto = toNumber(tokens[17]);
  const visibilityCode = tokens[16];
  const sot = toNumber(tokens[15]);
  const deltaDot = toNumber(tokens[14]);
  const delta = toNumber(tokens[13]);
  const nuclearMagnitude = toNumber(tokens[12]);
  const totalMagnitude = toNumber(tokens[11]);
  const elevation = toNumber(tokens[10]);
  const azimuth = toNumber(tokens[9]);
  const decArcsec = tokens[8];
  const decMinute = tokens[7];
  const decDegree = tokens[6];
  const raSecond = tokens[5];
  const raMinute = tokens[4];
  const raHour = tokens[3];
  const stateTokens = tokens[2];
  const solarSymbol = stateTokens[0] || " ";

  return {
    timestamp: parseHorizonsTimestamp(tokens[0], tokens[1]),
    rightAscension: `${raHour}h ${raMinute}m ${raSecond}s`,
    declination: `${decDegree}° ${decMinute}' ${decArcsec}"`,
    azimuthDeg: azimuth,
    altitudeDeg: elevation,
    totalMagnitude,
    nuclearMagnitude,
    earthDistanceAu: delta,
    radialVelocityKmPerSec: deltaDot,
    solarElongationDeg: sot,
    sunTargetObserverDeg: sto,
    visibilityCode,
    constellation,
    solarState: mapSolarState(solarSymbol),
    skyMotionArcsecPerMin: hasSkyMotion ? toNumber(tokens[19]) : null,
    skyMotionPositionAngleDeg: hasSkyMotion ? toNumber(tokens[20]) : null,
    relativeVelocityAngleDeg: hasSkyMotion ? toNumber(tokens[21]) : null
  };
}

async function getCobsSummary(designation) {
  return withCache(`cobs:${designation}`, 15 * 60 * 1000, async () => {
    const sourceUrl = `https://cobs.si/api/obs_list.api?format=json&des=${encodeURIComponent(designation)}`;
    const payload = await fetchJson(sourceUrl);
    const entries = Array.isArray(payload.objects) ? [...payload.objects] : [];

    entries.sort((left, right) => Date.parse(right.obs_date) - Date.parse(left.obs_date));

    const now = Date.now();
    const recent = entries
      .filter((entry) => Number.isFinite(Date.parse(entry.obs_date)))
      .filter((entry) => now - Date.parse(entry.obs_date) <= 14 * 24 * 60 * 60 * 1000)
      .slice(0, 12);
    const recentSeries = [...recent]
      .reverse()
      .map((entry) => normalizeCobsEntry(entry, now))
      .filter((entry) => entry.magnitude != null);

    const magnitudeValues = recent.map((entry) => toNumber(entry.magnitude)).filter(Number.isFinite);
    const comaValues = recent.map((entry) => toNumber(entry.coma_diameter)).filter(Number.isFinite);
    const latest = recent[0] ? normalizeCobsEntry(recent[0], now) : entries[0] ? normalizeCobsEntry(entries[0], now) : null;

    return {
      sourceUrl,
      recentCount: recent.length,
      medianMagnitude: median(magnitudeValues),
      medianComaDiameterArcmin: median(comaValues),
      latest,
      recentSeries,
      observers: unique(recent.map((entry) => `${entry.observer?.first_name || ""} ${entry.observer?.last_name || ""}`.trim()).filter(Boolean)).slice(0, 4)
    };
  });
}

function normalizeCobsEntry(entry, nowMillis) {
  return {
    date: entry.obs_date,
    hoursAgo: roundNumber((nowMillis - Date.parse(entry.obs_date)) / (60 * 60 * 1000), 1),
    magnitude: toNumber(entry.magnitude),
    magnitudeError: toNumber(entry.magnitude_error),
    comaDiameterArcmin: toNumber(entry.coma_diameter),
    tailLength: entry.tail_length
      ? {
          value: toNumber(entry.tail_length),
          unit: entry.tail_length_unit || null,
          positionAngleDeg: toNumber(entry.tail_pa)
        }
      : null,
    method: entry.obs_method?.name || null,
    observer: `${entry.observer?.first_name || ""} ${entry.observer?.last_name || ""}`.trim() || null,
    country: entry.observer?.country || null
  };
}

async function getMpcSummary(designation) {
  return withCache(`mpc:${designation}`, 12 * 60 * 60 * 1000, async () => {
    const sourceUrl = `https://www.minorplanetcenter.net/db_search/show_object?object_id=${encodeURIComponent(designation)}`;
    const html = await fetchText(sourceUrl);

    if (/No object found/i.test(html)) {
      throw new Error(`MPC nema unos za ${designation}`);
    }

    const epochsFound = toNumber(extractFirst(html, /Orbits found for (\d+) epochs\./i));
    const orbitSnippet = html.split(/<h2>Orbit<\/h2>/i)[1]?.slice(0, 5000) || "";
    const rowPairs = [...orbitSnippet.matchAll(/<tr><td>(.*?)<\/td><td class="rj">(.*?)<\/td><\/tr>/gi)];
    const orbitTable = Object.fromEntries(
      rowPairs.map((match) => [cleanupText(match[1]).toLowerCase(), cleanupText(match[2])])
    );

    const observationsSnippet = html.split(/<h2>Observations<\/h2>/i)[1]?.slice(0, 2500) || "";
    const discoveryMatch = observationsSnippet.match(
      /<tr>\s*<td class="ff">([^<]+)<\/td>[\s\S]*?<td>([^<]+)<\/td>[\s\S]*?<td class="ff lj">([^<]+)<\/td>\s*<\/tr>/i
    );

    return {
      sourceUrl,
      epochsFound,
      firstObservation: discoveryMatch ? cleanupText(discoveryMatch[1]) : orbitTable["first observation date used"] || null,
      discoverySite: discoveryMatch ? cleanupText(discoveryMatch[2]) : null,
      discoveryCircular: discoveryMatch ? cleanupText(discoveryMatch[3]) : null,
      observationsUsed: toNumber(orbitTable["observations used"]),
      residualRmsArcsec: toNumber(orbitTable["residual rms (arc-secs)"]),
      reference: orbitTable.reference || null
    };
  });
}

function buildVisibilityStatus(horizons, magnitude) {
  const altitudeDeg = horizons.altitudeDeg ?? -90;
  const solarState = horizons.solarState || "Nepoznato";
  const aboveHorizon = altitudeDeg > 0;
  const nightReady = aboveHorizon && (solarState === "Noć" || solarState === "Astronomski sumrak" || solarState === "Nautički sumrak");
  const visibilityBand = nightReady ? "night" : aboveHorizon ? "up" : "down";
  const label =
    visibilityBand === "night"
      ? "Noćno vidljiva"
      : visibilityBand === "up"
        ? "Iznad horizonta"
        : "Ispod horizonta";

  return {
    aboveHorizon,
    nightReady,
    visibilityBand,
    label,
    summary:
      visibilityBand === "night"
        ? "Može se loviti odmah sa zadane lokacije."
        : visibilityBand === "up"
          ? "Geometrijski je iznad horizonta, ali uslovi nisu puni noćni."
          : "Sa zadane lokacije trenutno je ispod horizonta.",
    solarState,
    magnitudeClass:
      magnitude == null
        ? "Nepoznato"
        : magnitude <= 6
          ? "Potencijalno dvogled/golo oko"
          : magnitude <= 9
            ? "Dvogled ili manji teleskop"
            : magnitude <= 12
              ? "Teleskop srednjeg otvora"
              : "Fotometrijska/teleskopska meta"
  };
}

function computeScore({ magnitude, altitudeDeg, visibilityBand, freshnessHours, solarElongationDeg, skyMotionArcsecPerMin, visibilityWindowScore }) {
  const magnitudeScore = magnitude == null ? 0 : Math.max(0, 18 - magnitude) * 3;
  const altitudeScore = altitudeDeg == null ? 0 : Math.max(-15, altitudeDeg) * 1.4;
  const bandScore = visibilityBand === "night" ? 45 : visibilityBand === "up" ? 20 : -20;
  const freshnessScore = freshnessHours == null ? 0 : Math.max(0, 36 - freshnessHours) * 0.4;
  const elongationScore = solarElongationDeg == null ? 0 : Math.max(0, solarElongationDeg - 30) * 0.35;
  const motionPenalty = skyMotionArcsecPerMin == null ? 0 : Math.max(0, skyMotionArcsecPerMin - 4.5) * 2.2;
  return roundNumber(magnitudeScore + altitudeScore + bandScore + freshnessScore + elongationScore + (visibilityWindowScore || 0) - motionPenalty, 2);
}

function pickInstrumentHint(magnitude) {
  if (magnitude == null) {
    return "Provjeri fotometriju i trenutnu visinu objekta prije izlaska na teren.";
  }
  if (magnitude <= 6) {
    return "Vrijedi provjeriti golo oko i dvogled prije teleskopa.";
  }
  if (magnitude <= 8.5) {
    return "Dobar dvogled ili kompaktan teleskop je realna početna konfiguracija.";
  }
  if (magnitude <= 11.5) {
    return "Najbolja meta za srednji amaterski teleskop uz tamnije nebo.";
  }
  return "Slaba meta: planiraj veći otvor, kameru i pažljiv stack.";
}

function buildOrbitPreview(eccentricity, perihelionDistance) {
  if (!Number.isFinite(eccentricity) || !Number.isFinite(perihelionDistance)) {
    return null;
  }

  const points = [];
  const scale = 34 / Math.max(perihelionDistance * (1 + Math.min(eccentricity, 2.5)), 1);
  const span = eccentricity < 1 ? Math.PI : Math.PI / 1.7;
  const steps = 80;

  for (let index = 0; index <= steps; index += 1) {
    const theta = -span + (2 * span * index) / steps;
    const r = (perihelionDistance * (1 + eccentricity)) / (1 + eccentricity * Math.cos(theta));
    if (!Number.isFinite(r) || r <= 0) {
      continue;
    }
    const x = 42 + r * Math.cos(theta) * scale;
    const y = 42 + r * Math.sin(theta) * scale * 0.68;
    points.push(`${index === 0 ? "M" : "L"}${roundNumber(x, 2)} ${roundNumber(y, 2)}`);
  }

  return {
    width: 84,
    height: 84,
    path: points.join(" "),
    sunX: 42,
    sunY: 42,
    perihelionX: roundNumber(42 + perihelionDistance * scale, 2),
    perihelionY: 42
  };
}

async function serveStatic(pathname, response) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const absolutePath = path.join(PUBLIC_DIR, path.normalize(safePath).replace(/^(\.\.[/\\])+/, ""));

  if (!absolutePath.startsWith(PUBLIC_DIR)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(absolutePath);
    const extension = path.extname(absolutePath);
    response.writeHead(200, {
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=600",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    });
    response.end(file);
  } catch {
    response.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    response.end("Not found");
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "X-Content-Type-Options": "nosniff"
  });
  response.end(JSON.stringify(payload, null, 2));
}

async function fetchText(url) {
  let lastError = null;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT
      }
    });

    if (response.ok) {
      return response.text();
    }

    lastError = new Error(`${url} -> HTTP ${response.status}`);
    if ((response.status < 500 && response.status !== 429) || attempt === 3) {
      throw lastError;
    }

    await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
  }

  throw lastError || new Error(`${url} -> fetch failed`);
}

async function fetchJson(url) {
  const text = await fetchText(url);
  return JSON.parse(text);
}

async function withCache(key, ttlMs, factory) {
  const existing = cache.get(key);
  if (existing && existing.expiresAt > Date.now()) {
    return existing.value;
  }

  try {
    const value = await factory();
    cache.set(key, {
      expiresAt: Date.now() + ttlMs,
      value
    });
    return value;
  } catch (error) {
    if (existing) {
      return existing.value;
    }
    throw error;
  }
}

async function mapSettledLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const currentIndex = cursor;
      cursor += 1;

      try {
        results[currentIndex] = {
          status: "fulfilled",
          value: await mapper(items[currentIndex], currentIndex)
        };
      } catch (error) {
        results[currentIndex] = {
          status: "rejected",
          reason: error
        };
      }
    }
  }

  const workerCount = Math.max(1, Math.min(limit, items.length));
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}

function dedupeWarnings(warnings) {
  const seen = new Set();
  return warnings.filter((warning) => {
    const key = `${warning.scope}::${warning.message}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function buildSourceStatusReport(comets, weeklyFeed, checkedAt) {
  const total = Math.max(comets.length, 1);
  const checkedAtIso = checkedAt.toISOString();
  const makeLiveState = (warningNeedle) => {
    const errorCount = comets.reduce(
      (count, comet) => count + (comet.warnings || []).filter((warning) => warning.scope.includes(warningNeedle)).length,
      0
    );
    const state = errorCount === 0 ? "live" : errorCount < total ? "partial" : "error";
    return {
      state,
      checkedAt: checkedAtIso,
      errorCount,
      totalChecked: total
    };
  };

  return {
    aerith: {
      state: "live",
      checkedAt: checkedAtIso,
      updatedAt: weeklyFeed.updated || null,
      errorCount: 0,
      totalChecked: 1
    },
    jplSbdb: makeLiveState("JPL SBDB"),
    jplHorizons: makeLiveState("JPL Horizons"),
    cobs: makeLiveState("COBS"),
    mpc: makeLiveState("MPC"),
    theskylive: {
      state: "link-only",
      checkedAt: checkedAtIso,
      errorCount: 0,
      totalChecked: total
    }
  };
}

function buildTonightSummary(featured, observer) {
  if (!featured) {
    return "Trenutno nema izdvojene mete za zadanu lokaciju.";
  }

  const bestTime = formatHumanTime(featured.visibilityWindow?.bestNightAt || featured.visibilityWindow?.transitAt);
  const bestAltitude = featured.visibilityWindow?.bestNightAltitudeDeg ?? featured.visibilityWindow?.maxAltitudeDeg ?? featured.sky?.altitudeDeg;
  const magnitude = featured.observations?.medianMagnitude ?? featured.sky?.totalMagnitude;
  const parts = [
    `Najbolja meta večeras iz ${observer.label}: ${featured.displayName}`
  ];

  if (magnitude != null) {
    parts.push(`mag ${roundNumber(magnitude, 1)}`);
  }
  if (bestAltitude != null) {
    parts.push(`max alt ${roundNumber(bestAltitude, 1)}°`);
  }
  if (bestTime) {
    parts.push(`oko ${bestTime}`);
  }

  return parts.join(", ");
}

function selectBrightestEveningComet(comets) {
  if (!Array.isArray(comets) || !comets.length) {
    return null;
  }

  const ranked = [...comets].sort((left, right) => {
    const leftMagnitude = left.observations?.medianMagnitude ?? left.sky?.totalMagnitude ?? Number.POSITIVE_INFINITY;
    const rightMagnitude = right.observations?.medianMagnitude ?? right.sky?.totalMagnitude ?? Number.POSITIVE_INFINITY;

    if (leftMagnitude !== rightMagnitude) {
      return leftMagnitude - rightMagnitude;
    }

    const leftAltitude = left.visibilityWindow?.bestNightAltitudeDeg ?? left.sky?.altitudeDeg ?? -90;
    const rightAltitude = right.visibilityWindow?.bestNightAltitudeDeg ?? right.sky?.altitudeDeg ?? -90;
    if (leftAltitude !== rightAltitude) {
      return rightAltitude - leftAltitude;
    }

    return (right.score || 0) - (left.score || 0);
  });

  const nightVisible = ranked.filter((comet) => comet.status?.visibilityBand === "night");
  if (nightVisible.length) {
    return nightVisible[0];
  }

  const aboveHorizon = ranked.filter((comet) => comet.status?.aboveHorizon);
  if (aboveHorizon.length) {
    return aboveHorizon[0];
  }

  return ranked[0];
}

function selectOperationalComet(comets) {
  if (!Array.isArray(comets) || !comets.length) {
    return null;
  }

  return [...comets].sort((left, right) => (right.score || 0) - (left.score || 0))[0];
}

function buildVisibilityWindow(samples) {
  if (!Array.isArray(samples) || !samples.length) {
    return {
      riseAt: null,
      setAt: null,
      transitAt: null,
      maxAltitudeDeg: null,
      bestNightAt: null,
      bestNightAltitudeDeg: null,
      nightVisibleHours: 0
    };
  }

  const normalized = samples
    .map((sample) => ({
      ...sample,
      timeMillis: Date.parse(sample.timestamp)
    }))
    .filter((sample) => Number.isFinite(sample.timeMillis) && Number.isFinite(sample.altitudeDeg));

  if (!normalized.length) {
    return {
      riseAt: null,
      setAt: null,
      transitAt: null,
      maxAltitudeDeg: null,
      bestNightAt: null,
      bestNightAltitudeDeg: null,
      nightVisibleHours: 0
    };
  }

  let riseAt = null;
  let setAt = null;
  let transitSample = normalized[0];
  let bestNightSample = null;
  let visibleNightMillis = 0;

  for (let index = 0; index < normalized.length; index += 1) {
    const sample = normalized[index];
    if (sample.altitudeDeg > transitSample.altitudeDeg) {
      transitSample = sample;
    }

    if (sample.altitudeDeg > 0 && isNightLike(sample.solarState)) {
      if (!bestNightSample || sample.altitudeDeg > bestNightSample.altitudeDeg) {
        bestNightSample = sample;
      }
    }

    const next = normalized[index + 1];
    if (!next) {
      continue;
    }

    if (riseAt == null && sample.altitudeDeg <= 0 && next.altitudeDeg > 0) {
      riseAt = interpolateAltitudeCrossing(sample, next);
    }

    if (setAt == null && sample.altitudeDeg > 0 && next.altitudeDeg <= 0) {
      setAt = interpolateAltitudeCrossing(sample, next);
    }

    const segmentMidAltitude = (sample.altitudeDeg + next.altitudeDeg) / 2;
    const segmentNightLike = isNightLike(sample.solarState) || isNightLike(next.solarState);
    if (segmentMidAltitude > 0 && segmentNightLike) {
      visibleNightMillis += Math.max(0, next.timeMillis - sample.timeMillis);
    }
  }

  return {
    riseAt,
    setAt,
    transitAt: transitSample.timestamp,
    maxAltitudeDeg: roundNumber(transitSample.altitudeDeg, 2),
    bestNightAt: bestNightSample?.timestamp || null,
    bestNightAltitudeDeg: bestNightSample ? roundNumber(bestNightSample.altitudeDeg, 2) : null,
    nightVisibleHours: roundNumber(visibleNightMillis / (60 * 60 * 1000), 2)
  };
}

function buildUncertaintyBadge({ conditionCode, rmsArcsec, observationsUsed, lastObservation }) {
  let score = 100;
  const reasons = [];

  if (Number.isFinite(conditionCode)) {
    score -= conditionCode * 7;
    if (conditionCode >= 5) {
      reasons.push("viši condition code");
    }
  } else {
    score -= 10;
    reasons.push("nema condition code");
  }

  if (Number.isFinite(rmsArcsec)) {
    if (rmsArcsec > 2) {
      score -= 22;
      reasons.push("povišen RMS");
    } else if (rmsArcsec > 1) {
      score -= 10;
    }
  } else {
    score -= 8;
  }

  if (Number.isFinite(observationsUsed)) {
    if (observationsUsed < 20) {
      score -= 18;
      reasons.push("malo opažanja");
    } else if (observationsUsed < 50) {
      score -= 9;
    } else if (observationsUsed > 150) {
      score += 4;
    }
  } else {
    score -= 8;
  }

  const observationAgeDays = computeAgeDays(lastObservation);
  if (observationAgeDays != null) {
    if (observationAgeDays > 365) {
      score -= 18;
      reasons.push("stariji orbitni luk");
    } else if (observationAgeDays > 120) {
      score -= 8;
    }
  }

  const boundedScore = Math.max(8, Math.min(100, roundNumber(score, 1)));
  const label =
    boundedScore >= 82
      ? "Visoka pouzdanost"
      : boundedScore >= 64
        ? "Dobra pouzdanost"
        : boundedScore >= 42
          ? "Umjerena pouzdanost"
          : "Oprez";

  return {
    score: boundedScore,
    label,
    note: reasons.length ? reasons.join(", ") : "stabilno orbitno rješenje"
  };
}

function buildTailMotionComparison(tailPaDeg, motionPaDeg) {
  if (!Number.isFinite(tailPaDeg) || !Number.isFinite(motionPaDeg)) {
    return {
      deltaDeg: null,
      label: "Nema dovoljno podataka za poređenje repa i vektora kretanja."
    };
  }

  const rawDelta = Math.abs(tailPaDeg - motionPaDeg) % 360;
  const deltaDeg = rawDelta > 180 ? 360 - rawDelta : rawDelta;
  const label =
    deltaDeg <= 25
      ? "Rep je približno poravnat sa vektorom kretanja."
      : deltaDeg <= 60
        ? "Rep je umjereno odmaknut od vektora kretanja."
        : "Rep i vektor kretanja su snažno razdvojeni.";

  return {
    deltaDeg: roundNumber(deltaDeg, 1),
    label
  };
}

function buildOperationalAssessment({ magnitude, currentAltitudeDeg, bestNightAltitudeDeg, nightVisibleHours, solarElongationDeg, skyMotionArcsecPerMin, uncertaintyScore }) {
  const visibilityWindowScore = computeVisibilityWindowScore({
    magnitude,
    bestNightAltitudeDeg,
    nightVisibleHours,
    solarElongationDeg,
    uncertaintyScore
  });

  let verdict = "Potrebno tamnije nebo i provjera detalja prije izlaska.";
  if ((bestNightAltitudeDeg ?? currentAltitudeDeg ?? -90) < 12) {
    verdict = "Nisko iznad horizonta.";
  } else if (solarElongationDeg != null && solarElongationDeg < 45) {
    verdict = "Blizu Suncu, geometrija posmatranja je ograničena.";
  } else if (magnitude != null && magnitude <= 7 && (bestNightAltitudeDeg ?? currentAltitudeDeg ?? 0) >= 20) {
    verdict = "Vizuelno dobra meta.";
  } else if (magnitude != null && magnitude <= 11.5 && (bestNightAltitudeDeg ?? currentAltitudeDeg ?? 0) >= 25) {
    verdict = "Dobra fotografska meta.";
  }

  let imagingVerdict = "Standardna fotografska meta.";
  if (skyMotionArcsecPerMin != null && skyMotionArcsecPerMin > 4.5) {
    imagingVerdict = "Brža meta, skrati pojedinačne ekspozicije.";
  } else if ((bestNightAltitudeDeg ?? currentAltitudeDeg ?? 0) < 20) {
    imagingVerdict = "Niska meta, koristi kraći put kroz atmosferu kad je moguće.";
  } else if (magnitude != null && magnitude > 12.5) {
    imagingVerdict = "Slab objekat, planiraj veću integraciju.";
  }

  return {
    visibilityWindowScore,
    verdict,
    imagingVerdict
  };
}

function computeVisibilityWindowScore({ magnitude, bestNightAltitudeDeg, nightVisibleHours, solarElongationDeg, uncertaintyScore }) {
  const magnitudeTerm = magnitude == null ? 18 : Math.max(0, 16 - magnitude) * 4.5;
  const altitudeTerm = bestNightAltitudeDeg == null ? 0 : Math.max(0, bestNightAltitudeDeg) * 1.3;
  const hoursTerm = Math.max(0, (nightVisibleHours || 0) * 10);
  const elongationTerm = solarElongationDeg == null ? 0 : Math.max(0, solarElongationDeg - 35) * 0.7;
  const uncertaintyTerm = (uncertaintyScore ?? 50) * 0.18;
  return roundNumber(magnitudeTerm + altitudeTerm + hoursTerm + elongationTerm + uncertaintyTerm, 1);
}

function interpolateAltitudeCrossing(left, right) {
  const deltaAltitude = right.altitudeDeg - left.altitudeDeg;
  if (!Number.isFinite(deltaAltitude) || deltaAltitude === 0) {
    return left.timestamp;
  }
  const fraction = (0 - left.altitudeDeg) / deltaAltitude;
  const timeMillis = left.timeMillis + fraction * (right.timeMillis - left.timeMillis);
  return new Date(timeMillis).toISOString();
}

function isNightLike(solarState) {
  return solarState === "Noć" || solarState === "Astronomski sumrak" || solarState === "Nautički sumrak";
}

function computeAgeDays(value) {
  const timeMillis = Date.parse(value || "");
  if (!Number.isFinite(timeMillis)) {
    return null;
  }
  return (Date.now() - timeMillis) / (24 * 60 * 60 * 1000);
}

function formatHumanTime(value) {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")} UTC`;
}

function cleanupText(value) {
  if (!value) {
    return "";
  }

  let text = value.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<[^>]+>/g, " ");

  for (const [entity, replacement] of HTML_ENTITIES.entries()) {
    text = text.split(entity).join(replacement);
  }

  text = text.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
  return text.replace(/\s+/g, " ").trim();
}

function extractFirst(value, expression) {
  return value.match(expression)?.[1] || null;
}

function extractDesignation(displayName) {
  const cleaned = displayName.replace(/\s+/g, " ").trim();
  const longDesignation = cleaned.match(/^([A-Z]\/\d{4}\s+[A-Z0-9-]+)/i);
  if (longDesignation) {
    return longDesignation[1].replace(/\s+/g, " ").trim();
  }

  const periodic = cleaned.match(/^(\d+P(?:-[A-Z])?)/i);
  if (periodic) {
    return periodic[1];
  }

  return cleaned.split("(")[0].trim();
}

function extractNickname(displayName) {
  const parenMatch = displayName.match(/\(([^)]+)\)/);
  if (parenMatch) {
    return cleanupText(parenMatch[1]);
  }

  const slashMatch = displayName.match(/^\d+P(?:-[A-Z])?\/(.+)$/i);
  return slashMatch ? cleanupText(slashMatch[1]) : null;
}

function buildHorizonsCommand(designation) {
  return `DES=${designation};CAP;NOFRAG`;
}

function buildTheSkyLiveUrl(designation) {
  const periodic = designation.match(/^(\d+P(?:-[A-Z])?)$/i);
  if (periodic) {
    return `https://theskylive.com/${periodic[1].toLowerCase()}-info`;
  }
  return "https://theskylive.com/comets";
}

function mapSolarState(symbol) {
  switch (symbol) {
    case "*":
      return "Dnevno nebo";
    case "C":
      return "Građanski sumrak";
    case "N":
      return "Nautički sumrak";
    case "A":
      return "Astronomski sumrak";
    default:
      return "Noć";
  }
}

function mapSbdbElementName(name) {
  switch (name) {
    case "e":
      return "eccentricity";
    case "a":
      return "semiMajorAxis";
    case "q":
      return "perihelionDistance";
    case "i":
      return "inclination";
    case "om":
      return "ascendingNode";
    case "w":
      return "argumentOfPerihelion";
    case "tp":
      return "perihelionPassage";
    case "n":
      return "meanMotion";
    case "ad":
      return "aphelionDistance";
    default:
      return null;
  }
}

function formatHorizonsTime(date) {
  return date.toISOString().replace("T", " ").slice(0, 16);
}

function parseHorizonsTimestamp(dateToken, timeToken) {
  const match = String(dateToken || "").match(/^(\d{4})-([A-Za-z]{3})-(\d{2})$/);
  const timeMatch = String(timeToken || "").match(/^(\d{2}):(\d{2})$/);
  if (!match || !timeMatch) {
    return `${dateToken} ${timeToken} UTC`;
  }

  const [, year, monthLabel, day] = match;
  const [, hours, minutes] = timeMatch;
  const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(monthLabel);
  if (monthIndex < 0) {
    return `${dateToken} ${timeToken} UTC`;
  }

  return new Date(Date.UTC(Number(year), monthIndex, Number(day), Number(hours), Number(minutes))).toISOString();
}

function clampNumber(value, min, max, fallback) {
  const number = toNumber(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, number));
}

function normalizeLongitude(value) {
  let output = value;
  while (output > 180) {
    output -= 360;
  }
  while (output < -180) {
    output += 360;
  }
  return output;
}

function toNumber(value) {
  if (value == null || value === "" || value === "n.a.") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function median(values) {
  if (!values.length) {
    return null;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) {
    return roundNumber(sorted[middle], 2);
  }
  return roundNumber((sorted[middle - 1] + sorted[middle]) / 2, 2);
}

function roundNumber(value, precision) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

function unique(values) {
  return [...new Set(values)];
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function settleOrWarn(result, warnings, label) {
  if (result.status === "fulfilled") {
    return result.value;
  }

  warnings.push({
    scope: label,
    message: result.reason instanceof Error ? result.reason.message : String(result.reason)
  });

  return null;
}

function hmsToDegrees(value) {
  const match = String(value || "").match(/(\d+)h\s+(\d+)m\s+([\d.]+)s/);
  if (!match) {
    return null;
  }
  const [, hours, minutes, seconds] = match;
  return (Number(hours) + Number(minutes) / 60 + Number(seconds) / 3600) * 15;
}

function dmsToDegrees(value) {
  const match = String(value || "").match(/([+\-]?\d+).+?(\d+)'[\s]+([\d.]+)"/);
  if (!match) {
    return null;
  }
  const [, degrees, minutes, seconds] = match;
  const sign = Number(degrees) < 0 ? -1 : 1;
  return Number(degrees) + sign * Number(minutes) / 60 + sign * Number(seconds) / 3600;
}

function computeAngularMotionArcsecPerMin(ra1, dec1, ra2, dec2, timestamp1, timestamp2) {
  const raDeg1 = hmsToDegrees(ra1);
  const decDeg1 = dmsToDegrees(dec1);
  const raDeg2 = hmsToDegrees(ra2);
  const decDeg2 = dmsToDegrees(dec2);
  const time1 = Date.parse(timestamp1 || "");
  const time2 = Date.parse(timestamp2 || "");

  if (![raDeg1, decDeg1, raDeg2, decDeg2].every(Number.isFinite)) {
    return null;
  }

  const ra1Rad = (raDeg1 * Math.PI) / 180;
  const dec1Rad = (decDeg1 * Math.PI) / 180;
  const ra2Rad = (raDeg2 * Math.PI) / 180;
  const dec2Rad = (decDeg2 * Math.PI) / 180;

  const cosine =
    Math.sin(dec1Rad) * Math.sin(dec2Rad) +
    Math.cos(dec1Rad) * Math.cos(dec2Rad) * Math.cos(ra1Rad - ra2Rad);

  const angleRad = Math.acos(Math.max(-1, Math.min(1, cosine)));
  const minutes = Number.isFinite(time1) && Number.isFinite(time2) ? Math.abs(time2 - time1) / (60 * 1000) : 1;
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return null;
  }
  return (angleRad * 180 * 3600) / Math.PI / minutes;
}
