const app = document.querySelector("#app");

// ── i18n ──────────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  bs: {
    appTitle: "Comet Hunter",
    author: "AUTOR: ALAN CATOVIC",
    heroLead: "Jedinstven dashboard za trenutno vidljive komete, sa profesionalnim orbitalnim parametrima iz JPL/MPC sloja, live fotometrijom iz COBS/Aerith izvora i operativnim alatima za planiranje posmatranja.",
    liveRadar: "Live kometni radar",
    watchlistExport: "Watchlist + export",
    nightVisible: "Noćno vidljive",
    maxNightAlt: "Najviša noćna visina",
    watchlistCount: "Watchlist",
    shown: "Prikazano",
    feedUpdated: "Feed osvježen",
    brightestTarget: "Najsjajnija meta",
    bestOpTarget: "Najbolja operativna meta",
    observerLocation: "Lokacija posmatrača",
    changeTheme: "Promijeni temu",
    label: "Oznaka",
    elevation: "Visina (km)",
    refreshEphemeris: "Osvježi efemeride",
    myLocation: "Moja lokacija",
    viewFilters: "Pregled i filteri",
    viewFiltersSub: "Prvo izaberi način prikaza, zatim aktivni radni filter liste kometa.",
    compact: "Compact",
    detailed: "Detailed",
    allTargets: "Sve mete",
    nightVisibleFilter: "Noćno vidljive",
    freshCobs: "Svježi COBS",
    activeFilter: "Aktivni filter",
    sourceHealth: "Zdravlje izvora",
    sourceHealthSub: "Prikaz dostupnosti feedova za trenutni refresh aplikacije.",
    sources: "Izvori i uloga",
    aboutApp: "O aplikaciji",
    details: "Detalji",
    addWatchlist: "Dodaj u watchlistu",
    removeWatchlist: "Ukloni iz watchliste",
    bestTargetTonight: "Najboljim meta večeras iz",
    loading: "Dohvaćam Aerith, JPL, COBS i MPC izvore...",
    errorTitle: "Podaci nisu učitani",
    retry: "Pokušaj ponovo",
    noTarget: "Trenutno nema izdvojene mete za zadanu lokaciju.",
    // New features
    starMap: "Zvjezdana mapa",
    visCalendar: "Kalendar vidljivosti",
    notifications: "Obavještenja",
    enableNotif: "Uključi obavještenja",
    disableNotif: "Isključi obavještenja",
    notifGranted: "Obavještenja su uključena",
    notifDenied: "Obavještenja su blokirana u browseru",
    notifPrompt: "Klikni da dozvoliš obavještenja",
    newCometAlert: "🆕 Novi komet otkriven",
    alarmActive: "Alarm aktivan",
    alarmInactive: "Alarm isključen",
    conditionsMet: "✅ Povoljni uslovi! Komet je iznad horizonta i nebo je bistro.",
    conditionsNotMet: "Čeka se: komet iznad horizonta + bistro nebo.",
    cloudCheckFailed: "Nije moguće provjeriti oblačnost.",
    weatherSource: "Oblačnost (Open-Meteo)",
    weekView: "Sedmica",
    monthView: "Mjesec",
    calendarTitle: "Kalendar vidljivosti kometa",
    visibleHours: "vidljivo h",
    starMapTitle: "Zvjezdana mapa (Az/Alt)",
    zenith: "Zenit",
    horizon: "Horizont",
    close: "Zatvori",
    source: "Izvor",
    notifVisibleTonight: "će biti vidljiv večeras",
    notifAt: "oko",
    good: "dobra",
    checkWeather: "Provjeri uslove",
    // Labels used in UI
    featuredEyebrow: "Najperspektivnija meta sada",
    detailEyebrow: "Detaljni pregled mete",
    locationLabel: "Lokacija",
    riseTransitSet: "Rise / transit / set",
    photographicAssessment: "Fotografska procjena",
    tailVsMotion: "Rep vs kretanje",
    tonightSummary: "Tonight summary",
    altitudeCurve: "Altitude curve 24 h",
    nightWindow: "Noćni prozor",
    operativeList: "Operativna lista kometa",
    paramExplanation: "Objašnjenje parametara",
    cobsMedianFull: "median svježih procjena sjaja",
    altAzFull: "visina i azimut",
    raDecFull: "ekvatorijalni položaj",
    earthDistFull: "udaljenost od Zemlje",
    elongFull: "ugao od Sunca",
    skyMotionFull: "ugaona brzina",
    paSmjerFull: "pozicioni ugao kretanja",
    cobsLastFull: "vrijeme zadnjeg svježeg COBS unosa",
    solarCondFull: "stanje neba",
    orbitClass: "tip orbite",
    perihelion: "perihelna udaljenost",
    eccentricity: "ekscentricitet",
    inclination: "inklinacija",
    perihelionPassage: "prolaz kroz perihel",
    perihelionUncert: "nesigurnost perihelne udaljenosti",
    comaDiam: "prividni prečnik kome",
    tailLengthFull: "zadnja prijavljena dužina repa",
    observationCount: "broj svježih opažanja",
    methodFull: "tip posmatranja",
    mpcObsFull: "broj opažanja u MPC zapisu",
    rmsFull: "odstupanje orbitnog rješenja",
    discoveryFull: "mjesto otkrića",
    aerithBestFull: "preporučeno vrijeme",
    riseTranSetFull: "vremenski događaji za vašu lokaciju",
    vwsFull: "visibility window score",
    uncertFull: "procjena pouzdanosti",
    trendFull: "promjena magnitude iz COBS serije",
    shownOf: "Prikazano",
    of: "od",
    orbitSection: "Orbita",
    orbit3DSection: "3D orbita",
    visualSignal: "Vizuelni signal",
    mpcAerithOp: "MPC / Aerith / Operativa",
    noOrbitData: "Nema dovoljno orbitalnih elemenata za 3D prikaz.",
    noCurveData: "Nema dovoljno Horizons tačaka za crtanje krive.",
    curveCaption: "Visina komete u naredna 24 sata za zadanu lokaciju. Isprekidana linija označava horizont 0°.",
    noTailData: "nema novog unosa",
    noSummary: "Bez sažetka.",
    noTarget: "Trenutno nema izdvojene mete za zadanu lokaciju.",
    noNightTarget: "Nema odgovarajuće noćno vidljive mete.",
    bestTargetSummary: "Najbolja meta za",
    maxAlt: "max visina",
    optimumAround: "optimum oko",
    trendStable: "stabilno",
    trendBright: "posvjetljava se",
    trendFade: "slabi",
    trendNoData: "nema dovoljno tačaka",
    updatedLabel: "Ažurirano",
    checkedLabel: "Provjereno",
    errorsLabel: "Greške",
    cometographyLink: "Cometography vodič o kometama",
    esaCometsLink: "ESA: Komete — pregled",
    baaCometImages: "BAA: Slike kometa",
    usefulLinks: "Korisni linkovi",
    historicComets: "Historijski kometi",
    historicSubtitle: "20 najvažnijih kometa u historiji čovječanstva",
    historicReturn: "Sljedeći povratak",
    historicPeriod: "Orbitalni period",
    historicDiscovered: "Otkrivena",
    historicSignificance: "Historijski značaj",
    historicSymbolism: "Simbolizam",
    historicParams: "Orbitalni parametri",
    historicLastSeen: "Zadnji vidljiv",
    historicNeverReturn: "Ne vraća se (hiperbolična orbita)",
    historicUnknown: "Nepoznato",
    langToggle: "EN",
    filterAll: "Sve mete",
    filterVisible: "Noćno vidljive",
    filterFresh: "Svježi COBS",
    filterWatchlist: "Watchlist",
    statusNight: "Noćno vidljiva",
    statusUp: "Iznad horizonta",
    statusDown: "Ispod horizonta",
    statusNightDesc: "Može se loviti odmah sa zadane lokacije.",
    statusUpDesc: "Geometrijski je iznad horizonta, ali uslovi nisu puni noćni.",
    statusDownDesc: "Sa zadane lokacije trenutno je ispod horizonta.",
    solarNight: "Noć",
    solarDay: "Dnevno nebo",
    solarCivil: "Građanski sumrak",
    solarNautical: "Nautički sumrak",
    solarAstro: "Astronomski sumrak",
    sourceStateLive: "Live",
    sourceStatePartial: "Djelimično",
    sourceStateError: "Greška",
    sourceStateLinkOnly: "Link",
    sourceStateNight: "Noć",
    sourceStateUp: "Iznad horiz.",
    sourceStateDown: "Ispod horiz.",
    uncertLabel: "Uncert.",
    trendLabel: "Trend",
    noDataAdditionalCheck: "Potrebna je dodatna provjera podataka.",
    noImagingData: "Nema dovoljno podataka za imaging procjenu.",
    noTailMotionData: "Nema dovoljno podataka za poređenje repa i kretanja.",
    noOrbitComment: "nema dodatnog komentara",
  },
  en: {
    // Labels used in UI
    featuredEyebrow: "Top operational target now",
    detailEyebrow: "Detailed target view",
    locationLabel: "Location",
    riseTransitSet: "Rise / transit / set",
    photographicAssessment: "Photographic assessment",
    tailVsMotion: "Tail vs motion",
    tonightSummary: "Tonight summary",
    altitudeCurve: "Altitude curve 24 h",
    nightWindow: "Night window",
    operativeList: "Operative comet list",
    paramExplanation: "Parameter guide",
    cobsMedianFull: "median of recent brightness estimates",
    altAzFull: "altitude and azimuth",
    raDecFull: "equatorial position",
    earthDistFull: "distance from Earth",
    elongFull: "angle from Sun",
    skyMotionFull: "angular speed",
    paSmjerFull: "position angle of motion",
    cobsLastFull: "time of last fresh COBS entry",
    solarCondFull: "sky condition",
    orbitClass: "orbit type",
    perihelion: "perihelion distance",
    eccentricity: "eccentricity",
    inclination: "inclination",
    perihelionPassage: "perihelion passage",
    perihelionUncert: "perihelion distance uncertainty",
    comaDiam: "apparent coma diameter",
    tailLengthFull: "last reported tail length",
    observationCount: "number of fresh observations",
    methodFull: "observation method",
    mpcObsFull: "number of MPC observations",
    rmsFull: "orbit solution residual",
    discoveryFull: "discovery site",
    aerithBestFull: "recommended time",
    riseTranSetFull: "time events for your location",
    vwsFull: "visibility window score",
    uncertFull: "reliability estimate",
    trendFull: "magnitude change from COBS series",
    shownOf: "Shown",
    of: "of",
    orbitSection: "Orbit",
    orbit3DSection: "3D orbit",
    visualSignal: "Visual signal",
    mpcAerithOp: "MPC / Aerith / Operations",
    noOrbitData: "Not enough orbital elements for 3D view.",
    noCurveData: "Not enough Horizons points to draw the curve.",
    curveCaption: "Comet altitude for next 24 hours at the given location. Dashed line marks horizon 0°.",
    noTailData: "no recent entry",
    noSummary: "No summary.",
    noTarget: "No featured target for the given location.",
    noNightTarget: "No suitable night-visible target.",
    bestTargetSummary: "Best target for",
    maxAlt: "max alt",
    optimumAround: "optimum around",
    trendStable: "stable",
    trendBright: "brightening",
    trendFade: "fading",
    trendNoData: "not enough points",
    updatedLabel: "Updated",
    checkedLabel: "Checked",
    errorsLabel: "Errors",
    cometographyLink: "Cometography guide to comets",
    esaCometsLink: "ESA: Comets — an overview",
    baaCometImages: "BAA: Comet images",
    usefulLinks: "Useful links",
    historicComets: "Historic comets",
    historicSubtitle: "20 most important comets in human history",
    historicReturn: "Next return",
    historicPeriod: "Orbital period",
    historicDiscovered: "Discovered",
    historicSignificance: "Historical significance",
    historicSymbolism: "Symbolism",
    historicParams: "Orbital parameters",
    historicLastSeen: "Last visible",
    historicNeverReturn: "Non-returning (hyperbolic orbit)",
    historicUnknown: "Unknown",
    statusNight: "Visible at night",
    statusUp: "Above horizon",
    statusDown: "Below horizon",
    statusNightDesc: "Can be observed now from the given location.",
    statusUpDesc: "Geometrically above horizon, but not full night conditions.",
    statusDownDesc: "Currently below the horizon for the given location.",
    solarNight: "Night",
    solarDay: "Daytime sky",
    solarCivil: "Civil twilight",
    solarNautical: "Nautical twilight",
    solarAstro: "Astronomical twilight",
    sourceStateLive: "Live",
    sourceStatePartial: "Partial",
    sourceStateError: "Error",
    sourceStateLinkOnly: "Link",
    sourceStateNight: "Night",
    sourceStateUp: "Above hor.",
    sourceStateDown: "Below hor.",
    uncertLabel: "Uncert.",
    trendLabel: "Trend",
    noDataAdditionalCheck: "Additional data check required.",
    noImagingData: "Not enough data for imaging assessment.",
    noTailMotionData: "Not enough data for tail vs motion comparison.",
    noOrbitComment: "no additional comment",
    appTitle: "Comet Hunter",
    author: "AUTHOR: ALAN CATOVIC",
    heroLead: "A unique dashboard for currently visible comets, with professional orbital parameters from the JPL/MPC layer, live photometry from COBS/Aerith sources and operational planning tools.",
    liveRadar: "Live comet radar",
    watchlistExport: "Watchlist + export",
    nightVisible: "Visible at night",
    maxNightAlt: "Max night altitude",
    watchlistCount: "Watchlist",
    shown: "Shown",
    feedUpdated: "Feed updated",
    brightestTarget: "Brightest target",
    bestOpTarget: "Best operational target",
    observerLocation: "Observer location",
    changeTheme: "Toggle theme",
    label: "Label",
    elevation: "Elevation (km)",
    refreshEphemeris: "Refresh ephemeris",
    myLocation: "My location",
    viewFilters: "View & filters",
    viewFiltersSub: "Select display mode first, then apply an active working filter.",
    compact: "Compact",
    detailed: "Detailed",
    allTargets: "All targets",
    nightVisibleFilter: "Visible at night",
    freshCobs: "Fresh COBS",
    activeFilter: "Active filter",
    sourceHealth: "Source health",
    sourceHealthSub: "Availability of data feeds for the current refresh.",
    sources: "Sources & role",
    aboutApp: "About",
    details: "Details",
    addWatchlist: "Add to watchlist",
    removeWatchlist: "Remove from watchlist",
    bestTargetTonight: "Best target tonight from",
    loading: "Fetching Aerith, JPL, COBS and MPC sources...",
    errorTitle: "Data not loaded",
    retry: "Retry",
    noTarget: "No featured target for the given location.",
    // New features
    starMap: "Sky map",
    visCalendar: "Visibility calendar",
    notifications: "Notifications",
    enableNotif: "Enable notifications",
    disableNotif: "Disable notifications",
    notifGranted: "Notifications enabled",
    notifDenied: "Notifications blocked in browser",
    notifPrompt: "Click to allow notifications",
    newCometAlert: "🆕 New comet discovered",
    alarmActive: "Alarm active",
    alarmInactive: "Alarm off",
    conditionsMet: "✅ Favourable conditions! Comet is above horizon and sky is clear.",
    conditionsNotMet: "Waiting: comet above horizon + clear sky.",
    cloudCheckFailed: "Unable to check cloud cover.",
    weatherSource: "Cloud cover (Open-Meteo)",
    weekView: "Week",
    monthView: "Month",
    calendarTitle: "Comet visibility calendar",
    visibleHours: "visible h",
    starMapTitle: "Sky map (Az/Alt)",
    zenith: "Zenith",
    horizon: "Horizon",
    close: "Close",
    source: "Source",
    notifVisibleTonight: "will be visible tonight",
    notifAt: "around",
    good: "good",
    checkWeather: "Check conditions",
    langToggle: "BS",
    filterAll: "All targets",
    filterVisible: "Visible at night",
    filterFresh: "Fresh COBS",
    filterWatchlist: "Watchlist",
  }
};

function t(key) {
  const lang = state?.lang || "bs";
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.bs[key] || key;
}

// ── Server-string translator ──────────────────────────────────────────────────
// The server always returns strings in Bosnian. This map translates them to EN.
const SERVER_STRING_EN = {
  // Visibility status labels
  "Noćno vidljiva": "Visible at night",
  "Iznad horizonta": "Above horizon",
  "Ispod horizonta": "Below horizon",
  // Visibility status summaries
  "Može se loviti odmah sa zadane lokacije.": "Can be observed now from the given location.",
  "Geometrijski je iznad horizonta, ali uslovi nisu puni noćni.": "Geometrically above horizon, but not full night conditions.",
  "Sa zadane lokacije trenutno je ispod horizonta.": "Currently below the horizon for the given location.",
  // Magnitude class
  "Potencijalno dvogled/golo oko": "Potentially binoculars/naked eye",
  "Dvogled ili manji teleskop": "Binoculars or small telescope",
  "Teleskop srednjeg otvora": "Medium-aperture telescope",
  "Fotometrijska/teleskopska meta": "Photometric/telescopic target",
  // Operational verdicts
  "Potrebno tamnije nebo i provjera detalja prije izlaska.": "Darker sky and detail check needed before going out.",
  "Nisko iznad horizonta.": "Low above the horizon.",
  "Blizu Suncu, geometrija posmatranja je ograničena.": "Close to the Sun, observing geometry is limited.",
  "Vizuelno dobra meta.": "Good visual target.",
  "Dobra fotografska meta.": "Good photographic target.",
  "Potrebna je dodatna provjera podataka.": "Additional data check required.",
  // Imaging verdicts
  "Standardna fotografska meta.": "Standard photographic target.",
  "Brža meta, skrati pojedinačne ekspozicije.": "Fast-moving target, shorten individual exposures.",
  "Niska meta, koristi kraći put kroz atmosferu kad je moguće.": "Low target, use shorter atmospheric path when possible.",
  "Slab objekat, planiraj veću integraciju.": "Faint object, plan longer integration.",
  "Nema dovoljno podataka za imaging procjenu.": "Not enough data for imaging assessment.",
  // Tail motion labels
  "Rep je približno poravnat sa vektorom kretanja.": "Tail is approximately aligned with the motion vector.",
  "Rep je umjereno odmaknut od vektora kretanja.": "Tail is moderately offset from the motion vector.",
  "Rep i vektor kretanja su snažno razdvojeni.": "Tail and motion vector are strongly separated.",
  "Nema dovoljno podataka za poređenje repa i vektora kretanja.": "Not enough data for tail vs. motion comparison.",
  // Uncertainty labels
  "Visoka pouzdanost": "High reliability",
  "Dobra pouzdanost": "Good reliability",
  "Umjerena pouzdanost": "Moderate reliability",
  "Oprez": "Caution",
  // Uncertainty notes
  "viši condition code": "higher condition code",
  "nema condition code": "no condition code",
  "povišen RMS": "elevated RMS",
  "malo opažanja": "few observations",
  "stariji orbitni luk": "older orbital arc",
  "stabilno orbitno rješenje": "stable orbital solution",
  // Solar states
  "Noć": "Night",
  "Dnevno nebo": "Daytime sky",
  "Građanski sumrak": "Civil twilight",
  "Nautički sumrak": "Nautical twilight",
  "Astronomski sumrak": "Astronomical twilight",
  "Nepoznato": "Unknown",
  // Tonight summaries (prefix patterns handled in buildHeroSummary already)
  "Trenutno nema izdvojene mete za zadanu lokaciju.": "No featured target for the given location.",
  // Instrument hints
  "Provjeri fotometriju i trenutnu visinu objekta prije izlaska na teren.": "Check photometry and current object altitude before going out.",
  "Vrijedi provjeriti golo oko i dvogled prije teleskopa.": "Worth checking naked eye and binoculars before telescope.",
  "Dobar dvogled ili kompaktan teleskop je realna početna konfiguracija.": "Good binoculars or compact telescope is a realistic starting setup.",
  "Najbolja meta za srednji amaterski teleskop uz tamnije nebo.": "Best target for medium amateur telescope under darker skies.",
  "Slaba meta: planiraj veći otvor, kameru i pažljiv stack.": "Faint target: plan larger aperture, camera and careful stacking.",
  // Source guide purposes
  "Sedmična selekcija vidljivih kometa i praktični komentari za amatere.": "Weekly selection of visible comets and practical comments for amateurs.",
  "Orbitalni elementi, klase orbita i nesigurnosti parametara.": "Orbital elements, orbit classes and parameter uncertainties.",
  "Precizna trenutna efemerida za zadanu lokaciju posmatrača.": "Precise current ephemeris for the given observer location.",
  "Svježa mjerenja sjaja, kome i repa od posmatrača širom svijeta.": "Fresh brightness, coma and tail measurements from observers worldwide.",
  "Službena orbitna i opservaciona evidencija IAU/MPC.": "Official orbital and observational records from IAU/MPC.",
  "Finder karte i vizuelna provjera po kometi.": "Finder charts and visual verification per comet.",
  // Warnings/processing
  "Obrada komete": "Processing comet",
};

// Translate a server-returned string to current UI language
function ts(str) {
  if (!str) return str;
  if ((state?.lang || "bs") === "bs") return str;
  // Full match
  if (SERVER_STRING_EN[str] !== undefined) return SERVER_STRING_EN[str];
  // Partial/composite: translate comma-separated uncertainty notes
  const parts = str.split(", ");
  if (parts.length > 1) {
    const translated = parts.map((p) => SERVER_STRING_EN[p] || p);
    if (translated.some((p, i) => p !== parts[i])) return translated.join(", ");
  }
  return str;
}
const state = {
  theme: localStorage.getItem("comet-hunter-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
  lang: localStorage.getItem("comet-hunter-lang") || "bs",
  filter: localStorage.getItem("comet-hunter-filter") || "all",
  viewMode: localStorage.getItem("comet-hunter-view") || "compact",
  aboutOpen: false,
  starMapOpen: false,
  calendarOpen: false,
  historicOpen: false,
  notifOpen: false,
  loading: true,
  error: null,
  data: null,
  selectedCometId: null,
  watchlist: loadStoredJson("comet-hunter-watchlist", []),
  seenCometIds: loadStoredJson("comet-hunter-seen-comets", []),
  newCometIds: [],
  notificationsEnabled: loadStoredJson("comet-hunter-notif", false),
  alarmActive: loadStoredJson("comet-hunter-alarm", false),
  alarmStatus: null,
  cloudCover: null,
  calendarRange: "week",
  observer: {
    label: "Sarajevo",
    lat: 43.8563,
    lon: 18.4131,
    elev: 0.55
  },
  handlersBound: false,
};

const numberFormat = new Intl.NumberFormat("bs-BA", {
  maximumFractionDigits: 2
});

const dateTimeFormat = new Intl.DateTimeFormat("bs-BA", {
  dateStyle: "medium",
  timeStyle: "short"
});

const timeFormat = new Intl.DateTimeFormat("bs-BA", {
  hour: "2-digit",
  minute: "2-digit"
});

setTheme(state.theme);
setLang(state.lang);
render();
loadData();

async function loadData() {
  state.loading = true;
  state.error = null;
  render();

  try {
    const params = new URLSearchParams({
      lat: String(state.observer.lat),
      lon: String(state.observer.lon),
      elev: String(state.observer.elev),
      label: state.observer.label,
      limit: "12"
    });

    const response = await fetch(`/api/comets?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`API greška ${response.status}`);
    }

    state.data = await response.json();

    // ── Detect new comets ──────────────────────────────────────────────
    const currentIds = (state.data.comets || []).map((c) => c.designation);
    if (state.seenCometIds.length > 0) {
      state.newCometIds = currentIds.filter((id) => !state.seenCometIds.includes(id));
      if (state.newCometIds.length > 0 && state.notificationsEnabled) {
        state.newCometIds.forEach((id) => {
          const comet = state.data.comets.find((c) => c.designation === id);
          if (comet) sendBrowserNotification(`${t("newCometAlert")}: ${comet.displayName}`, `mag ${comet.sky?.totalMagnitude ?? "?"}`);
        });
      }
    } else {
      state.newCometIds = [];
    }
    state.seenCometIds = [...new Set([...state.seenCometIds, ...currentIds])];
    localStorage.setItem("comet-hunter-seen-comets", JSON.stringify(state.seenCometIds));

    // ── Schedule visibility alerts ────────────────────────────────────
    scheduleVisibilityAlerts(state.data.comets || []);

    // ── Check alarm conditions ────────────────────────────────────────
    if (state.alarmActive) checkAlarmConditions();

  } catch (error) {
    state.error = error instanceof Error ? error.message : (state.lang === "bs" ? "Neuspjelo učitavanje" : "Failed to load");
  } finally {
    state.loading = false;
    render();
  }
}

function render() {
  if (state.loading) {
    app.innerHTML = renderShell(`
      <section class="loading-panel">
        <div class="loading-panel__pulse"></div>
        <p>${t("loading")}</p>
      </section>
    `);
    bindControls();
    return;
  }

  if (state.error) {
    app.innerHTML = renderShell(`
      <section class="error-panel">
        <h2>${t("errorTitle")}</h2>
        <p>${escapeHtml(state.error)}</p>
        <button class="button button--primary" data-action="retry">${t("retry")}</button>
      </section>
    `);
    bindControls();
    return;
  }

  const prepared = getPreparedComets(state.data?.comets || []);
  const brightest = selectBrightestEveningComet(prepared);
  const featured = selectOperationalComet(prepared);
  const selectedComet = prepared.find((comet) => comet.id === state.selectedCometId) || null;

  app.innerHTML = renderShell(`
    ${state.newCometIds.length ? renderNewCometBanner() : ""}
    ${renderHero(brightest, featured, prepared)}
    <main class="layout">
      ${renderSidebar(prepared)}
      <section class="content">
        ${renderTargetHighlights(brightest, featured)}
        ${featured ? renderFeatured(featured) : ""}
        ${(state.data?.warnings || []).length ? renderWarnings(state.data.warnings) : ""}
        ${renderListPanel(prepared)}
      </section>
    </main>
    ${renderAboutModal()}
    ${renderStarMapModal(prepared)}
    ${renderCalendarModal(prepared)}
    ${renderNotifModal(prepared)}
    ${renderHistoricModal()}
    ${selectedComet ? renderCometModal(selectedComet) : ""}
  `);

  bindControls();
}

function renderShell(inner) {
  return `<div class="shell">${inner}</div>`;
}

function renderHero(brightest, featured, prepared) {
  const summary = buildHeroSummary(featured);
  return `
    <header class="hero">
      <div class="hero__backdrop"></div>
      <div class="hero__layout">
        <div class="hero__content">
          <div class="hero__topline">
            <div class="hero__chip-group">
              <span class="hero__chip">${t("liveRadar")}</span>
              <span class="hero__chip">JPL + MPC + COBS</span>
              <span class="hero__chip">${t("watchlistExport")}</span>
            </div>
            <div class="hero__topline-actions">
              <button class="button button--icon" type="button" data-action="lang-toggle" title="${state.lang === "bs" ? "Switch to English" : "Prebaci na bosanski"}">${state.lang === "bs" ? "EN" : "BS"}</button>
              <button class="button" type="button" data-action="about-open">${t("aboutApp")}</button>
            </div>
          </div>
          <h1>${t("appTitle")}</h1>
          <p class="hero__author">${t("author")}</p>
          <p class="hero__lead">${t("heroLead")}</p>
          <p class="hero__summaryline">${escapeHtml(summary)}</p>
          <div class="hero__stats">
            ${renderStat(t("nightVisible"), String(prepared.filter((comet) => comet.status.visibilityBand === "night").length))}
            ${renderStat(t("watchlistCount"), String(prepared.filter((comet) => comet.isFavorite).length))}
            ${renderStat(t("shown"), String(prepared.length))}
            ${renderStat(t("feedUpdated"), escapeHtml(state.data?.meta?.weeklyFeedUpdated || "n/a"))}
          </div>
          <div class="hero__feature-buttons">
            <button class="button button--feature" type="button" data-action="star-map-open">🌌 ${t("starMap")}</button>
            <button class="button button--feature" type="button" data-action="calendar-open">📅 ${t("visCalendar")}</button>
            <button class="button button--feature${state.notificationsEnabled ? " button--feature--active" : ""}" type="button" data-action="notif-open">🔔 ${t("notifications")}</button>
            <button class="button button--feature button--feature--historic" type="button" data-action="historic-open">☄️ ${t("historicComets")}</button>
          </div>
        </div>
        <div class="hero__visual">
          <img class="hero__image" src="/images/comet-hunter.jpg" alt="Comet Hunter observatorij i kometa na noćnom nebu">
          <div class="hero__visual-overlay"></div>
          <div class="hero__panel hero__panel--top">
            <span class="hero__panel-label">${t("brightestTarget")}</span>
            <strong>${escapeHtml(brightest?.displayName || "Aktuelna kometa")}</strong>
            <p>${escapeHtml(buildBrightestSummary(brightest))}</p>
          </div>
          <div class="hero__panel hero__panel--bottom">
            <span class="hero__panel-label">${t("bestOpTarget")}</span>
            <strong class="hero__panel-comet-name">${escapeHtml(featured?.displayName || "n/a")}</strong>
            <div class="hero__panel-metrics">
              <div>
                <span>Mag</span>
                <strong>${formatMagnitude(featured?.observations?.medianMagnitude ?? featured?.sky?.totalMagnitude)}</strong>
              </div>
              <div>
                <span>VWS</span>
                <strong>${formatPlainNumber(featured?.operational?.visibilityWindowScore)}</strong>
              </div>
              <div>
                <span>${t("uncertLabel")}</span>
                <strong>${escapeHtml(featured?.uncertainty?.label || "n/a")}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

function renderTargetHighlights(brightest, operational) {
  return `
    <section class="target-duo">
      ${renderTargetHighlightCard(t("brightestTarget"), brightest, buildBrightestSummary(brightest))}
      ${renderTargetHighlightCard(t("bestOpTarget"), operational, operational?.operational?.verdict || "n/a")}
    </section>
  `;
}

function renderTargetHighlightCard(label, comet, summary) {
  return `
    <article class="panel target-card">
      <div class="panel__section">
        <p class="panel__eyebrow">${escapeHtml(label)}</p>
        <h3>${escapeHtml(comet?.displayName || "n/a")}</h3>
        <p class="panel__note">${escapeHtml(summary || "n/a")}</p>
      </div>
    </article>
  `;
}

function renderSidebar(prepared) {
  return `
    <aside class="panel panel--aside">
      <section class="panel__section">
        <div class="panel__head">
          <h2>${t("observerLocation")}</h2>
          <button class="theme-toggle" data-action="theme" aria-label="${t("changeTheme")}">
            ${state.theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
        <form id="observer-form" class="observer-form">
          <label>
            ${t("label")}
            <input name="label" type="text" value="${escapeAttr(state.observer.label)}">
          </label>
          <label>
            Lat
            <input name="lat" type="number" step="0.0001" value="${state.observer.lat}">
          </label>
          <label>
            Lon
            <input name="lon" type="number" step="0.0001" value="${state.observer.lon}">
          </label>
          <label>
            ${t("elevation")}
            <input name="elev" type="number" step="0.01" min="0" value="${state.observer.elev}">
          </label>
          <div class="observer-form__actions">
            <button class="button button--primary" type="submit">${t("refreshEphemeris")}</button>
            <button class="button" type="button" data-action="locate">${t("myLocation")}</button>
          </div>
        </form>
        <p class="panel__note">
          ${state.lang === "bs"
            ? "Rise/transit/set, altitude curve i svi topocentrički položaji računaju se za unesene koordinate."
            : "Rise/transit/set, altitude curve and all topocentric positions are computed for the entered coordinates."
          }
        </p>
      </section>

      <section class="panel__section">
        <div class="panel__head panel__head--stack">
          <h2>${t("viewFilters")}</h2>
          <p class="panel__subtitle">${t("viewFiltersSub")}</p>
        </div>
        <div class="toolbar-row">
          ${renderModeButton("compact", t("compact"))}
          ${renderModeButton("detailed", t("detailed"))}
        </div>
        <div class="filter-row">
          ${renderFilterButton("all", t("filterAll"))}
          ${renderFilterButton("visible", t("filterVisible"))}
          ${renderFilterButton("fresh", t("filterFresh"))}
          ${renderFilterButton("watchlist", t("filterWatchlist"))}
        </div>
        <div class="help-card">
          <strong>${t("activeFilter")}: ${escapeHtml(filterLabel(state.filter))}</strong>
          <p>${escapeHtml(filterDescription(state.filter))}</p>
        </div>
      </section>

      <section class="panel__section sidebar-feature-buttons">
        <h2>Alati</h2>
        <div class="feature-button-grid">
          <button class="button button--feature-sidebar" type="button" data-action="star-map-open">🌌 ${t("starMap")}</button>
          <button class="button button--feature-sidebar" type="button" data-action="calendar-open">📅 ${t("visCalendar")}</button>
          <button class="button button--feature-sidebar${state.notificationsEnabled ? " button--feature-sidebar--active" : ""}" type="button" data-action="notif-open">🔔 ${t("notifications")}</button>
          <button class="button button--feature-sidebar button--feature-sidebar--historic" type="button" data-action="historic-open">☄️ ${t("historicComets")}</button>
        </div>
        ${state.alarmActive ? `<div class="alarm-badge alarm-badge--${state.alarmStatus?.ok ? "active" : "waiting"}">${state.alarmStatus?.message || t("alarmActive")}</div>` : ""}
      </section>

      <section class="panel__section">
        <div class="panel__head panel__head--stack">
          <h2>${t("sourceHealth")}</h2>
          <p class="panel__subtitle">${t("sourceHealthSub")}</p>
        </div>
        <div class="source-health">
          ${renderSourceHealth(state.data?.sourceStatus || {})}
        </div>
      </section>

      <section class="panel__section">
        <h2>${t("sources")}</h2>
        <div class="source-list">
          ${(state.data?.sourceGuide || []).map(renderSourceGuide).join("")}
        </div>
      </section>
      <section class="panel__section">
        <h2>${t("usefulLinks")}</h2>
        <div class="useful-links-list">
          <a class="useful-link" href="https://cometography.com/periodic_comets.html" target="_blank" rel="noreferrer">
            ☄️ ${t("cometographyLink")}
          </a>
          <a class="useful-link" href="https://www.esa.int/Science_Exploration/Space_Science/Rosetta/Comets_an_overview" target="_blank" rel="noreferrer">
            🚀 ${t("esaCometsLink")}
          </a>
          <a class="useful-link" href="https://britastro.org/cometobs/" target="_blank" rel="noreferrer">
            📷 ${t("baaCometImages")}
          </a>
        </div>
      </section>
    </aside>
  `;
}

function renderFeatured(comet) {
  return `
    <section class="panel panel--featured">
      <div class="featured__header">
        <div>
          <p class="panel__eyebrow">${t("featuredEyebrow")}</p>
          <h2>${escapeHtml(comet.displayName)}</h2>
          <p class="featured__summary">${escapeHtml(ts(comet.operational?.verdict) || ts(comet.summary) || t("noSummary"))}</p>
        </div>
        <div class="status-cluster">
          ${renderStateChip(comet.status.visibilityBand, comet.status.label)}
          ${renderUncertaintyBadge(comet.uncertainty)}
        </div>
      </div>
      <div class="featured__layout">
        <div class="featured__metrics">
          ${renderFeatureMetric("Mag", formatMagnitude(comet.observations.medianMagnitude ?? comet.sky.totalMagnitude))}
          ${renderFeatureMetric("VWS", formatPlainNumber(comet.operational.visibilityWindowScore))}
          ${renderFeatureMetric(t("maxNightAlt"), formatAngle(comet.visibilityWindow.bestNightAltitudeDeg ?? comet.sky.altitudeDeg))}
          ${renderFeatureMetric(t("nightWindow"), formatDuration(comet.visibilityWindow.nightVisibleHours))}
        </div>
        <div class="featured__details">
          <p><strong>${t("locationLabel")}:</strong> ${escapeHtml(state.observer.label)} (${formatPlainNumber(state.observer.lat)}, ${formatPlainNumber(state.observer.lon)})</p>
          <p><strong>${t("riseTransitSet")}:</strong> ${formatEventTime(comet.visibilityWindow.riseAt)} / ${formatEventTime(comet.visibilityWindow.transitAt)} / ${formatEventTime(comet.visibilityWindow.setAt)}</p>
          <p><strong>${t("photographicAssessment")}:</strong> ${escapeHtml(ts(comet.operational.imagingVerdict))}</p>
          <p><strong>${t("tailVsMotion")}:</strong> ${escapeHtml(ts(comet.tailMotion.label))}</p>
          <p><strong>${t("tonightSummary")}:</strong> ${escapeHtml(buildHeroSummary(comet))}</p>
        </div>
      </div>
      <div class="curve-panel">
        <div class="curve-panel__head">
          <h3>${t("altitudeCurve")}</h3>
          <span>${escapeHtml(comet.sky.constellation || "n/a")}</span>
        </div>
        ${renderAltitudeCurve(comet.sky.altitudeCurve, comet.visibilityWindow)}
      </div>
      <div class="featured__ops-grid">
        ${renderEventMetric("Rise", formatEventTime(comet.visibilityWindow.riseAt))}
        ${renderEventMetric("Transit", formatEventTime(comet.visibilityWindow.transitAt))}
        ${renderEventMetric("Set", formatEventTime(comet.visibilityWindow.setAt))}
        ${renderEventMetric(t("maxNightAlt"), formatAngle(comet.visibilityWindow.bestNightAltitudeDeg ?? comet.sky.altitudeDeg))}
        ${renderEventMetric(t("nightWindow"), formatDuration(comet.visibilityWindow.nightVisibleHours))}
        ${renderEventMetric(t("uncertLabel"), comet.uncertainty.label)}
      </div>
    </section>
  `;
}

function renderWarnings(warnings) {
  return `
    <section class="panel panel--warning">
      <div class="panel__head">
        <h2>${state.lang === "bs" ? "Napomene o podacima" : "Data notices"}</h2>
        <p class="panel__subtitle">${state.lang === "bs" ? "Vanjski servisi ponekad vrate parcijalne ili zakašnjele odgovore." : "External services sometimes return partial or delayed responses."}</p>
      </div>
      <div class="warning-list">
        ${warnings
          .slice(0, 8)
          .map(
            (warning) => `
              <article class="warning-card">
                <strong>${escapeHtml(ts(warning.scope))}</strong>
                <p>${escapeHtml(ts(warning.message))}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderListPanel(comets) {
  return `
    <section class="panel">
      <div class="panel__section">
        <div class="panel__head panel__head--top">
          <div>
            <h2>${t("operativeList")}</h2>
            <p class="panel__note">
              <strong>${t("paramExplanation")}:</strong>
              <strong><code>Status</code></strong> ${state.lang === "en" ? "geometric visibility" : "geometrijska vidljivost"},
              <strong><code>COBS median</code></strong> ${t("cobsMedianFull")},
              <strong><code>T-mag</code></strong> ${state.lang === "en" ? "total magnitude from Horizons" : "ukupna magnituda iz Horizons-a"},
              <strong><code>Alt/Az</code></strong> ${t("altAzFull")},
              <strong><code>RA/Dec</code></strong> ${t("raDecFull")},
              <strong><code>Δ</code></strong> ${t("earthDistFull")},
              <strong><code>Elong.</code></strong> ${t("elongFull")},
              <strong><code>μ</code></strong> ${t("skyMotionFull")},
              <strong><code>${state.lang === "en" ? "PA motion" : "PA smjera"}</code></strong> ${t("paSmjerFull")},
              <strong><code>${state.lang === "en" ? "COBS last" : "COBS zadnje"}</code></strong> ${t("cobsLastFull")},
              <strong><code>${state.lang === "en" ? "Solar cond." : "Solarni uslov"}</code></strong> ${t("solarCondFull")},
              <strong><code>${state.lang === "en" ? "Class" : "Klasa"}</code></strong> ${t("orbitClass")},
              <strong><code>q</code></strong> ${t("perihelion")},
              <strong><code>e</code></strong> ${t("eccentricity")},
              <strong><code>i</code></strong> ${t("inclination")},
              <strong><code>Tp</code></strong> ${t("perihelionPassage")},
              <strong><code>σ(q)</code></strong> ${t("perihelionUncert")},
              <strong><code>${state.lang === "en" ? "Coma" : "Koma"}</code></strong> ${t("comaDiam")},
              <strong><code>${state.lang === "en" ? "Tail" : "Rep"}</code></strong> ${t("tailLengthFull")},
              <strong><code>${state.lang === "en" ? "Obs." : "Posm."}</code></strong> ${t("observationCount")},
              <strong><code>${state.lang === "en" ? "Method" : "Metoda"}</code></strong> ${t("methodFull")},
              <strong><code>MPC obs</code></strong> ${t("mpcObsFull")},
              <strong><code>RMS</code></strong> ${t("rmsFull")},
              <strong><code>Discovery</code></strong> ${t("discoveryFull")},
              <strong><code>Aerith best</code></strong> ${t("aerithBestFull")},
              <strong><code>Rise/Transit/Set</code></strong> ${t("riseTranSetFull")},
              <strong><code>VWS</code></strong> ${t("vwsFull")},
              <strong><code>Uncert.</code></strong> ${t("uncertFull")},
              <strong><code>Trend</code></strong> ${t("trendFull")}.
            </p>
          </div>
          <p class="panel__subtitle">${t("shownOf")}: ${comets.length} ${t("of")} ${(state.data?.comets || []).length}</p>
        </div>
      </div>
      <div class="comet-grid">
        ${comets.map((comet) => renderCometCard(comet)).join("")}
      </div>
    </section>
  `;
}

function renderCometCard(comet) {
  const summary = state.viewMode === "compact" ? ts(comet.operational.verdict) : ts(comet.summary) || ts(comet.operational.verdict);
  return `
    <article class="comet-card comet-card--${state.viewMode}" data-action="open-comet" data-comet-id="${escapeAttr(comet.id)}">
      <div class="comet-card__top">
        <div>
          <div class="comet-card__title-row">
            <h3>${escapeHtml(comet.displayName)}</h3>
            ${renderStateChip(comet.status.visibilityBand, comet.status.label)}
          </div>
          <p class="comet-card__nickname">${escapeHtml(comet.nickname || comet.designation)}</p>
        </div>
        <div class="comet-card__top-actions">
          <div class="orbit-badge">${renderOrbitSvg(comet.visuals.orbitPreview)}</div>
        </div>
      </div>

      <div class="comet-card__badges">
        ${renderUncertaintyBadge(comet.uncertainty)}
        <span class="status-chip status-chip--neutral">VWS ${formatPlainNumber(comet.operational.visibilityWindowScore)}</span>
        <span class="status-chip status-chip--neutral">${t("trendLabel")} ${escapeHtml(buildTrendLabel(comet))}</span>
      </div>

      <div class="comet-card__hero comet-card__hero--4">
        <div class="metric-tile">
          <span>COBS median</span>
          <strong>${formatMagnitude(comet.observations.medianMagnitude)}</strong>
        </div>
        <div class="metric-tile">
          <span>Horizons T-mag</span>
          <strong>${formatMagnitude(comet.sky.totalMagnitude)}</strong>
        </div>
        <div class="metric-tile">
          <span>Alt / Az</span>
          <strong>${formatAngle(comet.sky.altitudeDeg)} / ${formatAngle(comet.sky.azimuthDeg)}</strong>
        </div>
        <div class="metric-tile">
          <span>Rise / Set</span>
          <strong>${formatEventTime(comet.visibilityWindow.riseAt)} / ${formatEventTime(comet.visibilityWindow.setAt)}</strong>
        </div>
      </div>

      <div class="trend-box">
        <div>
          <span class="trend-box__label">${t("trendLabel")} magnitude</span>
          <strong>${escapeHtml(buildTrendLabel(comet))}</strong>
        </div>
        ${renderSparkline(comet.observations.recentSeries, "magnitude")}
      </div>

      <div class="verdict-block">
        <strong>${escapeHtml(ts(comet.operational.verdict))}</strong>
        <p>${escapeHtml(summary || t("noSummary"))}</p>
      </div>

      ${state.viewMode === "detailed" ? renderDetailedSections(comet, "card") : ""}

      <div class="comet-card__actions">
        <button class="button button--primary" type="button" data-action="open-comet" data-comet-id="${escapeAttr(comet.id)}">${t("details")}</button>
        <button class="button" type="button" data-action="toggle-watchlist" data-comet-id="${escapeAttr(comet.id)}">
          ${comet.isFavorite ? t("removeWatchlist") : t("addWatchlist")}
        </button>
      </div>
    </article>
  `;
}

function renderDetailedSections(comet, mode = "card") {
  const tail = comet.observations.tailLength
    ? `${formatPlainNumber(comet.observations.tailLength.value)} ${escapeHtml(comet.observations.tailLength.unit || "")}`
    : t("noTailData");

  return `
    <dl class="data-grid">
      <div><dt>RA</dt><dd>${escapeHtml(comet.sky.rightAscension || "n/a")}</dd></div>
      <div><dt>Dec</dt><dd>${escapeHtml(comet.sky.declination || "n/a")}</dd></div>
      <div><dt>${state.lang === "en" ? "Earth dist." : "Δ Zemlja"}</dt><dd>${formatDistance(comet.sky.earthDistanceAu)}</dd></div>
      <div><dt>Elong.</dt><dd>${formatAngle(comet.sky.solarElongationDeg)}</dd></div>
      <div><dt>μ</dt><dd>${formatMotion(comet.sky.skyMotionArcsecPerMin)}</dd></div>
      <div><dt>PA</dt><dd>${formatAngle(comet.sky.skyMotionPositionAngleDeg)}</dd></div>
      <div><dt>${state.lang === "en" ? "COBS last" : "COBS zadnje"}</dt><dd>${formatDate(comet.observations.latest?.date)}</dd></div>
      <div><dt>${state.lang === "en" ? "Solar cond." : "Solarni uslov"}</dt><dd>${escapeHtml(ts(comet.status.solarState))}</dd></div>
    </dl>

    <div class="mini-section">
      <h4>${t("orbitSection")}</h4>
      <div class="orbit-grid">
        ${renderOrbitMetric(state.lang === "en" ? "Class" : "Klasa", comet.orbit.className)}
        ${renderOrbitMetric("q", formatDistance(comet.orbit.elements.perihelionDistance?.value, " AU"))}
        ${renderOrbitMetric("e", formatPlainNumber(comet.orbit.elements.eccentricity?.value))}
        ${renderOrbitMetric("i", formatAngle(comet.orbit.elements.inclination?.value))}
        ${renderOrbitMetric("Tp", formatPlainNumber(comet.orbit.elements.perihelionPassage?.value))}
        ${renderOrbitMetric("σ(q)", formatPlainNumber(comet.orbit.elements.perihelionDistance?.sigma))}
      </div>
    </div>

    <div class="mini-section">
      <h4>${t("orbit3DSection")}</h4>
      ${renderOrbit3D(comet, mode)}
    </div>

    <div class="mini-section">
      <h4>${t("visualSignal")}</h4>
      <div class="orbit-grid">
        ${renderOrbitMetric(state.lang === "en" ? "Coma" : "Koma", formatDistance(comet.observations.comaDiameterArcmin, "'"))}
        ${renderOrbitMetric(state.lang === "en" ? "Tail" : "Rep", tail)}
        ${renderOrbitMetric(state.lang === "en" ? "Obs." : "Posm.", String(comet.observations.recentCount))}
        ${renderOrbitMetric(state.lang === "en" ? "Method" : "Metoda", comet.observations.latest?.method || "n/a")}
      </div>
    </div>

    <div class="mini-section">
      <h4>${t("mpcAerithOp")}</h4>
      <div class="orbit-grid">
        ${renderOrbitMetric("MPC obs", comet.mpc.observationsUsed ? String(comet.mpc.observationsUsed) : "n/a")}
        ${renderOrbitMetric("RMS", formatDistance(comet.mpc.residualRmsArcsec, "\""))}
        ${renderOrbitMetric("Discovery", comet.mpc.discoverySite || "n/a")}
        ${renderOrbitMetric("Aerith best", comet.weekly?.bestTimeLocal || "n/a")}
        ${renderOrbitMetric("Transit", formatEventTime(comet.visibilityWindow.transitAt))}
        ${renderOrbitMetric(t("photographicAssessment"), comet.operational.imagingVerdict)}
      </div>
    </div>
  `;
}

function renderCometModal(comet) {
  return `
    <div class="modal-overlay open" data-action="close-comet">
      <div class="modal-card modal-card--wide" role="dialog" aria-modal="true" aria-label="${escapeAttr(comet.displayName)}">
        <button class="modal-close" type="button" data-action="close-comet" aria-label="${t("close")}">×</button>
        <div class="modal-hero">
          <div>
            <p class="panel__eyebrow">${t("detailEyebrow")}</p>
            <h2>${escapeHtml(comet.displayName)}</h2>
            <p class="panel__note">${escapeHtml(ts(comet.summary) || ts(comet.operational.verdict))}</p>
          </div>
          <div class="status-cluster">
            ${renderStateChip(comet.status.visibilityBand, comet.status.label)}
            ${renderUncertaintyBadge(comet.uncertainty)}
          </div>
        </div>

        <div class="modal-grid">
          <section class="modal-section">
            <h3>${state.lang === "en" ? "Operational overview" : "Operativni pregled"}</h3>
            <div class="event-grid">
              ${renderEventMetric("Rise", formatEventTime(comet.visibilityWindow.riseAt))}
              ${renderEventMetric("Transit", formatEventTime(comet.visibilityWindow.transitAt))}
              ${renderEventMetric("Set", formatEventTime(comet.visibilityWindow.setAt))}
              ${renderEventMetric(t("nightWindow"), formatDuration(comet.visibilityWindow.nightVisibleHours))}
              ${renderEventMetric("VWS", formatPlainNumber(comet.operational.visibilityWindowScore))}
              ${renderEventMetric(t("trendLabel"), buildTrendLabel(comet))}
            </div>
            <div class="curve-panel curve-panel--modal">
              <div class="curve-panel__head">
                <h3>${t("altitudeCurve")}</h3>
                <span>${escapeHtml(ts(comet.operational.imagingVerdict))}</span>
              </div>
              ${renderAltitudeCurve(comet.sky.altitudeCurve, comet.visibilityWindow)}
            </div>
          </section>

          <section class="modal-section">
            <h3>${state.lang === "en" ? "Assessment & reliability" : "Procjena i pouzdanost"}</h3>
            <div class="warning-list">
              <article class="warning-card">
                <strong>${state.lang === "en" ? "Observability verdict" : "Verdict o posmatranju"}</strong>
                <p>${escapeHtml(ts(comet.operational.verdict))}</p>
              </article>
              <article class="warning-card">
                <strong>${t("photographicAssessment")}</strong>
                <p>${escapeHtml(ts(comet.operational.imagingVerdict))}</p>
              </article>
              <article class="warning-card">
                <strong>${t("uncertLabel")}</strong>
                <p>${escapeHtml(ts(comet.uncertainty.label))} (${formatPlainNumber(comet.uncertainty.score)}) - ${escapeHtml(ts(comet.uncertainty.note))}</p>
              </article>
              <article class="warning-card">
                <strong>${t("tailVsMotion")}</strong>
                <p>${escapeHtml(ts(comet.tailMotion.label))} ${comet.tailMotion.deltaDeg != null ? `(ΔPA ${formatPlainNumber(comet.tailMotion.deltaDeg)}°)` : ""}</p>
              </article>
            </div>
          </section>
        </div>

        <div class="modal-grid">
          <section class="modal-section">
            <h3>${state.lang === "en" ? "Target parameters" : "Parametri mete"}</h3>
            ${renderDetailedSections(comet, "modal")}
          </section>
          <section class="modal-section">
            <h3>${state.lang === "en" ? "Trend & links" : "Trend i linkovi"}</h3>
            <div class="trend-box trend-box--stack">
              <div>
                <span class="trend-box__label">COBS magnitude sparkline</span>
                <strong>${escapeHtml(buildTrendLabel(comet))}</strong>
              </div>
              ${renderSparkline(comet.observations.recentSeries, "magnitude", true)}
            </div>
            <div class="link-row">
              ${renderLink("Aerith", comet.links.aerith)}
              ${renderLink("COBS", comet.links.cobs)}
              ${renderLink("JPL SBDB", comet.links.jplSbdb)}
              ${renderLink("Horizons", comet.links.horizons)}
              ${renderLink("MPC", comet.links.mpc)}
              ${renderLink("Stellarium", buildStellariumUrl(comet))}
              ${renderLink("TheSkyLive", comet.links.theSkyLive)}
              ${renderLink("Cometography", "https://cometography.com/periodic_comets.html")}
              ${renderLink("ESA", "https://www.esa.int/Science_Exploration/Space_Science/Rosetta/Comets_an_overview")}
              ${renderLink("BAA", "https://britastro.org/cometobs/")}
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}

function renderAboutModal() {
  const bs = state.lang === "bs";
  return `
    <div class="modal-overlay ${state.aboutOpen ? "open" : ""}" data-action="about-close">
      <div class="modal-card" role="dialog" aria-modal="true" aria-label="${t("aboutApp")}">
        <button class="modal-close" type="button" data-action="about-close" aria-label="${t("close")}">×</button>
        <h2>${t("aboutApp")}</h2>
        <p class="panel__note">
          ${bs
            ? "Comet Hunter je profesionalni dashboard za praćenje kometa koji kombinuje live efemeride, orbitne elemente, operativno rangiranje i napredne alate za planiranje posmatranja."
            : "Comet Hunter is a professional comet-tracking dashboard combining live ephemerides, orbital elements, operational ranking and advanced observing tools."}
        </p>
        <div class="warning-list">
          <article class="warning-card">
            <strong>📡 ${bs ? "Efemeride za lokaciju" : "Location ephemerides"}</strong>
            <p>${bs
              ? "Za unesene koordinate računaju se <code>RA</code>, <code>Dec</code>, <code>Alt</code>, <code>Az</code>, <code>μ</code>, <code>rise/transit/set</code> i 24-satna altitude curve preko JPL Horizons."
              : "For entered coordinates, <code>RA</code>, <code>Dec</code>, <code>Alt</code>, <code>Az</code>, <code>μ</code>, <code>rise/transit/set</code> and a 24-hour altitude curve are computed via JPL Horizons."}</p>
          </article>
          <article class="warning-card">
            <strong>🔭 ${bs ? "Orbita i pouzdanost" : "Orbit & reliability"}</strong>
            <p>${bs
              ? "JPL SBDB i MPC daju klasu orbite, orbitalne elemente, RMS i condition code. Iz elemenata <code>q</code>, <code>e</code>, <code>i</code>, <code>Ω</code> i <code>ω</code> crta se 3D projekcija orbite sa perihelom, čvorovima i 1 AU referentnim krugom."
              : "JPL SBDB and MPC provide orbit class, orbital elements, RMS and condition code. From elements <code>q</code>, <code>e</code>, <code>i</code>, <code>Ω</code> and <code>ω</code> a 3D orbit projection is drawn with perihelion, nodes and a 1 AU reference circle."}</p>
          </article>
          <article class="warning-card">
            <strong>✨ ${bs ? "Vizuelni signal i trend" : "Visual signal & trend"}</strong>
            <p>${bs
              ? "COBS i Aerith dopunjuju profesionalne podatke median magnitudom, komom, repom, preporučenim vremenom i sparkline trendom sjaja."
              : "COBS and Aerith supplement professional data with median magnitude, coma, tail, recommended observation time and a sparkline brightness trend."}</p>
          </article>
          <article class="warning-card">
            <strong>🌌 ${bs ? "Interaktivna zvjezdana mapa" : "Interactive sky map"}</strong>
            <p>${bs
              ? "Polarna projekcija neba (azimut/visina) prikazuje pozicije svih kometa u realnom vremenu za vašu lokaciju. Klikni na komet za detalje."
              : "A polar sky projection (azimuth/altitude) shows real-time comet positions for your location. Click a comet for details."}</p>
          </article>
          <article class="warning-card">
            <strong>📅 ${bs ? "Kalendar vidljivosti" : "Visibility calendar"}</strong>
            <p>${bs
              ? "Sedmični i mjesečni prikaz pokazuje kada su kometi vidljivi iznad horizonta za vašu lokaciju, sa brojem noćnih sati vidljivosti po danu."
              : "Weekly and monthly view shows when comets are visible above the horizon for your location, with night-time visible hours per day."}</p>
          </article>
          <article class="warning-card">
            <strong>🔔 ${bs ? "Obavještenja i alarm" : "Notifications & alarm"}</strong>
            <p>${bs
              ? "Browser notifikacije upozoravaju na novotkrivene komete i povoljne uslove posmatranja. Alarm provjerava vidljivost kometa i oblačnost (Open-Meteo API) i šalje upozorenje kad uslovi budu povoljni."
              : "Browser notifications alert you to newly discovered comets and favourable observing conditions. The alarm checks comet visibility and cloud cover (Open-Meteo API) and sends an alert when conditions are right."}</p>
          </article>
          <article class="warning-card">
            <strong>⚙️ ${bs ? "Operativni sloj i filteri" : "Operational layer & filters"}</strong>
            <p>${bs
              ? "Aplikacija računa visibility window score (VWS) i rangira komete po operativnoj vrijednosti. Watchlist, filtri po vidljivosti i svježini COBS podataka omogućavaju brz pregled prioritetnih meta."
              : "The app computes a visibility window score (VWS) and ranks comets by operational value. Watchlist, filters by visibility and COBS data freshness allow quick review of priority targets."}</p>
          </article>
          <article class="warning-card">
            <strong>☄️ ${bs ? "Historijski kometi" : "Historic comets"}</strong>
            <p>${bs
              ? "Posebna stranica prikazuje 20 najvažnijih kometa u historiji čovječanstva — opis, orbitalne parametre, historijski značaj, simbolizam i kada se vraćaju."
              : "A dedicated page presents the 20 most important comets in human history — description, orbital parameters, historical significance, symbolism and expected return dates."}</p>
          </article>
          <article class="warning-card">
            <strong>🌐 ${bs ? "Dvojezičnost (BS/EN)" : "Bilingual (BS/EN)"}</strong>
            <p>${bs
              ? "Cijela aplikacija dostupna je na bosanskom i engleskom jeziku. Prebacivanje je dostupno putem dugmeta BS/EN u zaglavlju — uključujući sve labele, opise, statusne poruke i podatke sa servera."
              : "The entire app is available in Bosnian and English. Switch using the BS/EN button in the header — including all labels, descriptions, status messages and server data."}</p>
          </article>
          <article class="warning-card">
            <strong>⚠️ ${bs ? "Napomena o online radu" : "Online dependency note"}</strong>
            <p>${bs
              ? "Aplikacija koristi JPL Horizons, SBDB, MPC i COBS servise. Kada jedan feed degradira, UI prikazuje grešku u health sekciji uz keširani fallback gdje je moguć."
              : "The app uses JPL Horizons, SBDB, MPC and COBS services. When a feed degrades, the UI shows the error in the health section with a cached fallback where possible."}</p>
          </article>
        </div>
        <div class="about-links-section">
          <h3 class="about-links-title">🔗 ${t("usefulLinks")}</h3>
          <div class="about-links-grid">
            <a class="about-link-card" href="https://cometography.com/periodic_comets.html" target="_blank" rel="noreferrer">
              <span class="about-link-card__icon">☄️</span>
              <div>
                <strong>${t("cometographyLink")}</strong>
                <span>cometography.com</span>
              </div>
            </a>
            <a class="about-link-card" href="https://www.esa.int/Science_Exploration/Space_Science/Rosetta/Comets_an_overview" target="_blank" rel="noreferrer">
              <span class="about-link-card__icon">🚀</span>
              <div>
                <strong>${t("esaCometsLink")}</strong>
                <span>esa.int</span>
              </div>
            </a>
            <a class="about-link-card" href="https://britastro.org/cometobs/" target="_blank" rel="noreferrer">
              <span class="about-link-card__icon">📷</span>
              <div>
                <strong>${t("baaCometImages")}</strong>
                <span>britastro.org</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}
const HISTORIC_COMETS = [
  {
    id: "halley",
    name: "1P/Halley",
    nickname_bs: "Halleyeva kometa",
    nickname_en: "Halley's Comet",
    discovered_bs: "Promatrana od antike; Edmund Halley identificirao periodičnost 1705.",
    discovered_en: "Observed since antiquity; Edmund Halley identified its periodicity in 1705.",
    lastSeen: "1986",
    nextReturn: "~2061",
    period_bs: "~75–76 godina",
    period_en: "~75–76 years",
    q: "0.586 AU",
    e: "0.967",
    i: "162.2°",
    significance_bs: "Prva kometa s dokazanim periodičnim povratkom. Pojavljuje se u Bayeuxovoj tapiseriji (1066) i povezana je s bitkom kod Hastingsa. Mark Twain je rođen i umro s njenim prolazima (1835. i 1910.).",
    significance_en: "First comet with a proven periodic return. Appears in the Bayeux Tapestry (1066) and is linked to the Battle of Hastings. Mark Twain was born and died with its passages (1835 and 1910).",
    symbolism_bs: "Simbol kosmičke pravilnosti i božanskog upozorenja kroz historiju. Inspirisala Shakespearea, Napoleona je posmatrala kao zao predznak.",
    symbolism_en: "Symbol of cosmic regularity and divine warning throughout history. Inspired Shakespeare; Napoleon viewed it as an ill omen.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Halley%27s_Comet_-_May_8_1910.jpg/640px-Halley%27s_Comet_-_May_8_1910.jpg"
  },
  {
    id: "shoemaker-levy",
    name: "D/1993 F2",
    nickname_bs: "Shoemaker-Levy 9",
    nickname_en: "Shoemaker-Levy 9",
    discovered_bs: "Carolyn i Eugene Shoemaker i David Levy, 1993.",
    discovered_en: "Carolyn and Eugene Shoemaker and David Levy, 1993.",
    lastSeen: "1994",
    nextReturn: "Uništena / Destroyed",
    period_bs: "Uništena udarom u Jupiter 1994.",
    period_en: "Destroyed by impact on Jupiter in 1994.",
    q: "~0 (Jupiter impactor)",
    e: ">1 (kaptirana orbita)",
    i: "~6°",
    significance_bs: "Prva promatrana kolizija svemirskih tijela unutar Sunčevog sistema. Udar 21 fragmenta u Jupiter 1994. promijenio je razumijevanje planetarne zaštite i izumiranja vrsta.",
    significance_en: "First observed collision of Solar System bodies. The impact of 21 fragments into Jupiter in 1994 changed our understanding of planetary protection and mass extinctions.",
    symbolism_bs: "Upozorenje da kosmičke katastrofe nisu samo historija — i Zemlja je ranjiva.",
    symbolism_en: "A warning that cosmic catastrophes are not just history — Earth is also vulnerable.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/SL9.jpg/640px-SL9.jpg"
  },
  {
    id: "hale-bopp",
    name: "C/1995 O1",
    nickname_bs: "Hale-Bopp",
    nickname_en: "Hale-Bopp",
    discovered_bs: "Alan Hale i Thomas Bopp, 1995.",
    discovered_en: "Alan Hale and Thomas Bopp, 1995.",
    lastSeen: "1997",
    nextReturn: "~4385",
    period_bs: "~2.520 godina",
    period_en: "~2,520 years",
    q: "0.914 AU",
    e: "0.995",
    i: "89.4°",
    significance_bs: "Najduže promatrana kometa golim okom u historiji — vidljiva 18 mjeseci. Potaknula osnivanje planetarnih obrambenih programa.",
    significance_en: "The longest naked-eye comet in history — visible for 18 months. Triggered the founding of planetary defence programmes.",
    symbolism_bs: "Simbol ljepote i veličanstvenosti kosmosa. Nažalost, izazvala kult Heaven's Gate koji je kolektivno izvršio samoubistvo.",
    symbolism_en: "Symbol of cosmic beauty and grandeur. Unfortunately triggered the Heaven's Gate cult suicide.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Comet_Hale-Bopp_1995O1.jpg/640px-Comet_Hale-Bopp_1995O1.jpg"
  },
  {
    id: "hyakutake",
    name: "C/1996 B2",
    nickname_bs: "Hyakutake",
    nickname_en: "Hyakutake",
    discovered_bs: "Yuji Hyakutake, januar 1996.",
    discovered_en: "Yuji Hyakutake, January 1996.",
    lastSeen: "1996",
    nextReturn: "~113.000 godina",
    period_bs: "~113.000 godina",
    period_en: "~113,000 years",
    q: "0.230 AU",
    e: "0.9999",
    i: "124.9°",
    significance_bs: "Kometa s jednim od najbližih prolaza Zemlji u moderno doba (0.102 AU). Otkrivena samo dva mjeseca prije maksimalnog sjaja amaterskim dvogledom. Rentgenske zrake otkrivene prvi put na kometi.",
    significance_en: "One of the closest modern cometary passes to Earth (0.102 AU). Discovered just two months before peak brightness with amateur binoculars. X-rays detected from a comet for the first time.",
    symbolism_bs: "Dokaz da i amaterski astronomi mogu promijeniti nauku. Brzo nestala s neba, ali ostavila trajan naučni trag.",
    symbolism_en: "Proof that amateur astronomers can change science. Quickly disappeared from the sky but left a lasting scientific mark.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Comet_Hyakutake_eso9618a.jpg/640px-Comet_Hyakutake_eso9618a.jpg"
  },
  {
    id: "ison",
    name: "C/2012 S1",
    nickname_bs: "ISON",
    nickname_en: "ISON",
    discovered_bs: "Vitali Nevski i Artyom Novičonok (ISON program), 2012.",
    discovered_en: "Vitali Nevski and Artyom Novichonok (ISON programme), 2012.",
    lastSeen: "2013",
    nextReturn: "Uništena / Destroyed",
    period_bs: "Uništena prolaskom kroz perihel 28. novembra 2013.",
    period_en: "Destroyed during perihelion passage on 28 November 2013.",
    q: "0.0124 AU (sungrazer)",
    e: "~1.000",
    i: "62.4°",
    significance_bs: "Kometa sungrazer koja je prošla svega 1,8 miliona km od Sunca i raspala se. Pratila je cijela naučna zajednica — bila je kandidat za 'kometu vijeka'.",
    significance_en: "A sungrazing comet that passed just 1.8 million km from the Sun and disintegrated. Followed by the entire scientific community — it was a candidate for 'comet of the century'.",
    symbolism_bs: "Simbolizira rasap ambicija — obećavala nevjerovatni sjaj, ali se raspala u prahu pred Suncem.",
    symbolism_en: "Symbolises the collapse of ambitions — promised incredible brightness but disintegrated in dust before the Sun.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/C2012_S1_ISON_2013-11-15.jpg/640px-C2012_S1_ISON_2013-11-15.jpg"
  },
  {
    id: "wild2",
    name: "81P/Wild",
    nickname_bs: "Wild 2",
    nickname_en: "Wild 2",
    discovered_bs: "Paul Wild, 1978.",
    discovered_en: "Paul Wild, 1978.",
    lastSeen: "Starlust / ongoing",
    nextReturn: "~6.4 godine (periodična)",
    period_bs: "~6.4 godine",
    period_en: "~6.4 years",
    q: "1.590 AU",
    e: "0.540",
    i: "3.24°",
    significance_bs: "Meta NASA misije Stardust (2004) koja je prikupila uzorke komarne materije i vratila ih na Zemlju 2006. — prvi povratak uzoraka komete.",
    significance_en: "Target of NASA's Stardust mission (2004), which collected comet material samples and returned them to Earth in 2006 — the first comet sample return.",
    symbolism_bs: "Dokaz da možemo 'dotaknuti' kometu. Uzorci su pokazali da kometarna materija sadrži predsolarne čestice starije od Sunčevog sistema.",
    symbolism_en: "Proof that we can 'touch' a comet. Samples showed cometary material contains pre-solar particles older than the Solar System.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Comet_Wild_2.jpg/640px-Comet_Wild_2.jpg"
  },
  {
    id: "67p",
    name: "67P/Churyumov-Gerasimenko",
    nickname_bs: "Čuri-Gera",
    nickname_en: "Chury",
    discovered_bs: "Klim Churyumov i Svetlana Gerasimenko, 1969.",
    discovered_en: "Klim Churyumov and Svetlana Gerasimenko, 1969.",
    lastSeen: "2015 (Rosetta)",
    nextReturn: "~2029",
    period_bs: "~6.45 godina",
    period_en: "~6.45 years",
    q: "1.243 AU",
    e: "0.641",
    i: "7.04°",
    significance_bs: "Meta ESA misije Rosetta (2014–2016) — prva orbita i slijetanje (sonda Philae) na kometu. Otkrila organsku materiju i kisik, potencijalne gradivne blokove života.",
    significance_en: "Target of ESA's Rosetta mission (2014–2016) — first orbit and landing (Philae probe) on a comet. Discovered organic matter and oxygen, potential building blocks of life.",
    symbolism_bs: "Ključna misija za razumijevanje porijekla života. Forma 'gumene patke' kometarne jezgre postala je ikona svemirske istraživanja.",
    symbolism_en: "A key mission for understanding the origin of life. The 'rubber duck' shape of the cometary nucleus became an icon of space exploration.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Comet_67P_on_19_September_2014_NavCam_mosaic.jpg/640px-Comet_67P_on_19_September_2014_NavCam_mosaic.jpg"
  },
  {
    id: "caesar",
    name: "C/-43 K1",
    nickname_bs: "Cezarova kometa",
    nickname_en: "Caesar's Comet",
    discovered_bs: "Zabilježena u Rimu, 44. g. pr. Kr., nakon ubojstva Julija Cezara.",
    discovered_en: "Recorded in Rome, 44 BC, after the assassination of Julius Caesar.",
    lastSeen: "44. g. pr. Kr.",
    nextReturn: "Nepoznato — vjerovatno hiperbolična",
    period_bs: "Nepoznato",
    period_en: "Unknown",
    q: "~0.22 AU (procjena)",
    e: "Nepoznato",
    i: "Nepoznato",
    significance_bs: "Rimljani su tumačili ovu kometu kao dušu deifikovanog Julija Cezara koja uzlazi na nebo. Oktavijan (August) koristio je kometu kao propagandni alat za legitimizaciju vlasti.",
    significance_en: "Romans interpreted this comet as the soul of deified Julius Caesar ascending to the heavens. Octavian (Augustus) used the comet as a propaganda tool to legitimise his rule.",
    symbolism_bs: "Simbol božanske moći vladara i transformacije imperije. Jedan od najranijih primjera politizacije astronomskog fenomena.",
    symbolism_en: "Symbol of the divine power of rulers and imperial transformation. One of the earliest examples of politicising an astronomical phenomenon.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sid_meier_s_colonization_2.png/320px-Sid_meier_s_colonization_2.png"
  },
  {
    id: "great1811",
    name: "C/1811 F1",
    nickname_bs: "Velika kometa 1811.",
    nickname_en: "Great Comet of 1811",
    discovered_bs: "Honoré Flaugergues, mart 1811.",
    discovered_en: "Honoré Flaugergues, March 1811.",
    lastSeen: "1811–1812",
    nextReturn: "~2473",
    period_bs: "~3.065 godina (promijenjena perturbacijama)",
    period_en: "~3,065 years (modified by perturbations)",
    q: "1.035 AU",
    e: "0.9951",
    i: "106.9°",
    significance_bs: "Golim okom vidljiva gotovo godinu dana — rekord koji je trajao do Hale-Boppa. Tolstoj je opisuje u 'Ratu i miru'. Berbi grožđa 1811. bile su izuzetne — vino nazvano 'Kometno vino'.",
    significance_en: "Visible to the naked eye for almost a year — a record that lasted until Hale-Bopp. Tolstoy describes it in 'War and Peace'. The 1811 grape harvest was exceptional — wine called 'Comet wine'.",
    symbolism_bs: "Simbol Napoleonove epohe — smatrana predznakom invazije na Rusiju. Inspirisala književnost, glazbu i vitikulturni mit.",
    symbolism_en: "Symbol of Napoleon's era — seen as an omen of the Russian invasion. Inspired literature, music and viticulture myth.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Great_Comet_of_1811.png/640px-Great_Comet_of_1811.png"
  },
  {
    id: "great1843",
    name: "C/1843 D1",
    nickname_bs: "Velika kometa 1843.",
    nickname_en: "Great March Comet of 1843",
    discovered_bs: "Viđena golim okom u danima, otkrivena februara 1843.",
    discovered_en: "Seen with the naked eye by day, discovered February 1843.",
    lastSeen: "1843",
    nextReturn: "~2843 (procjena)",
    period_bs: "~512 godina",
    period_en: "~512 years",
    q: "0.00548 AU (sungrazer Kreutz grupe)",
    e: "0.9999",
    i: "144.4°",
    significance_bs: "Prošla je svega 830.000 km od Sunca — najbliži prolaz registriran do tada. Razvila rep duljine 300 milijuna km. Osnivač Kreutz grupe sungrazera.",
    significance_en: "Passed just 830,000 km from the Sun — the closest pass recorded at the time. Developed a tail 300 million km long. Founding member of the Kreutz group of sungrazers.",
    symbolism_bs: "Preplašila milione ljudi koji su mislili da je kraj svijeta. Pokrenula milenaristički pokret Millerita koji je predvidio 'Veliki razočaranje'.",
    symbolism_en: "Terrified millions who thought it was the end of the world. Triggered the Millerite millennial movement that predicted the 'Great Disappointment'.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Great_comet_1843_lithograph.jpg/640px-Great_comet_1843_lithograph.jpg"
  },
  {
    id: "donati",
    name: "C/1858 L1",
    nickname_bs: "Donatieva kometa",
    nickname_en: "Donati's Comet",
    discovered_bs: "Giovanni Battista Donati, jun 1858.",
    discovered_en: "Giovanni Battista Donati, June 1858.",
    lastSeen: "1858",
    nextReturn: "~3000+ (procjena)",
    period_bs: "~2.000 godina",
    period_en: "~2,000 years",
    q: "0.578 AU",
    e: "0.9963",
    i: "116.9°",
    significance_bs: "Smatrana jednom od najljepših kometa ikad viđenih. Prva fotografirana kometa (W. Usherwood, 1858). Imala je tri razvijena repa vidljiva golim okom.",
    significance_en: "Considered one of the most beautiful comets ever seen. The first photographed comet (W. Usherwood, 1858). Had three developed tails visible to the naked eye.",
    symbolism_bs: "Inspirisala niz slikara, pjesnika i glazbenika — simbol kosmičke ljepote u Viktorijansko doba.",
    symbolism_en: "Inspired painters, poets and musicians — a symbol of cosmic beauty in the Victorian era.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Donati%27s_Comet_-_1858.jpg/640px-Donati%27s_Comet_-_1858.jpg"
  },
  {
    id: "tempel1",
    name: "9P/Tempel",
    nickname_bs: "Tempel 1",
    nickname_en: "Tempel 1",
    discovered_bs: "Wilhelm Tempel, 1867.",
    discovered_en: "Wilhelm Tempel, 1867.",
    lastSeen: "2011 (Stardust-NExT)",
    nextReturn: "~2022 (sljedeći perihel)",
    period_bs: "~5.5 godina",
    period_en: "~5.5 years",
    q: "1.542 AU",
    e: "0.517",
    i: "10.47°",
    significance_bs: "Meta NASA misije Deep Impact (2005) — prvi namjerni sudar svemirske sonde s kometom. Ispalio projektil od 370 kg, stvorio krater i otkrio unutrašnjost komete.",
    significance_en: "Target of NASA's Deep Impact mission (2005) — the first deliberate spacecraft impact on a comet. Fired a 370 kg impactor, created a crater and revealed the comet's interior.",
    symbolism_bs: "Demonstracija tehnološke moći čovječanstva — sposobnost da aktivno utičemo na kometarne tijela.",
    symbolism_en: "A demonstration of humanity's technological power — the ability to actively influence cometary bodies.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Tempel1_from_Deep_Impact.jpg/640px-Tempel1_from_Deep_Impact.jpg"
  },
  {
    id: "encke",
    name: "2P/Encke",
    nickname_bs: "Enkeova kometa",
    nickname_en: "Encke's Comet",
    discovered_bs: "Pierre Méchain 1786; Johann Encke izračunao periodičnost 1819.",
    discovered_en: "Pierre Méchain 1786; Johann Encke calculated its periodicity in 1819.",
    lastSeen: "Stalno vidljiva (svake ~3.3 god.)",
    nextReturn: "~2024–2025",
    period_bs: "~3.30 godina — najkraći period svih poznatih kometa",
    period_en: "~3.30 years — shortest period of all known comets",
    q: "0.336 AU",
    e: "0.848",
    i: "11.78°",
    significance_bs: "Prva periodična kometa potvrđena nakon Halleyjeve. Najčešće promatrana kometa u historiji. Izvor godišnjih Tauridnih meteorskih rojeva.",
    significance_en: "The first periodic comet confirmed after Halley's. The most frequently observed comet in history. Source of the annual Taurid meteor showers.",
    symbolism_bs: "Simbol astronomske rutine i preciznosti — njen povratak svakih 3.3 godine bio je test za 19. stoljetne astronome.",
    symbolism_en: "Symbol of astronomical routine and precision — its return every 3.3 years was a test for 19th century astronomers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Comet_Encke.jpg/320px-Comet_Encke.jpg"
  },
  {
    id: "lovejoy2011",
    name: "C/2011 W3",
    nickname_bs: "Lovejoy (2011)",
    nickname_en: "Lovejoy (2011)",
    discovered_bs: "Terry Lovejoy, novembar 2011.",
    discovered_en: "Terry Lovejoy, November 2011.",
    lastSeen: "2011–2012",
    nextReturn: "~622 (procjena)",
    period_bs: "~622 godine",
    period_en: "~622 years",
    q: "0.00554 AU (Kreutz sungrazer)",
    e: "0.9999",
    i: "134.1°",
    significance_bs: "Preživjela prolaz kroz koronu Sunca na udaljenosti od samo 140.000 km! Promatrana svemirskim teleskopima u realnom vremenu dok prolazi kroz Sunčevu atmosferu.",
    significance_en: "Survived passage through the Sun's corona at just 140,000 km! Watched by space telescopes in real time as it passed through the solar atmosphere.",
    symbolism_bs: "Simbol kosmičke otpornosti — tijelo koje je prošlo kroz pakao i preživjelo. Otkriće amaterskog astronoma.",
    symbolism_en: "Symbol of cosmic resilience — a body that passed through hell and survived. Discovery by an amateur astronomer.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Comet_Lovejoy_20111215-NASA.jpg/640px-Comet_Lovejoy_20111215-NASA.jpg"
  },
  {
    id: "great1680",
    name: "C/1680 V1",
    nickname_bs: "Newtonova kometa",
    nickname_en: "Newton's Comet",
    discovered_bs: "Gottfried Kirch, 14. novembra 1680.",
    discovered_en: "Gottfried Kirch, 14 November 1680.",
    lastSeen: "1680–1681",
    nextReturn: "~9.500 (procjena)",
    period_bs: "~10.000 godina",
    period_en: "~10,000 years",
    q: "0.00622 AU (sungrazer)",
    e: "0.9999",
    i: "60.7°",
    significance_bs: "Newton je koristio ovu kometu za verifikaciju zakona gravitacije i dokazao da komete slijede eliptičke putanje. Edmond Halley izračunao orbitu. Prva kometa promatrana teleskopom.",
    significance_en: "Newton used this comet to verify his law of gravitation and proved that comets follow elliptical paths. Edmond Halley calculated the orbit. The first comet observed with a telescope.",
    symbolism_bs: "Kamen temeljac moderne astronomije — ona je pomogla Newtonu da formuliše zakone koji vladaju svemirskim mehanizmom.",
    symbolism_en: "The cornerstone of modern astronomy — it helped Newton formulate the laws governing the celestial mechanism.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Comet_1680_Hevelius.jpg/640px-Comet_1680_Hevelius.jpg"
  },
  {
    id: "swift-tuttle",
    name: "109P/Swift-Tuttle",
    nickname_bs: "Swift-Tuttle",
    nickname_en: "Swift-Tuttle",
    discovered_bs: "Lewis Swift i Horace Tuttle, 1862.",
    discovered_en: "Lewis Swift and Horace Tuttle, 1862.",
    lastSeen: "1992",
    nextReturn: "~2126",
    period_bs: "~130 godina",
    period_en: "~130 years",
    q: "0.958 AU",
    e: "0.963",
    i: "113.4°",
    significance_bs: "Izvor Perseidnih meteorskih rojeva — najposmatranije godišnje zvjezdano kiše. Prečnik jezgre ~26 km čini je jednim od najvećih poznatih objekata koji prolaze relativno blizu Zemlje.",
    significance_en: "Source of the Perseid meteor showers — the most-watched annual meteor shower. Its nucleus diameter of ~26 km makes it one of the largest known objects passing relatively close to Earth.",
    symbolism_bs: "Nevidljivo tijelo vidljivo kroz tisuće meteora. Simbol kozmičke veze između kometa i naše svakodnevne noćne panorame.",
    symbolism_en: "An invisible body visible through thousands of meteors. Symbol of the cosmic connection between comets and our everyday night sky.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Swift_Tuttle_comet.jpg/320px-Swift_Tuttle_comet.jpg"
  },
  {
    id: "west",
    name: "C/1975 V1",
    nickname_bs: "Westova kometa",
    nickname_en: "Comet West",
    discovered_bs: "Richard West, avgusta 1975.",
    discovered_en: "Richard West, August 1975.",
    lastSeen: "1976",
    nextReturn: "~558.300 (procjena)",
    period_bs: "~558.000 godina",
    period_en: "~558,000 years",
    q: "0.197 AU",
    e: "0.9997",
    i: "43.07°",
    significance_bs: "Smatrana jednom od najljepših kometa 20. vijeka. Razvila četiri odvojena repa vidljiva golim okom. Jezgra se raspala na četiri dijela u periheliju.",
    significance_en: "Considered one of the most beautiful comets of the 20th century. Developed four separate tails visible to the naked eye. The nucleus split into four parts at perihelion.",
    symbolism_bs: "Propuštena od javnosti — dolazila je na jutarnjem nebu kada su media bili preokupati svemirom, a publika nespremna. Astronomi je smatraju 'kometom koja je trebala biti slavna'.",
    symbolism_en: "Missed by the public — it appeared in the morning sky when media were preoccupied with space and audiences unprepared. Astronomers consider it 'the comet that should have been famous'.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Comet_West.jpg/640px-Comet_West.jpg"
  },
  {
    id: "borisov",
    name: "2I/Borisov",
    nickname_bs: "Borisov",
    nickname_en: "Borisov",
    discovered_bs: "Gennady Borisov, avgusta 2019.",
    discovered_en: "Gennady Borisov, August 2019.",
    lastSeen: "2019–2020",
    nextReturn: "Nikad — međuzvjezdana",
    period_bs: "Nije periodična — dolazi iz drugog zvjezdanog sistema",
    period_en: "Non-periodic — comes from another star system",
    q: "2.006 AU",
    e: "3.36 (hiperbolična)",
    i: "44.05°",
    significance_bs: "Drugi međuzvjezdani objekt ikad viđen (prvi: 1I/Oumuamua) i prvi koji je jasno identificiran kao kometa izvan Sunčevog sistema. Spektroskopski slična kometama našeg sistema.",
    significance_en: "The second interstellar object ever seen (first: 1I/Oumuamua) and the first clearly identified as a comet from outside our Solar System. Spectroscopically similar to comets in our system.",
    symbolism_bs: "Dokaz da su komete — i možda gradivni blokovi života — univerzalni fenomen koji putuje između zvjezdanih sistema.",
    symbolism_en: "Proof that comets — and perhaps the building blocks of life — are a universal phenomenon travelling between star systems.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Interstellar_comet_Borisov_Hubble.jpg/640px-Interstellar_comet_Borisov_Hubble.jpg"
  },
  {
    id: "neowise",
    name: "C/2020 F3",
    nickname_bs: "NEOWISE",
    nickname_en: "NEOWISE",
    discovered_bs: "NASA NEOWISE teleskop, mart 2020.",
    discovered_en: "NASA NEOWISE telescope, March 2020.",
    lastSeen: "2020",
    nextReturn: "~6.800",
    period_bs: "~6.800 godina",
    period_en: "~6,800 years",
    q: "0.295 AU",
    e: "0.9992",
    i: "128.9°",
    significance_bs: "Najsjajnija kometa vidljiva sa sjeverne hemisfere od Hale-Boppa 1997. Postala globalni fenomen tokom COVID-19 lockdowna — milioni su je promatrali s balkona.",
    significance_en: "The brightest comet visible from the northern hemisphere since Hale-Bopp in 1997. Became a global phenomenon during the COVID-19 lockdown — millions watched from their balconies.",
    symbolism_bs: "Svjetlost u mračnom periodu pandemije. Prirodni spektakl koji je 2020. privremeno ujedinio ljude kroz zajednički pogled prema nebu.",
    symbolism_en: "A light in the dark period of the pandemic. A natural spectacle that in 2020 temporarily united people through a shared gaze toward the sky.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/NEOWISE_comet_%28cropped%29.jpg/640px-NEOWISE_comet_%28cropped%29.jpg"
  },
  {
    id: "tsuchinshan-atlas",
    name: "C/2023 A3",
    nickname_bs: "Tsuchinshan-ATLAS",
    nickname_en: "Tsuchinshan-ATLAS",
    discovered_bs: "Zvjezdara Purpurna planina (Kina) i ATLAS teleskop, 2023.",
    discovered_en: "Purple Mountain Observatory (China) and ATLAS telescope, 2023.",
    lastSeen: "2024",
    nextReturn: "~80.660 (procjena)",
    period_bs: "~80.000 godina",
    period_en: "~80,000 years",
    q: "0.391 AU",
    e: "0.9997",
    i: "139.1°",
    significance_bs: "Jedna od najsjajnijih kometa 21. vijeka, dostigla mag ~0 u oktobru 2024. Vidljiva golim okom u sumrak. Izazvala globalno oduševljenje i milione fotografija.",
    significance_en: "One of the brightest comets of the 21st century, reaching magnitude ~0 in October 2024. Visible to the naked eye at dusk. Triggered global excitement and millions of photographs.",
    symbolism_bs: "Dokaz da kometni spektakli nisu prošlost — i 21. vijek ima svoju 'kometu vijeka'. Podsjetnik na veličanstvenost kosmosa u eri pametnih telefona.",
    symbolism_en: "Proof that cometary spectacles are not a thing of the past — the 21st century has its own 'comet of the century'. A reminder of cosmic grandeur in the era of smartphones.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Tsuchinshan-ATLAS_2024.jpg/640px-Tsuchinshan-ATLAS_2024.jpg"
  }
];

function renderHistoricModal() {
  if (!state.historicOpen) return "";
  const bs = state.lang === "bs";

  const cards = HISTORIC_COMETS.map((c, idx) => {
    const nextReturnLabel = c.nextReturn.includes("Uništena") || c.nextReturn.includes("Destroyed")
      ? (bs ? "Uništena" : "Destroyed")
      : c.nextReturn.includes("Nikad") || c.nextReturn.includes("Never")
      ? (bs ? "Nikad se ne vraća" : "Never returns")
      : c.nextReturn;
    return `
    <article class="hc-card">
      <div class="hc-card__num">${String(idx + 1).padStart(2, "0")}</div>
      <div class="hc-card__main">
        <div class="hc-card__top">
          <div class="hc-card__titles">
            <h3 class="hc-card__name">${escapeHtml(bs ? c.nickname_bs : c.nickname_en)}</h3>
            <code class="hc-card__desig">${escapeHtml(c.name)}</code>
          </div>
          <div class="hc-card__tags">
            <span class="hc-tag">⏱ ${t("historicPeriod")}: ${escapeHtml(bs ? c.period_bs : c.period_en)}</span>
            <span class="hc-tag hc-tag--return">🔭 ${t("historicReturn")}: ${escapeHtml(nextReturnLabel)}</span>
          </div>
        </div>
        <div class="hc-card__body">
          <div class="hc-card__img-col">
            <img class="hc-card__img" src="${escapeAttr(c.image)}"
              alt="${escapeAttr(bs ? c.nickname_bs : c.nickname_en)}"
              loading="lazy"
              onerror="this.parentElement.style.display='none'">
            <div class="hc-card__params">
              <div class="hc-param"><span>q</span><strong>${escapeHtml(c.q)}</strong></div>
              <div class="hc-param"><span>e</span><strong>${escapeHtml(c.e)}</strong></div>
              <div class="hc-param"><span>i</span><strong>${escapeHtml(c.i)}</strong></div>
            </div>
            <div class="hc-card__discovered">
              <span class="hc-label">📅 ${t("historicDiscovered")}</span>
              <p>${escapeHtml(bs ? c.discovered_bs : c.discovered_en)}</p>
            </div>
          </div>
          <div class="hc-card__text-col">
            <div class="hc-section">
              <span class="hc-label">📜 ${t("historicSignificance")}</span>
              <p>${escapeHtml(bs ? c.significance_bs : c.significance_en)}</p>
            </div>
            <div class="hc-section hc-section--symbolism">
              <span class="hc-label">🌟 ${t("historicSymbolism")}</span>
              <p>${escapeHtml(bs ? c.symbolism_bs : c.symbolism_en)}</p>
            </div>
          </div>
        </div>
      </div>
    </article>`;
  }).join("\n");

  return `
    <div class="hc-page" id="historic-page" role="dialog" aria-modal="true" aria-label="${t("historicComets")}">
      <div class="hc-page__header">
        <div class="hc-page__header-inner">
          <div>
            <h2 class="hc-page__title">☄️ ${t("historicComets")}</h2>
            <p class="hc-page__subtitle">${t("historicSubtitle")}</p>
          </div>
          <button class="hc-close-btn" type="button" data-action="historic-close" aria-label="${t("close")}">× ${t("close")}</button>
        </div>
      </div>
      <div class="hc-page__body">
        <div class="hc-grid">
          ${cards}
        </div>
      </div>
    </div>
  `;
}

// ── New Comet Banner ──────────────────────────────────────────────────────────
function renderNewCometBanner() {
  const names = state.newCometIds
    .map((id) => state.data?.comets?.find((c) => c.designation === id)?.displayName || id)
    .join(", ");
  return `
    <div class="new-comet-banner">
      <span>🆕 ${t("newCometAlert")}: <strong>${escapeHtml(names)}</strong></span>
      <button class="button button--sm" type="button" data-action="dismiss-new-comet">${t("close")} ×</button>
    </div>
  `;
}

// ── Star Map Modal ─────────────────────────────────────────────────────────────
function renderStarMapModal(comets) {
  if (!state.starMapOpen) return `<div class="modal-overlay" id="starmap-modal" data-action="star-map-close"></div>`;
  const sz = 360;
  const cx = sz / 2, cy = sz / 2, r = sz / 2 - 16;

  // Compass labels
  const compassLabels = [
    { label: "N", az: 0 }, { label: "E", az: 90 },
    { label: "S", az: 180 }, { label: "W", az: 270 }
  ];

  // Altitude circles: 0°, 30°, 60°, 90° (zenith)
  const altCircles = [0, 30, 60, 90];

  // Plot comets
  const cometDots = comets.map((comet) => {
    const az = comet.sky?.azimuthDeg;
    const alt = comet.sky?.altitudeDeg;
    if (az == null || alt == null || alt < -5) return "";
    const rr = r * (1 - Math.max(0, alt) / 90);
    const azRad = (az - 90) * Math.PI / 180;
    const x = cx + rr * Math.cos(azRad);
    const y = cy + rr * Math.sin(azRad);
    const isUp = alt >= 0;
    return `
      <g class="starmap-comet" data-comet-id="${escapeAttr(comet.id)}" data-action="open-comet">
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" class="starmap-comet__halo"/>
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${isUp ? 5 : 3}" class="starmap-comet__dot starmap-comet__dot--${isUp ? "up" : "down"}"/>
        <text x="${(x + 10).toFixed(1)}" y="${(y + 4).toFixed(1)}" class="starmap-label">${escapeHtml(comet.nickname || comet.designation)}</text>
      </g>
    `;
  }).join("");

  const altCircleSvg = altCircles.map((alt) => {
    const rr = r * (1 - alt / 90);
    return `<circle cx="${cx}" cy="${cy}" r="${rr.toFixed(1)}" class="starmap-grid${alt === 0 ? " starmap-grid--horizon" : ""}"/>
      <text x="${(cx + rr + 3).toFixed(1)}" y="${(cy - 3)}" class="starmap-alt-label">${alt === 0 ? t("horizon") : alt + "°"}</text>`;
  }).join("");

  const compassSvg = compassLabels.map(({ label, az }) => {
    const azRad = (az - 90) * Math.PI / 180;
    const lx = cx + (r + 10) * Math.cos(azRad);
    const ly = cy + (r + 10) * Math.sin(azRad);
    return `<text x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" class="starmap-compass">${label}</text>`;
  }).join("");

  const nightComets = comets.filter((c) => c.sky?.altitudeDeg >= 0);
  return `
    <div class="modal-overlay open" id="starmap-modal" data-action="star-map-close">
      <div class="modal-card modal-card--starmap" role="dialog" aria-modal="true" aria-label="${t("starMapTitle")}">
        <button class="modal-close" type="button" data-action="star-map-close" aria-label="${t("close")}">×</button>
        <h2>🌌 ${t("starMapTitle")}</h2>
        <p class="panel__note">${t("observerLocation")}: ${escapeHtml(state.observer.label)} — ${nightComets.length} ${state.lang === "bs" ? "kometa iznad horizonta" : "comets above horizon"}</p>
        <div class="starmap-wrap">
          <svg viewBox="0 0 ${sz} ${sz}" class="starmap-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="${sz}" height="${sz}" class="starmap-bg"/>
            ${altCircleSvg}
            ${compassSvg}
            <text x="${cx}" y="${cy + 5}" class="starmap-zenith">${t("zenith")}</text>
            ${cometDots}
          </svg>
        </div>
        <div class="starmap-legend">
          <span class="starmap-legend__item starmap-legend__item--up">● ${state.lang === "bs" ? "Iznad horizonta" : "Above horizon"}</span>
          <span class="starmap-legend__item starmap-legend__item--down">● ${state.lang === "bs" ? "Ispod horizonta" : "Below horizon"}</span>
        </div>
        <p class="panel__note" style="font-size:0.78rem;margin-top:8px">${state.lang === "bs" ? "Klikni na komet za detalje. Pozicija se ažurira pri svakom osvježavanju podataka." : "Click a comet for details. Position updates on each data refresh."}</p>
      </div>
    </div>
  `;
}

// ── AR Modal ──────────────────────────────────────────────────────────────────
// ── Visibility Calendar Modal ─────────────────────────────────────────────────
function renderCalendarModal(comets) {
  if (!state.calendarOpen) return `<div class="modal-overlay" id="calendar-modal" data-action="calendar-close"></div>`;
  const now = new Date();
  const days = state.calendarRange === "week" ? 7 : 30;
  const dayLabels = [];

  for (let d = 0; d < days; d++) {
    const date = new Date(now);
    date.setDate(now.getDate() + d);
    dayLabels.push(date);
  }

  // Build calendar rows per comet
  const calRows = comets.slice(0, 8).map((comet) => {
    const curve = comet.sky?.altitudeCurve || [];
    const cells = dayLabels.map((date) => {
      // Find night-time hours above horizon for this day in the curve
      let nightHours = 0;
      const dayStart = date.getTime();
      const dayEnd = dayStart + 86400000;
      const relevant = curve.filter((pt) => {
        const ts = Date.parse(pt.timestamp);
        return ts >= dayStart && ts < dayEnd && pt.altitudeDeg > 0 &&
          (pt.solarState === "Noć" || pt.solarState === "Astronomski sumrak" || pt.solarState === "Nautički sumrak");
      });
      nightHours = roundNumber(relevant.length * 0.5, 1); // 30-min steps
      const pct = Math.min(100, (nightHours / 8) * 100);
      const cls = nightHours > 4 ? "cal-cell--great" : nightHours > 1 ? "cal-cell--ok" : nightHours > 0 ? "cal-cell--poor" : "cal-cell--none";
      return `<td class="cal-cell ${cls}" title="${comet.displayName}: ${nightHours}h">${nightHours > 0 ? nightHours : ""}</td>`;
    }).join("");
    return `<tr><td class="cal-name">${escapeHtml(comet.nickname || comet.designation)}</td>${cells}</tr>`;
  }).join("");

  const headerCells = dayLabels.map((d) => {
    const label = state.lang === "bs"
      ? ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"][d.getDay()]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
    return `<th class="cal-day">${label}<br><small>${d.getDate()}/${d.getMonth() + 1}</small></th>`;
  }).join("");

  return `
    <div class="modal-overlay open" id="calendar-modal" data-action="calendar-close">
      <div class="modal-card modal-card--calendar" role="dialog" aria-modal="true" aria-label="${t("calendarTitle")}">
        <button class="modal-close" type="button" data-action="calendar-close" aria-label="${t("close")}">×</button>
        <h2>📅 ${t("calendarTitle")}</h2>
        <div class="calendar-toolbar">
          <button class="button${state.calendarRange === "week" ? " button--primary" : ""}" type="button" data-action="cal-range" data-range="week">${t("weekView")}</button>
          <button class="button${state.calendarRange === "month" ? " button--primary" : ""}" type="button" data-action="cal-range" data-range="month">${t("monthView")}</button>
        </div>
        <div class="calendar-scroll">
          <table class="cal-table">
            <thead><tr><th>${state.lang === "bs" ? "Komet" : "Comet"}</th>${headerCells}</tr></thead>
            <tbody>${calRows}</tbody>
          </table>
        </div>
        <div class="cal-legend">
          <span class="cal-cell--great">&nbsp;</span> ${state.lang === "bs" ? "> 4h" : "> 4h"}
          <span class="cal-cell--ok">&nbsp;</span> 1–4h
          <span class="cal-cell--poor">&nbsp;</span> < 1h
          <span class="cal-cell--none">&nbsp;</span> ${state.lang === "bs" ? "Nije vidljiv" : "Not visible"}
        </div>
        <p class="panel__note" style="font-size:0.78rem">${state.lang === "bs" ? "Prikazane su noćne sate vidljivosti iznad horizonta (na osnovu 24-satne altitude krivulje)." : "Night-time hours above horizon shown (based on 24-h altitude curve)."}</p>
      </div>
    </div>
  `;
}

// ── Notifications Modal ───────────────────────────────────────────────────────
function renderNotifModal(comets) {
  if (!state.notifOpen) return `<div class="modal-overlay" id="notif-modal" data-action="notif-close"></div>`;
  const supported = "Notification" in window;
  const permission = supported ? Notification.permission : "denied";
  const topComet = selectOperationalComet(comets);

  return `
    <div class="modal-overlay open" id="notif-modal" data-action="notif-close">
      <div class="modal-card" role="dialog" aria-modal="true" aria-label="${t("notifications")}">
        <button class="modal-close" type="button" data-action="notif-close" aria-label="${t("close")}">×</button>
        <h2>🔔 ${t("notifications")}</h2>

        <div class="notif-section">
          <h3>${state.lang === "bs" ? "Browser obavještenja" : "Browser notifications"}</h3>
          ${!supported ? `<p class="panel__note">${state.lang === "bs" ? "Vaš browser ne podržava obavještenja." : "Your browser does not support notifications."}</p>` : `
          <p class="panel__note">
            ${permission === "granted" ? "✅ " + t("notifGranted") : permission === "denied" ? "❌ " + t("notifDenied") : "⚠️ " + t("notifPrompt")}
          </p>
          <div class="notif-controls">
            <button class="button ${state.notificationsEnabled ? "button--primary" : ""}" type="button" data-action="notif-toggle">
              ${state.notificationsEnabled ? t("disableNotif") : t("enableNotif")}
            </button>
            ${state.notificationsEnabled && topComet ? `<button class="button" type="button" data-action="notif-test">🧪 ${state.lang === "bs" ? "Test notifikacija" : "Test notification"}</button>` : ""}
          </div>
          `}
        </div>

        <div class="notif-section">
          <h3>${state.lang === "bs" ? "Alarm za povoljne uslove" : "Favorable conditions alarm"}</h3>
          <p class="panel__note">${state.lang === "bs" ? "Alarm provjerava svaki sat: komet iznad horizonta + oblačnost < 30%." : "Alarm checks hourly: comet above horizon + cloud cover < 30%."}</p>
          <div class="notif-controls">
            <button class="button ${state.alarmActive ? "button--primary" : ""}" type="button" data-action="alarm-toggle">
              ${state.alarmActive ? "🔕 " + t("alarmInactive") : "⏰ " + t("alarmActive")}
            </button>
            ${state.alarmActive ? `<button class="button" type="button" data-action="check-conditions">${t("checkWeather")}</button>` : ""}
          </div>
          ${state.alarmStatus ? `<div class="alarm-status alarm-status--${state.alarmStatus.ok ? "ok" : "wait"}">${escapeHtml(state.alarmStatus.message)}</div>` : ""}
        </div>

        <div class="notif-section">
          <h3>${state.lang === "bs" ? "Novi kometi" : "New comets"}</h3>
          <p class="panel__note">${state.lang === "bs" ? "Aplikacija prati koje komete su prvi put viđene i automatski šalje obavještenje." : "The app tracks which comets are seen for the first time and automatically sends a notification."}</p>
          ${state.newCometIds.length ? `<div class="alarm-status alarm-status--ok">🆕 ${state.newCometIds.length} ${state.lang === "bs" ? "novih kometa od zadnjeg posjeta" : "new comets since last visit"}</div>` : `<p class="panel__note">✅ ${state.lang === "bs" ? "Nema novih kometa." : "No new comets."}</p>`}
        </div>

        <div class="notif-section">
          <h3>${state.lang === "bs" ? "Planirane notifikacije" : "Scheduled alerts"}</h3>
          ${comets.slice(0, 4).map((c) => {
            const bestTime = c.visibilityWindow?.bestNightAt;
            const mag = c.observations?.medianMagnitude ?? c.sky?.totalMagnitude;
            return `
              <div class="notif-comet-row">
                <div>
                  <strong>${escapeHtml(c.displayName)}</strong>
                  <span class="panel__note"> — mag ${mag?.toFixed(1) ?? "?"}</span>
                </div>
                <div class="panel__note">${bestTime ? `${t("notifAt")} ${formatEventTime(bestTime)}` : "n/a"}</div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderSourceGuide(source) {
  return `
    <article class="source-card">
      <h3>${escapeHtml(source.name)}</h3>
      <p>${escapeHtml(ts(source.purpose))}</p>
      <a href="${escapeAttr(source.url)}" target="_blank" rel="noreferrer">${t("source")}</a>
    </article>
  `;
}

function renderSourceHealth(sourceStatus) {
  return Object.entries(sourceStatus)
    .map(([key, value]) => {
      const titleMap = {
        aerith: "Aerith",
        jplSbdb: "JPL SBDB",
        jplHorizons: "JPL Horizons",
        cobs: "COBS",
        mpc: "MPC",
        theskylive: "TheSkyLive"
      };
      return `
        <article class="source-health-card">
          <div class="source-health-card__head">
            <strong>${escapeHtml(titleMap[key] || key)}</strong>
            ${renderStateChip(value.state, sourceStateLabel(value.state), true)}
          </div>
          <p>${value.updatedAt ? `${t("updatedLabel")}: ${escapeHtml(value.updatedAt)}` : `${t("checkedLabel")}: ${formatDate(value.checkedAt)}`}</p>
          <p>${t("errorsLabel")}: ${escapeHtml(String(value.errorCount || 0))} / ${escapeHtml(String(value.totalChecked || 0))}</p>
        </article>
      `;
    })
    .join("");
}

function renderStat(label, value) {
  return `
    <article class="hero-stat">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `;
}

function renderFeatureMetric(label, value) {
  return `
    <article class="feature-metric">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `;
}

function renderFilterButton(key, label) {
  return `
    <button class="filter-chip ${state.filter === key ? "is-active" : ""}" type="button" data-action="filter" data-filter="${escapeAttr(key)}">
      ${escapeHtml(label)}
    </button>
  `;
}

function renderModeButton(key, label) {
  return `
    <button class="filter-chip ${state.viewMode === key ? "is-active" : ""}" type="button" data-action="view-mode" data-view="${escapeAttr(key)}">
      ${escapeHtml(label)}
    </button>
  `;
}

function renderOrbitMetric(label, value) {
  return `
    <div class="orbit-metric">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value ?? "n/a")}</strong>
    </div>
  `;
}

function renderWatchlistButton(comet) {
  return `
    <button class="watchlist-button ${comet.isFavorite ? "is-active" : ""}" type="button" data-action="toggle-watchlist" data-comet-id="${escapeAttr(comet.id)}">
      ${comet.isFavorite ? "U watchlisti" : "Dodaj u watchlistu"}
    </button>
  `;
}

function renderStateChip(stateKey, label, compact = false) {
  // Map server-provided Bosnian labels to translated ones using stateKey
  const translatedLabel = stateKey === "night" ? t("statusNight")
    : stateKey === "up" ? t("statusUp")
    : stateKey === "down" ? t("statusDown")
    : stateKey === "live" ? t("sourceStateLive")
    : stateKey === "partial" ? t("sourceStatePartial")
    : stateKey === "error" ? t("sourceStateError")
    : stateKey === "link-only" ? t("sourceStateLinkOnly")
    : label;
  return `<span class="status-chip status-chip--${escapeAttr(stateKey)} ${compact ? "status-chip--compact" : ""}">${escapeHtml(translatedLabel)}</span>`;
}

function renderUncertaintyBadge(uncertainty) {
  return `
    <span class="status-chip status-chip--neutral">
      ${t("uncertLabel")} ${escapeHtml(uncertainty?.label || "n/a")}
    </span>
  `;
}

function renderEventMetric(label, value) {
  return `
    <article class="event-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `;
}

function renderAltitudeCurve(samples, visibilityWindow) {
  if (!Array.isArray(samples) || !samples.length) {
    return `<div class="curve-empty">${t("noCurveData")}</div>`;
  }

  const width = 520;
  const height = 220;
  const padX = 44;
  const padY = 18;
  const usableWidth = width - padX * 2;
  const usableHeight = height - padY * 2;
  const altitudes = samples.map((sample) => Number(sample.altitudeDeg)).filter(Number.isFinite);
  if (!altitudes.length) {
    return `<div class="curve-empty">Altitude curve nije dostupna.</div>`;
  }

  const maxAltitude = Math.max(15, ...altitudes, 90);
  const minAltitude = Math.min(-10, ...altitudes, -20);
  const samplePoints = samples
    .map((sample, index) => {
      const x = padX + (index / Math.max(1, samples.length - 1)) * usableWidth;
      const y = padY + ((maxAltitude - Number(sample.altitudeDeg)) / (maxAltitude - minAltitude)) * usableHeight;
      return {
        x: roundNumber(x, 2),
        y: roundNumber(y, 2),
        timestamp: sample.timestamp,
        altitudeDeg: Number(sample.altitudeDeg),
        solarState: sample.solarState
      };
    });
  const points = samplePoints.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
  const horizonY = padY + ((maxAltitude - 0) / (maxAltitude - minAltitude)) * usableHeight;
  const areaPath = `${points} L${samplePoints[samplePoints.length - 1].x} ${roundNumber(horizonY, 2)} L${samplePoints[0].x} ${roundNumber(horizonY, 2)} Z`;
  const yTicks = [0, 30, 60, 90]
    .filter((value) => value >= minAltitude && value <= maxAltitude)
    .map((value) => ({
      value,
      y: roundNumber(padY + ((maxAltitude - value) / (maxAltitude - minAltitude)) * usableHeight, 2)
    }));
  const xTicks = [0, 0.5, 1].map((fraction) => {
    const sample = samplePoints[Math.round(fraction * Math.max(0, samplePoints.length - 1))];
    return {
      x: sample.x,
      label: formatEventTime(sample.timestamp)
    };
  });
  const markers = [
    buildCurveMarker("Rise", visibilityWindow?.riseAt, samplePoints),
    buildCurveMarker("Transit", visibilityWindow?.transitAt, samplePoints),
    buildCurveMarker("Set", visibilityWindow?.setAt, samplePoints)
  ].filter(Boolean);
  const nightBands = buildNightBands(samplePoints);

  return `
    <div class="curve-box">
      <p class="curve-box__caption">${t("curveCaption")}</p>
      <svg class="curve-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
        ${nightBands.map((band) => `<rect class="curve-band" x="${band.x}" y="${padY}" width="${band.width}" height="${usableHeight}"></rect>`).join("")}
        ${yTicks.map((tick) => `<g><line class="curve-grid" x1="${padX}" y1="${tick.y}" x2="${width - padX}" y2="${tick.y}"></line><text class="curve-axis" x="8" y="${tick.y + 4}">${tick.value}°</text></g>`).join("")}
        <line class="curve-horizon" x1="${padX}" y1="${roundNumber(horizonY, 2)}" x2="${width - padX}" y2="${roundNumber(horizonY, 2)}"></line>
        <path class="curve-area" d="${areaPath}"></path>
        <path class="curve-line" d="${points}"></path>
        ${markers.map((marker) => `<g><line class="curve-marker-line" x1="${marker.x}" y1="${padY}" x2="${marker.x}" y2="${height - padY}"></line><circle class="curve-marker-dot" cx="${marker.x}" cy="${marker.y}" r="4"></circle><text class="curve-marker-text" x="${marker.x}" y="${Math.max(14, marker.y - 10)}">${escapeHtml(marker.label)}</text></g>`).join("")}
        ${xTicks.map((tick) => `<text class="curve-axis curve-axis--time" x="${tick.x}" y="${height - 4}">${escapeHtml(tick.label)}</text>`).join("")}
      </svg>
      <div class="curve-box__legend">
        <span>${state.lang === "bs" ? "Horizont: 0° | Svjetliji pojas: noć / sumrak" : "Horizon: 0° | Lighter band: night / twilight"}</span>
        <span>${escapeHtml(formatEventTime(samples[0].timestamp))} - ${escapeHtml(formatEventTime(samples[samples.length - 1].timestamp))}</span>
      </div>
    </div>
  `;
}

function renderSparkline(series, metric, stacked = false) {
  if (!Array.isArray(series) || series.length < 2) {
    return `<div class="sparkline sparkline--empty${stacked ? " sparkline--stacked" : ""}">n/a</div>`;
  }

  const values = series.map((entry) => Number(entry[metric])).filter(Number.isFinite);
  if (values.length < 2) {
    return `<div class="sparkline sparkline--empty${stacked ? " sparkline--stacked" : ""}">n/a</div>`;
  }

  const width = stacked ? 360 : 140;
  const height = stacked ? 120 : 46;
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = Math.max(0.2, maxValue - minValue);
  const path = values
    .map((value, index) => {
      const x = 6 + (index / Math.max(1, values.length - 1)) * (width - 12);
      const y = 6 + ((value - minValue) / range) * (height - 12);
      return `${index === 0 ? "M" : "L"}${roundNumber(x, 2)} ${roundNumber(y, 2)}`;
    })
    .join(" ");

  return `
    <svg class="sparkline${stacked ? " sparkline--stacked" : ""}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
      <path d="${path}"></path>
    </svg>
  `;
}

function renderLink(label, href) {
  return `<a href="${escapeAttr(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
}

function renderOrbitSvg(preview) {
  if (!preview) {
    return `<div class="orbit-badge__fallback">n/a</div>`;
  }

  return `
    <svg viewBox="0 0 ${preview.width} ${preview.height}" aria-hidden="true">
      <circle cx="${preview.sunX}" cy="${preview.sunY}" r="4.5"></circle>
      <path d="${preview.path}"></path>
      <circle class="perihelion" cx="${preview.perihelionX}" cy="${preview.perihelionY}" r="2.5"></circle>
    </svg>
  `;
}

function renderOrbit3D(comet, mode = "card") {
  const preview = buildOrbitSystemPreview(comet?.orbit?.elements || {}, mode);
  if (!preview) {
    return `<div class="orbit-3d orbit-3d--empty">${t("noOrbitData")}</div>`;
  }
  const markerBase = String(comet?.id || "comet").replace(/[^a-zA-Z0-9_-]/g, "-");

  return `
    <div class="orbit-3d orbit-3d--${mode}">
      <p class="orbit-3d__caption">
        ${state.lang === "bs"
          ? `3D koordinatni prikaz Sunčevog sistema: <strong>Sunce i referentne planete</strong> su u ekliptičkoj ravni, a <strong>orbita komete</strong> je nacrtana u njenoj vlastitoj nagnutoj ravni. Planete su orijentacioni markeri, ne trenutne efemeridne pozicije.`
          : `3D coordinate view of the Solar System: <strong>The Sun and reference planets</strong> are in the ecliptic plane, and the <strong>comet orbit</strong> is drawn in its own inclined plane. Planets are orientation markers, not current ephemeris positions.`}
      </p>
      <svg class="orbit-3d__svg orbit-3d__svg--system" viewBox="0 0 ${preview.width} ${preview.height}" preserveAspectRatio="xMidYMid meet" aria-label="${state.lang === "bs" ? "3D koordinatni prikaz orbite komete" : "3D coordinate view of comet orbit"}">
        <defs>
          <marker id="${markerBase}-arrow-above" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L9,4.5 L0,9 z" fill="var(--accent)"></path>
          </marker>
          <marker id="${markerBase}-arrow-below" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L9,4.5 L0,9 z" fill="var(--accent-2)"></path>
          </marker>
        </defs>
        <path class="orbit-3d__plane-surface" d="${preview.planeSurfacePath}"></path>
        ${preview.gridLines.map((line) => `<line class="orbit-3d__grid" x1="${line.x1}" y1="${line.y1}" x2="${line.x2}" y2="${line.y2}"></line>`).join("")}
        ${preview.planetaryRings.map((ring) => `<path class="orbit-3d__planet-ring ${ring.isEarth ? "orbit-3d__planet-ring--earth" : ""}" d="${ring.path}"></path>`).join("")}
        <line class="orbit-3d__axis orbit-3d__axis--x" x1="${preview.sun.x}" y1="${preview.sun.y}" x2="${preview.axis.x.x}" y2="${preview.axis.x.y}"></line>
        <line class="orbit-3d__axis orbit-3d__axis--y" x1="${preview.sun.x}" y1="${preview.sun.y}" x2="${preview.axis.y.x}" y2="${preview.axis.y.y}"></line>
        <line class="orbit-3d__axis orbit-3d__axis--z" x1="${preview.sun.x}" y1="${preview.sun.y}" x2="${preview.axis.z.x}" y2="${preview.axis.z.y}"></line>
        ${preview.belowPath ? `<path class="orbit-3d__path orbit-3d__path--below" marker-end="url(#${markerBase}-arrow-below)" d="${preview.belowPath}"></path>` : ""}
        ${preview.abovePath ? `<path class="orbit-3d__path orbit-3d__path--above" marker-end="url(#${markerBase}-arrow-above)" d="${preview.abovePath}"></path>` : ""}
        <circle class="orbit-3d__sun" cx="${preview.sun.x}" cy="${preview.sun.y}" r="${mode === "modal" ? 6 : 5}"></circle>
        ${preview.planets.map((planet) => `
          <g class="orbit-3d__planet">
            <circle class="orbit-3d__planet-dot" cx="${planet.x}" cy="${planet.y}" r="${planet.radius}" style="fill:${planet.color}"></circle>
            <text class="orbit-3d__planet-label" x="${planet.label.x}" y="${planet.label.y}" text-anchor="${planet.label.anchor}">${escapeHtml(planet.short)}</text>
          </g>
        `).join("")}
        <circle class="orbit-3d__node orbit-3d__node--asc" cx="${preview.ascendingNode.x}" cy="${preview.ascendingNode.y}" r="4"></circle>
        <circle class="orbit-3d__node orbit-3d__node--desc" cx="${preview.descendingNode.x}" cy="${preview.descendingNode.y}" r="4"></circle>
        <circle class="orbit-3d__perihelion" cx="${preview.perihelion.x}" cy="${preview.perihelion.y}" r="4.5"></circle>
        ${renderOrbitAnnotation(preview.annotations.sun, state.lang === "bs" ? "Sunce" : "Sun", "orbit-3d__label orbit-3d__label--sun")}
        ${renderOrbitAnnotation(preview.annotations.perihelion, "q", "orbit-3d__label orbit-3d__label--perihelion")}
        ${renderOrbitAnnotation(preview.annotations.ascendingNode, "AN", "orbit-3d__label orbit-3d__label--asc")}
        ${renderOrbitAnnotation(preview.annotations.descendingNode, "DN", "orbit-3d__label orbit-3d__label--desc")}
        ${renderOrbitAnnotation(preview.annotations.plane, state.lang === "bs" ? "Ekliptička ravan planeta" : "Planetary ecliptic plane", "orbit-3d__label orbit-3d__label--plane", false)}
        <text class="orbit-3d__axis-label" x="${preview.axis.x.x + 6}" y="${preview.axis.x.y}">X</text>
        <text class="orbit-3d__axis-label" x="${preview.axis.y.x + 6}" y="${preview.axis.y.y}">Y</text>
        <text class="orbit-3d__axis-label" x="${preview.axis.z.x + 6}" y="${preview.axis.z.y - 2}">Z</text>
      </svg>
      <div class="orbit-3d__legend">
        <span><i class="orbit-3d__swatch orbit-3d__swatch--above"></i>${state.lang === "bs" ? "Iznad ekliptike" : "Above ecliptic"}</span>
        <span><i class="orbit-3d__swatch orbit-3d__swatch--below"></i>${state.lang === "bs" ? "Ispod ekliptike" : "Below ecliptic"}</span>
        <span><i class="orbit-3d__swatch orbit-3d__swatch--ref"></i>${state.lang === "bs" ? "Planetarne putanje u ekliptici" : "Planetary orbits in ecliptic"}</span>
        <span><i class="orbit-3d__swatch orbit-3d__swatch--perihelion"></i><strong>q</strong> = ${state.lang === "bs" ? "perihel" : "perihelion"}</span>
        <span><i class="orbit-3d__swatch orbit-3d__swatch--node"></i><strong>AN / DN</strong> = ${state.lang === "bs" ? "uzlazni / silazni čvor" : "ascending / descending node"}</span>
        <span><i class="orbit-3d__swatch orbit-3d__swatch--planet"></i><strong>Me Ve ${state.lang === "bs" ? "Z" : "E"} Ma J S</strong> = ${state.lang === "bs" ? "Merkur, Venera, Zemlja, Mars, Jupiter, Saturn" : "Mercury, Venus, Earth, Mars, Jupiter, Saturn"}</span>
      </div>
    </div>
  `;
}

function renderOrbitAnnotation(annotation, label, className, withLeader = true) {
  if (!annotation) {
    return "";
  }

  return `
    <g class="orbit-3d__annotation">
      ${withLeader ? `<line class="orbit-3d__leader" x1="${annotation.point.x}" y1="${annotation.point.y}" x2="${annotation.lineEnd.x}" y2="${annotation.lineEnd.y}"></line>` : ""}
      <text class="${className}" x="${annotation.text.x}" y="${annotation.text.y}" text-anchor="${annotation.anchor}">${escapeHtml(label)}</text>
    </g>
  `;
}

function buildOrbitSystemPreview(elements, mode = "card") {
  const q = Number(elements.perihelionDistance?.value);
  const e = Number(elements.eccentricity?.value);
  const incDeg = Number(elements.inclination?.value);
  const nodeDeg = Number(elements.ascendingNode?.value);
  const argPerDeg = Number(elements.argumentOfPerihelion?.value);

  if (![q, e, incDeg, nodeDeg, argPerDeg].every(Number.isFinite) || q <= 0 || e < 0) {
    return null;
  }

  const width = mode === "modal" ? 700 : 420;
  const height = mode === "modal" ? 540 : 340;
  const omega = degToRad(argPerDeg);
  const node = degToRad(nodeDeg);
  const inc = degToRad(incDeg);
  const span = getOrbitTrueAnomalySpan(e);
  const orbitLimit = Math.max(10, Math.min(14, q * (1 + Math.min(e, 1.6)) * 1.15));
  const planeRadius = Math.max(10, orbitLimit);
  const rawOrbitPoints = [];

  for (let index = 0; index <= 260; index += 1) {
    const nu = -span + (2 * span * index) / 260;
    const point = orbitPointFromTrueAnomaly(q, e, omega, node, inc, nu, orbitLimit);
    if (point) {
      rawOrbitPoints.push(point);
    }
  }

  if (rawOrbitPoints.length < 12) {
    return null;
  }

  const planets = getPlanetReferenceModel().filter((planet) => planet.orbitRadius <= planeRadius * 0.98);
  const planeCornersRaw = [
    { x: -planeRadius, y: -planeRadius, z: 0 },
    { x: planeRadius, y: -planeRadius, z: 0 },
    { x: planeRadius, y: planeRadius, z: 0 },
    { x: -planeRadius, y: planeRadius, z: 0 }
  ];
  const gridSteps = [-0.75, -0.35, 0, 0.35, 0.75].map((factor) => roundNumber(factor * planeRadius, 4));
  const gridLinesRaw = [
    ...gridSteps.map((step) => [
      { x: -planeRadius, y: step, z: 0 },
      { x: planeRadius, y: step, z: 0 }
    ]),
    ...gridSteps.map((step) => [
      { x: step, y: -planeRadius, z: 0 },
      { x: step, y: planeRadius, z: 0 }
    ])
  ];
  const ringRaw = planets.map((planet) => ({
    ...planet,
    points: buildSceneCircle(planet.orbitRadius)
  }));
  const rawPlanetMarkers = planets.map((planet) => {
    const angle = degToRad(planet.phaseDeg);
    return {
      ...planet,
      point: {
        x: planet.orbitRadius * Math.cos(angle),
        y: planet.orbitRadius * Math.sin(angle),
        z: 0
      }
    };
  });

  const axisLength = planeRadius * 0.9;
  const axisRaw = {
    x: { x: axisLength, y: 0, z: 0 },
    y: { x: 0, y: axisLength, z: 0 },
    z: { x: 0, y: 0, z: axisLength * 0.72 }
  };
  const ascendingNodeRaw = orbitPointFromTrueAnomaly(q, e, omega, node, inc, -omega, orbitLimit) || rawOrbitPoints[0];
  const descendingNodeRaw = orbitPointFromTrueAnomaly(q, e, omega, node, inc, Math.PI - omega, orbitLimit) || rawOrbitPoints[Math.floor(rawOrbitPoints.length / 2)];
  const perihelionRaw = orbitPointFromTrueAnomaly(q, e, omega, node, inc, 0, orbitLimit) || rawOrbitPoints[0];

  const projectedOrbit = rawOrbitPoints.map((point) => ({
    point: projectSystemPoint(point),
    above: point.z >= 0
  }));
  const projectedPlaneCorners = planeCornersRaw.map(projectSystemPoint);
  const projectedGrid = gridLinesRaw.map(([start, end]) => ({ start: projectSystemPoint(start), end: projectSystemPoint(end) }));
  const projectedRings = ringRaw.map((ring) => ({
    ...ring,
    points: ring.points.map(projectSystemPoint)
  }));
  const projectedPlanets = rawPlanetMarkers.map((planet) => ({
    ...planet,
    point: projectSystemPoint(planet.point)
  }));
  const projectedAxis = {
    x: projectSystemPoint(axisRaw.x),
    y: projectSystemPoint(axisRaw.y),
    z: projectSystemPoint(axisRaw.z)
  };
  const featureProjected = {
    sun: projectSystemPoint({ x: 0, y: 0, z: 0 }),
    perihelion: projectSystemPoint(perihelionRaw),
    ascendingNode: projectSystemPoint(ascendingNodeRaw),
    descendingNode: projectSystemPoint(descendingNodeRaw)
  };

  const allProjected = [
    ...projectedOrbit.map((entry) => entry.point),
    ...projectedPlaneCorners,
    ...projectedGrid.flatMap((line) => [line.start, line.end]),
    ...projectedRings.flatMap((ring) => ring.points),
    ...projectedPlanets.map((planet) => planet.point),
    projectedAxis.x,
    projectedAxis.y,
    projectedAxis.z,
    featureProjected.sun,
    featureProjected.perihelion,
    featureProjected.ascendingNode,
    featureProjected.descendingNode
  ];

  const bounds = allProjected.reduce(
    (acc, point) => ({
      minX: Math.min(acc.minX, point.x),
      maxX: Math.max(acc.maxX, point.x),
      minY: Math.min(acc.minY, point.y),
      maxY: Math.max(acc.maxY, point.y)
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
  );

  const pad = mode === "modal" ? 34 : 28;
  const spanX = Math.max(1, bounds.maxX - bounds.minX);
  const spanY = Math.max(1, bounds.maxY - bounds.minY);
  const scale = Math.min((width - pad * 2) / spanX, (height - pad * 2) / spanY);
  const center = { x: width / 2, y: height / 2 };
  const sourceCenter = {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2
  };
  const mapPoint = (point) => ({
    x: roundNumber(center.x + (point.x - sourceCenter.x) * scale, 2),
    y: roundNumber(center.y + (point.y - sourceCenter.y) * scale, 2)
  });

  const mappedOrbit = projectedOrbit.map((entry) => ({
    ...mapPoint(entry.point),
    above: entry.above
  }));
  const mappedPlaneCorners = projectedPlaneCorners.map(mapPoint);
  const mappedGrid = projectedGrid.map((line) => {
    const start = mapPoint(line.start);
    const end = mapPoint(line.end);
    return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
  });
  const mappedRings = projectedRings.map((ring) => ({
    ...ring,
    path: buildMappedPath(ring.points.map(mapPoint))
  }));
  const mappedPlanets = projectedPlanets.map((planet) => {
    const point = mapPoint(planet.point);
    const label = buildOrbitAnnotationPlacement(point, center, width, height, mode, {
      dx: planet.labelDx ?? (point.x >= center.x ? 18 : -18),
      dy: planet.labelDy ?? (point.y >= center.y ? 16 : -16)
    });
    return {
      ...planet,
      x: point.x,
      y: point.y,
      radius: planet.radius,
      label: {
        x: label.text.x,
        y: label.text.y,
        anchor: label.anchor
      }
    };
  });
  const sun = mapPoint(featureProjected.sun);
  const perihelion = mapPoint(featureProjected.perihelion);
  const ascendingNode = mapPoint(featureProjected.ascendingNode);
  const descendingNode = mapPoint(featureProjected.descendingNode);
  const axis = {
    x: mapPoint(projectedAxis.x),
    y: mapPoint(projectedAxis.y),
    z: mapPoint(projectedAxis.z)
  };

  return {
    width,
    height,
    planeSurfacePath: `${buildMappedPath(mappedPlaneCorners)} Z`,
    gridLines: mappedGrid,
    planetaryRings: mappedRings.map((ring) => ({
      path: ring.path,
      isEarth: ring.short === "Z"
    })),
    abovePath: buildOrbitSegmentPath(mappedOrbit, true),
    belowPath: buildOrbitSegmentPath(mappedOrbit, false),
    planets: mappedPlanets,
    sun,
    perihelion,
    ascendingNode,
    descendingNode,
    axis,
    annotations: {
      sun: buildOrbitAnnotationPlacement(sun, center, width, height, mode, { dx: 18, dy: -16 }),
      perihelion: buildOrbitAnnotationPlacement(perihelion, center, width, height, mode),
      ascendingNode: buildOrbitAnnotationPlacement(ascendingNode, center, width, height, mode),
      descendingNode: buildOrbitAnnotationPlacement(descendingNode, center, width, height, mode),
      plane: {
        point: mappedPlaneCorners[1],
        lineEnd: mappedPlaneCorners[1],
        text: {
          x: roundNumber(clamp(mappedPlaneCorners[1].x + 8, 12, width - 12), 2),
          y: roundNumber(clamp(mappedPlaneCorners[1].y - 8, 16, height - 12), 2)
        },
        anchor: "start"
      }
    }
  };
}

function buildSceneCircle(radius, steps = 160) {
  const points = [];
  for (let index = 0; index <= steps; index += 1) {
    const angle = (2 * Math.PI * index) / steps;
    points.push({
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      z: 0
    });
  }
  return points;
}

function getPlanetReferenceModel() {
  return [
    { short: "Me", orbitRadius: 0.39, phaseDeg: 18, color: "#c9b18c", radius: 4.2, labelDx: 28, labelDy: 26 },
    { short: "Ve", orbitRadius: 0.72, phaseDeg: 78, color: "#d8c07a", radius: 4.8, labelDx: 22, labelDy: -22 },
    { short: state.lang === "bs" ? "Z" : "E", orbitRadius: 1.0, phaseDeg: 146, color: "#62a8ff", radius: 5.2, labelDx: -18, labelDy: -22, isEarth: true },
    { short: "Ma", orbitRadius: 1.52, phaseDeg: 220, color: "#e28263", radius: 4.8, labelDx: -28, labelDy: 18 },
    { short: "J", orbitRadius: 5.2, phaseDeg: 302, color: "#d7b06b", radius: 5.4, labelDx: -18, labelDy: 28 },
    { short: "S", orbitRadius: 9.58, phaseDeg: 340, color: "#e6d7b5", radius: 5.4, labelDx: 18, labelDy: 28 }
  ];
}

function buildOrbitDualPreview(elements, mode = "card") {
  const q = Number(elements.perihelionDistance?.value);
  const e = Number(elements.eccentricity?.value);
  const incDeg = Number(elements.inclination?.value);
  const nodeDeg = Number(elements.ascendingNode?.value);
  const argPerDeg = Number(elements.argumentOfPerihelion?.value);

  if (![q, e, incDeg, nodeDeg, argPerDeg].every(Number.isFinite) || q <= 0 || e < 0) {
    return null;
  }

  const omega = degToRad(argPerDeg);
  const node = degToRad(nodeDeg);
  const inc = degToRad(incDeg);
  const span = getOrbitTrueAnomalySpan(e);
  const maxDisplayRadius = Math.max(6, Math.min(48, q * 10));
  const rawOrbitPoints = [];

  for (let index = 0; index <= 220; index += 1) {
    const nu = -span + (2 * span * index) / 220;
    const point = orbitPointFromTrueAnomaly(q, e, omega, node, inc, nu, maxDisplayRadius);
    if (point) {
      rawOrbitPoints.push(point);
    }
  }

  if (rawOrbitPoints.length < 12) {
    return null;
  }

  const ascendingNodeRaw = orbitPointFromTrueAnomaly(q, e, omega, node, inc, -omega, maxDisplayRadius) || rawOrbitPoints[0];
  const descendingNodeRaw = orbitPointFromTrueAnomaly(q, e, omega, node, inc, Math.PI - omega, maxDisplayRadius) || rawOrbitPoints[Math.floor(rawOrbitPoints.length / 2)];
  const perihelionRaw = orbitPointFromTrueAnomaly(q, e, omega, node, inc, 0, maxDisplayRadius) || rawOrbitPoints[0];

  const topWidth = mode === "modal" ? 280 : 240;
  const topHeight = mode === "modal" ? 220 : 190;
  const sideWidth = mode === "modal" ? 280 : 240;
  const sideHeight = mode === "modal" ? 220 : 190;

  const topReference = [];
  for (let index = 0; index <= 180; index += 1) {
    const angle = (2 * Math.PI * index) / 180;
    topReference.push({ x: Math.cos(angle), y: Math.sin(angle) });
  }

  const topOrbit = rawOrbitPoints.map((point) => ({
    x: point.x,
    y: point.y,
    above: point.z >= 0
  }));

  const sideOrbit = rawOrbitPoints.map((point) => {
    const sidePoint = projectOrbitSidePoint(point);
    return {
      x: sidePoint.x,
      y: sidePoint.y,
      above: point.z >= 0
    };
  });

  const top = buildOrbitView({
    width: topWidth,
    height: topHeight,
    orbitPoints: topOrbit,
    referencePoints: topReference,
    featurePoints: {
      sun: { x: 0, y: 0 },
      perihelion: { x: perihelionRaw.x, y: perihelionRaw.y },
      ascendingNode: { x: ascendingNodeRaw.x, y: ascendingNodeRaw.y },
      descendingNode: { x: descendingNodeRaw.x, y: descendingNodeRaw.y }
    },
    fillReference: true
  });

  const sidePerihelion = projectOrbitSidePoint(perihelionRaw);
  const side = buildOrbitView({
    width: sideWidth,
    height: sideHeight,
    orbitPoints: sideOrbit,
    referencePoints: [],
    featurePoints: {
      sun: { x: 0, y: 0 },
      perihelion: { x: sidePerihelion.x, y: sidePerihelion.y }
    },
    fillReference: false
  });

  top.annotations = {
    sun: buildOrbitAnnotationPlacement(top.sun, top.center, top.width, top.height, mode, { dx: 18, dy: -18 }),
    perihelion: buildOrbitAnnotationPlacement(top.perihelion, top.center, top.width, top.height, mode),
    ascendingNode: buildOrbitAnnotationPlacement(top.ascendingNode, top.center, top.width, top.height, mode),
    descendingNode: buildOrbitAnnotationPlacement(top.descendingNode, top.center, top.width, top.height, mode)
  };

  side.annotations = {
    sun: buildOrbitAnnotationPlacement(side.sun, side.center, side.width, side.height, mode, { dx: 18, dy: -18 }),
    perihelion: buildOrbitAnnotationPlacement(side.perihelion, side.center, side.width, side.height, mode),
    plane: {
      point: { x: side.width - side.pad - 36, y: side.baselineY },
      lineEnd: { x: side.width - side.pad - 36, y: side.baselineY },
      text: { x: side.width - side.pad - 8, y: side.baselineY - 8 },
      anchor: "end"
    }
  };

  return { top, side };
}

function buildOrbitView({ width, height, orbitPoints, referencePoints, featurePoints, fillReference }) {
  const pad = 24;
  const features = Object.values(featurePoints || {});
  const allPoints = [...orbitPoints, ...referencePoints, ...features];
  const bounds = allPoints.reduce(
    (acc, point) => ({
      minX: Math.min(acc.minX, point.x),
      maxX: Math.max(acc.maxX, point.x),
      minY: Math.min(acc.minY, point.y),
      maxY: Math.max(acc.maxY, point.y)
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
  );

  const spanX = Math.max(1, bounds.maxX - bounds.minX);
  const spanY = Math.max(1, bounds.maxY - bounds.minY);
  const scale = Math.min((width - pad * 2) / spanX, (height - pad * 2) / spanY);
  const center = { x: width / 2, y: height / 2 };
  const sourceCenter = {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2
  };
  const mapPoint = (point) => ({
    x: roundNumber(center.x + (point.x - sourceCenter.x) * scale, 2),
    y: roundNumber(center.y + (point.y - sourceCenter.y) * scale, 2)
  });

  const mappedOrbit = orbitPoints.map((point) => ({
    ...mapPoint(point),
    above: point.above
  }));
  const mappedReference = referencePoints.map(mapPoint);
  const mappedFeatures = Object.fromEntries(
    Object.entries(featurePoints || {}).map(([key, value]) => [key, mapPoint(value)])
  );

  return {
    width,
    height,
    pad,
    center,
    baselineY: mapPoint({ x: sourceCenter.x, y: 0 }).y,
    referencePath: mappedReference.length ? buildMappedPath(mappedReference) : "",
    referenceFillPath: fillReference && mappedReference.length ? `${buildMappedPath(mappedReference)} Z` : "",
    abovePath: buildOrbitSegmentPath(mappedOrbit, true),
    belowPath: buildOrbitSegmentPath(mappedOrbit, false),
    ...mappedFeatures
  };
}

function buildOrbit3DPreview(elements, mode = "card") {
  const q = Number(elements.perihelionDistance?.value);
  const e = Number(elements.eccentricity?.value);
  const incDeg = Number(elements.inclination?.value);
  const nodeDeg = Number(elements.ascendingNode?.value);
  const argPerDeg = Number(elements.argumentOfPerihelion?.value);

  if (![q, e, incDeg, nodeDeg, argPerDeg].every(Number.isFinite) || q <= 0 || e < 0) {
    return null;
  }

  const width = mode === "modal" ? 360 : 300;
  const height = mode === "modal" ? 280 : 230;
  const center = { x: width / 2, y: height / 2 };
  const omega = degToRad(argPerDeg);
  const node = degToRad(nodeDeg);
  const inc = degToRad(incDeg);
  const span = getOrbitTrueAnomalySpan(e);
  const maxDisplayRadius = Math.max(6, Math.min(48, q * 10));
  const rawOrbitPoints = [];

  for (let index = 0; index <= 220; index += 1) {
    const nu = -span + (2 * span * index) / 220;
    const point = orbitPointFromTrueAnomaly(q, e, omega, node, inc, nu, maxDisplayRadius);
    if (point) {
      rawOrbitPoints.push(point);
    }
  }

  if (rawOrbitPoints.length < 12) {
    return null;
  }

  const referencePoints = [];
  for (let index = 0; index <= 180; index += 1) {
    const nu = (2 * Math.PI * index) / 180;
    referencePoints.push(projectOrbitPoint({ x: Math.cos(nu), y: Math.sin(nu), z: 0 }));
  }

  const projectedOrbit = rawOrbitPoints.map(projectOrbitPoint);
  const ascendingNodeRaw = orbitPointFromTrueAnomaly(q, e, omega, node, inc, -omega, maxDisplayRadius) || rawOrbitPoints[0];
  const descendingNodeRaw = orbitPointFromTrueAnomaly(q, e, omega, node, inc, Math.PI - omega, maxDisplayRadius) || rawOrbitPoints[Math.floor(rawOrbitPoints.length / 2)];
  const perihelionRaw = orbitPointFromTrueAnomaly(q, e, omega, node, inc, 0, maxDisplayRadius) || rawOrbitPoints[0];
  const featurePoints = [projectOrbitPoint(ascendingNodeRaw), projectOrbitPoint(descendingNodeRaw), projectOrbitPoint(perihelionRaw)];

  const allProjected = [...projectedOrbit, ...referencePoints, ...featurePoints, { x: 0, y: 0 }];
  const bounds = allProjected.reduce(
    (acc, point) => ({
      minX: Math.min(acc.minX, point.x),
      maxX: Math.max(acc.maxX, point.x),
      minY: Math.min(acc.minY, point.y),
      maxY: Math.max(acc.maxY, point.y)
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
  );

  const spanX = Math.max(1, bounds.maxX - bounds.minX);
  const spanY = Math.max(1, bounds.maxY - bounds.minY);
  const scale = Math.min((width - 48) / spanX, (height - 48) / spanY);
  const mapPoint = (point) => ({
    x: roundNumber(center.x + point.x * scale, 2),
    y: roundNumber(center.y + point.y * scale, 2)
  });

  const projectedMapped = projectedOrbit.map((point, index) => ({
    ...mapPoint(point),
    above: rawOrbitPoints[index].z >= 0
  }));

  return {
    width,
    height,
    center,
    referencePath: buildMappedPath(referencePoints.map(mapPoint)),
    referenceFillPath: `${buildMappedPath(referencePoints.map(mapPoint))} Z`,
    abovePath: buildOrbitSegmentPath(projectedMapped, true),
    belowPath: buildOrbitSegmentPath(projectedMapped, false),
    ascendingNode: mapPoint(projectOrbitPoint(ascendingNodeRaw)),
    descendingNode: mapPoint(projectOrbitPoint(descendingNodeRaw)),
    perihelion: mapPoint(projectOrbitPoint(perihelionRaw)),
    annotations: {
      sun: buildOrbitAnnotationPlacement(mapPoint({ x: 0, y: 0 }), center, width, height, mode, { dx: 18, dy: -16 }),
      perihelion: buildOrbitAnnotationPlacement(mapPoint(projectOrbitPoint(perihelionRaw)), center, width, height, mode),
      ascendingNode: buildOrbitAnnotationPlacement(mapPoint(projectOrbitPoint(ascendingNodeRaw)), center, width, height, mode),
      descendingNode: buildOrbitAnnotationPlacement(mapPoint(projectOrbitPoint(descendingNodeRaw)), center, width, height, mode),
      plane: {
        point: { x: center.x, y: center.y },
        lineEnd: { x: roundNumber(Math.min(width - 90, center.x + 42), 2), y: roundNumber(Math.max(28, center.y - 34), 2) },
        text: { x: roundNumber(Math.min(width - 18, center.x + 48), 2), y: roundNumber(Math.max(22, center.y - 38), 2) },
        anchor: "start"
      }
    }
  };
}

function buildOrbitAnnotationPlacement(point, center, width, height, mode, options = {}) {
  const horizontal = options.dx ? Math.sign(options.dx) : (point.x >= center.x ? 1 : -1);
  const vertical = options.dy ? Math.sign(options.dy) : (point.y >= center.y ? 1 : -1);
  const baseDx = options.dx ?? horizontal * (mode === "modal" ? 18 : 16);
  const baseDy = options.dy ?? vertical * (mode === "modal" ? 14 : 12);
  const lineEndX = clamp(point.x + baseDx, 16, width - 16);
  const lineEndY = clamp(point.y + baseDy, 18, height - 18);
  const textX = clamp(lineEndX + horizontal * 6, 12, width - 12);
  const textY = clamp(lineEndY + (vertical < 0 ? -4 : 14), 16, height - 10);

  return {
    point,
    lineEnd: { x: roundNumber(lineEndX, 2), y: roundNumber(lineEndY, 2) },
    text: { x: roundNumber(textX, 2), y: roundNumber(textY, 2) },
    anchor: horizontal > 0 ? "start" : "end"
  };
}

function getOrbitTrueAnomalySpan(eccentricity) {
  if (eccentricity < 0.98) {
    return Math.PI;
  }
  if (eccentricity <= 1.02) {
    return Math.PI * 0.92;
  }
  const limit = Math.acos(Math.max(-1, Math.min(1, -1 / eccentricity)));
  return Math.min(limit * 0.96, Math.PI * 0.9);
}

function orbitPointFromTrueAnomaly(q, e, omega, node, inc, nu, maxDisplayRadius) {
  const cosNu = Math.cos(nu);
  const denominator = 1 + e * cosNu;
  if (!Number.isFinite(denominator) || Math.abs(denominator) < 1e-6) {
    return null;
  }

  const p = Math.abs(e - 1) < 0.02 ? 2 * q : q * (1 + e);
  const r = p / denominator;
  if (!Number.isFinite(r) || r <= 0 || r > maxDisplayRadius) {
    return null;
  }

  const u = omega + nu;
  const cosNode = Math.cos(node);
  const sinNode = Math.sin(node);
  const cosU = Math.cos(u);
  const sinU = Math.sin(u);
  const cosI = Math.cos(inc);
  const sinI = Math.sin(inc);

  return {
    x: r * (cosNode * cosU - sinNode * sinU * cosI),
    y: r * (sinNode * cosU + cosNode * sinU * cosI),
    z: r * sinU * sinI
  };
}

function projectOrbitPoint(point) {
  const yaw = degToRad(-42);
  const pitch = degToRad(24);
  const x1 = point.x * Math.cos(yaw) - point.y * Math.sin(yaw);
  const y1 = point.x * Math.sin(yaw) + point.y * Math.cos(yaw);
  const z1 = point.z;
  const y2 = y1 * Math.cos(pitch) - z1 * Math.sin(pitch);
  return {
    x: x1,
    y: -y2
  };
}

function projectSystemPoint(point) {
  const yaw = degToRad(-34);
  const pitch = degToRad(57);
  const x1 = point.x * Math.cos(yaw) - point.y * Math.sin(yaw);
  const y1 = point.x * Math.sin(yaw) + point.y * Math.cos(yaw);
  const z1 = point.z;
  const y2 = y1 * Math.cos(pitch) - z1 * Math.sin(pitch);
  return {
    x: x1,
    y: -y2
  };
}

function projectOrbitSidePoint(point) {
  const yaw = degToRad(-42);
  const x = point.x * Math.cos(yaw) - point.y * Math.sin(yaw);
  return {
    x,
    y: -point.z
  };
}

function buildMappedPath(points) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
}

function buildOrbitSegmentPath(points, above) {
  let path = "";
  let drawing = false;

  points.forEach((point) => {
    if (point.above !== above) {
      drawing = false;
      return;
    }
    path += `${drawing ? " L" : "M"}${point.x} ${point.y}`;
    drawing = true;
  });

  return path || null;
}

function getPreparedComets(rawComets) {
  const prepared = rawComets.map((comet) => {
    const preparedComet = {
      ...comet,
      operational: {
        visibilityWindowScore: comet.operational?.visibilityWindowScore ?? null,
        verdict: ts(comet.operational?.verdict) || t("noDataAdditionalCheck"),
        imagingVerdict: ts(comet.operational?.imagingVerdict) || t("noImagingData")
      },
      uncertainty: {
        label: ts(comet.uncertainty?.label) || "n/a",
        score: comet.uncertainty?.score ?? null,
        note: ts(comet.uncertainty?.note) || t("noOrbitComment")
      },
      visibilityWindow: {
        riseAt: comet.visibilityWindow?.riseAt || null,
        transitAt: comet.visibilityWindow?.transitAt || null,
        setAt: comet.visibilityWindow?.setAt || null,
        bestNightAt: comet.visibilityWindow?.bestNightAt || null,
        bestNightAltitudeDeg: comet.visibilityWindow?.bestNightAltitudeDeg ?? null,
        nightVisibleHours: comet.visibilityWindow?.nightVisibleHours ?? null
      },
      tailMotion: {
        deltaDeg: comet.tailMotion?.deltaDeg ?? null,
        label: ts(comet.tailMotion?.label) || t("noTailMotionData")
      },
      observations: {
        ...comet.observations,
        recentSeries: comet.observations?.recentSeries || []
      },
      sky: {
        ...comet.sky,
        altitudeCurve: comet.sky?.altitudeCurve || []
      },
      isFavorite: state.watchlist.includes(comet.id)
    };
    preparedComet.clientScore = computeClientScore(preparedComet);
    return preparedComet;
  });

  prepared.sort((left, right) => right.clientScore - left.clientScore);

  switch (state.filter) {
    case "visible":
      return prepared.filter((comet) => comet.status.visibilityBand === "night");
    case "fresh":
      return prepared.filter((comet) => (comet.observations.latest?.hoursAgo ?? 999) <= 72);
    case "watchlist":
      return prepared.filter((comet) => comet.isFavorite);
    default:
      return prepared;
  }
}

function computeClientScore(comet) {
  return roundNumber((comet.score || 0) + (comet.isFavorite ? 8 : 0), 2);
}

function buildHeroSummary(comet) {
  if (!comet) return t("noTarget");
  const magnitude = formatMagnitude(comet.observations.medianMagnitude ?? comet.sky.totalMagnitude);
  const bestAltitude = formatAngle(comet.visibilityWindow.bestNightAltitudeDeg ?? comet.sky.altitudeDeg);
  const bestTime = formatEventTime(comet.visibilityWindow.bestNightAt || comet.visibilityWindow.transitAt);
  return `${t("bestTargetSummary")} ${state.observer.label}: ${comet.displayName}, ${magnitude}, ${t("maxAlt")} ${bestAltitude}, ${t("optimumAround")} ${bestTime}.`;
}

function buildBrightestSummary(comet) {
  if (!comet) return t("noNightTarget");
  const mag = formatMagnitude(comet.observations.medianMagnitude ?? comet.sky.totalMagnitude);
  const band = comet.status?.visibilityBand;
  const statusLabel = band === "night" ? t("statusNight")
    : band === "up" ? t("statusUp")
    : t("statusDown");
  return `${mag}, status: ${statusLabel.toLowerCase()}.`;
}

function selectBrightestEveningComet(comets) {
  const candidates = [...comets].filter((comet) => comet.status?.visibilityBand === "night");
  const pool = candidates.length ? candidates : [...comets].filter((comet) => comet.status?.aboveHorizon);
  const ranked = (pool.length ? pool : [...comets]).sort((left, right) => {
    const leftMagnitude = left.observations?.medianMagnitude ?? left.sky?.totalMagnitude ?? Number.POSITIVE_INFINITY;
    const rightMagnitude = right.observations?.medianMagnitude ?? right.sky?.totalMagnitude ?? Number.POSITIVE_INFINITY;
    if (leftMagnitude !== rightMagnitude) {
      return leftMagnitude - rightMagnitude;
    }
    return (right.score || 0) - (left.score || 0);
  });
  return ranked[0] || null;
}

function selectOperationalComet(comets) {
  return [...comets].sort((left, right) => (right.score || 0) - (left.score || 0))[0] || null;
}

function buildTrendLabel(comet) {
  const series = comet.observations.recentSeries || [];
  if (series.length < 2) return t("trendNoData");
  const first = series[0]?.magnitude;
  const last = series[series.length - 1]?.magnitude;
  if (first == null || last == null) return t("trendNoData");
  const delta = roundNumber(last - first, 2);
  if (Math.abs(delta) < 0.2) return t("trendStable");
  return delta < 0
    ? `${t("trendBright")} ${formatSignedNumber(Math.abs(delta))} mag`
    : `${t("trendFade")} ${formatSignedNumber(delta)} mag`;
}

function filterLabel(key) {
  switch (key) {
    case "visible": return t("filterVisible");
    case "fresh": return t("filterFresh");
    case "watchlist": return t("filterWatchlist");
    default: return t("filterAll");
  }
}

function filterDescription(key) {
  if (state.lang === "en") {
    switch (key) {
      case "visible": return "Shows only comets currently above the horizon in night or dark twilight mode.";
      case "fresh": return "Shows only targets with fresh COBS observations in the last 72 hours.";
      case "watchlist": return "Shows only comets you have manually saved to the local watchlist.";
      default: return "Shows all currently fetched comets, sorted by the application's operational score.";
    }
  }
  switch (key) {
    case "visible": return "Prikazuje samo komete koje su trenutno iznad horizonta i u noćnom ili tamnom sumračnom režimu.";
    case "fresh": return "Prikazuje samo mete sa svježim COBS opažanjima u posljednja 72 sata.";
    case "watchlist": return "Prikazuje samo komete koje ste ručno sačuvali u lokalnu watchlistu.";
    default: return "Prikazuje sve trenutno dohvaćene komete, sortirane po operativnom skoru aplikacije.";
  }
}

function buildCurveMarker(label, timestamp, samplePoints) {
  if (!timestamp || !samplePoints.length) {
    return null;
  }

  const target = Date.parse(timestamp);
  if (!Number.isFinite(target)) {
    return null;
  }

  let best = samplePoints[0];
  let bestDistance = Math.abs(Date.parse(best.timestamp) - target);
  for (const point of samplePoints) {
    const distance = Math.abs(Date.parse(point.timestamp) - target);
    if (distance < bestDistance) {
      best = point;
      bestDistance = distance;
    }
  }

  return {
    label: `${label} ${formatEventTime(timestamp)}`,
    x: best.x,
    y: best.y
  };
}

function buildNightBands(samplePoints) {
  const bands = [];
  let startPoint = null;

  for (let index = 0; index < samplePoints.length; index += 1) {
    const point = samplePoints[index];
    const isNight = isNightLike(point.solarState);

    if (isNight && !startPoint) {
      startPoint = point;
    }

    const nextPoint = samplePoints[index + 1];
    if ((!isNight || !nextPoint) && startPoint) {
      const endPoint = isNight && !nextPoint ? point : samplePoints[Math.max(0, index - 1)] || point;
      bands.push({
        x: startPoint.x,
        width: Math.max(6, endPoint.x - startPoint.x + 6)
      });
      startPoint = null;
    }
  }

  return bands;
}

function isNightLike(solarState) {
  return solarState === "Noć" || solarState === "Astronomski sumrak" || solarState === "Nautički sumrak";
}

function bindControls() {
  if (state.handlersBound) {
    return;
  }

  state.handlersBound = true;
  app.addEventListener("click", handleAppClick);
  app.addEventListener("submit", handleAppSubmit);
}

function handleAppClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  // Overlay close clicks
  if (target.matches(".modal-overlay[data-action='about-close']")) { state.aboutOpen = false; render(); return; }
  if (target.matches(".modal-overlay[data-action='close-comet']")) { state.selectedCometId = null; render(); return; }
  if (target.matches(".modal-overlay[data-action='star-map-close']")) { state.starMapOpen = false; render(); return; }
  if (target.matches(".modal-overlay[data-action='historic-close']")) { state.historicOpen = false; render(); return; }
  if (target.matches(".modal-overlay[data-action='calendar-close']")) { state.calendarOpen = false; render(); return; }
  if (target.matches(".modal-overlay[data-action='notif-close']")) { state.notifOpen = false; render(); return; }

  const actionElement = target.closest("[data-action]");
  if (!actionElement) return;
  const action = actionElement.getAttribute("data-action");

  if (action === "about-close") { state.aboutOpen = false; render(); return; }
  if (action === "close-comet") { state.selectedCometId = null; render(); return; }
  if (action === "star-map-close") { state.starMapOpen = false; render(); return; }
  if (action === "historic-close") { state.historicOpen = false; render(); return; }
  if (action === "historic-open") { state.historicOpen = true; render(); return; }
  if (action === "calendar-close") { state.calendarOpen = false; render(); return; }
  if (action === "notif-close") { state.notifOpen = false; render(); return; }
  if (action === "about-open") { state.aboutOpen = true; render(); return; }
  if (action === "star-map-open") { state.starMapOpen = true; render(); return; }
  if (action === "calendar-open") { state.calendarOpen = true; render(); return; }
  if (action === "notif-open") { state.notifOpen = true; render(); return; }
  if (action === "dismiss-new-comet") { state.newCometIds = []; render(); return; }
  if (action === "lang-toggle") {
    state.lang = state.lang === "bs" ? "en" : "bs";
    setLang(state.lang);
    render(); return;
  }
  if (action === "cal-range") {
    state.calendarRange = actionElement.getAttribute("data-range") || "week";
    render(); return;
  }
  if (action === "notif-toggle") {
    toggleNotifications(); return;
  }
  if (action === "notif-test") {
    const topComet = selectOperationalComet(getPreparedComets(state.data?.comets || []));
    if (topComet) {
      const bestTime = topComet.visibilityWindow?.bestNightAt;
      sendBrowserNotification(
        `${escapeHtml(topComet.displayName)} ${t("notifVisibleTonight")}`,
        bestTime ? `${t("notifAt")} ${formatEventTime(bestTime)}` : ""
      );
    }
    return;
  }
  if (action === "alarm-toggle") {
    state.alarmActive = !state.alarmActive;
    localStorage.setItem("comet-hunter-alarm", JSON.stringify(state.alarmActive));
    if (state.alarmActive) checkAlarmConditions();
    else state.alarmStatus = null;
    render(); return;
  }
  if (action === "check-conditions") {
    checkAlarmConditions().then(() => render());
    return;
  }
  if (action === "theme") {
    state.theme = state.theme === "dark" ? "light" : "dark";
    setTheme(state.theme);
    render(); return;
  }
  if (action === "retry") { loadData(); return; }
  if (action === "filter") {
    state.filter = actionElement.getAttribute("data-filter") || "all";
    localStorage.setItem("comet-hunter-filter", state.filter);
    render(); return;
  }
  if (action === "view-mode") {
    state.viewMode = actionElement.getAttribute("data-view") || "compact";
    localStorage.setItem("comet-hunter-view", state.viewMode);
    render(); return;
  }
  if (action === "toggle-watchlist") {
    event.stopPropagation();
    const cometId = actionElement.getAttribute("data-comet-id");
    if (!cometId) return;
    state.watchlist = state.watchlist.includes(cometId)
      ? state.watchlist.filter((id) => id !== cometId)
      : [...state.watchlist, cometId];
    localStorage.setItem("comet-hunter-watchlist", JSON.stringify(state.watchlist));
    render(); return;
  }
  if (action === "open-comet") {
    if (target.closest("[data-action='toggle-watchlist']")) return;
    state.selectedCometId = actionElement.getAttribute("data-comet-id");
    if (state.starMapOpen) state.starMapOpen = false;
    render(); return;
  }
  if (action === "export") {
    const format = actionElement.getAttribute("data-format");
    if (format) exportPreparedList(format);
    return;
  }
  if (action === "locate") {
    if (!navigator.geolocation) {
      alert(state.lang === "bs" ? "Geolokacija nije dostupna u ovom browseru." : "Geolocation not available.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        state.observer = {
          ...state.observer,
          label: state.lang === "bs" ? "Moja lokacija" : "My location",
          lat: Number(position.coords.latitude.toFixed(4)),
          lon: Number(position.coords.longitude.toFixed(4))
        };
        loadData();
      },
      (error) => alert(`${state.lang === "bs" ? "Geolokacija nije uspjela" : "Geolocation failed"}: ${error.message}`),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }
}

function handleAppSubmit(event) {
  const target = event.target;
  if (!(target instanceof HTMLFormElement) || target.id !== "observer-form") {
    return;
  }

  event.preventDefault();
  const formData = new FormData(target);
  state.observer = {
    label: String(formData.get("label") || (state.lang === "bs" ? "Lokalna lokacija" : "My location")),
    lat: Number(formData.get("lat")),
    lon: Number(formData.get("lon")),
    elev: Number(formData.get("elev"))
  };
  loadData();
}

function exportPreparedList(format) {
  const prepared = getPreparedComets(state.data?.comets || []);
  if (!prepared.length) {
    alert(state.lang === "bs" ? "Nema kometa za eksport." : "No comets to export.");
    return;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  let content = "";
  let mime = "text/plain;charset=utf-8";
  let extension = "txt";

  if (format === "csv") {
    const rows = [
      [
        "designation",
        "displayName",
        "score",
        "status",
        "medianMagnitude",
        "totalMagnitude",
        "bestNightAltitudeDeg",
        "nightVisibleHours",
        "elongationDeg",
        "skyMotionArcsecPerMin",
        "riseAt",
        "transitAt",
        "setAt",
        "visibilityWindowScore",
        "uncertaintyLabel",
        "uncertaintyScore",
        "observabilityVerdict",
        "imagingVerdict"
      ],
      ...prepared.map((comet) => [
        comet.designation,
        comet.displayName,
        comet.clientScore,
        comet.status.label,
        comet.observations.medianMagnitude,
        comet.sky.totalMagnitude,
        comet.visibilityWindow.bestNightAltitudeDeg,
        comet.visibilityWindow.nightVisibleHours,
        comet.sky.solarElongationDeg,
        comet.sky.skyMotionArcsecPerMin,
        comet.visibilityWindow.riseAt,
        comet.visibilityWindow.transitAt,
        comet.visibilityWindow.setAt,
        comet.operational.visibilityWindowScore,
        comet.uncertainty.label,
        comet.uncertainty.score,
        comet.operational.verdict,
        comet.operational.imagingVerdict
      ])
    ];
    content = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
    mime = "text/csv;charset=utf-8";
    extension = "csv";
  } else if (format === "json") {
    content = JSON.stringify(
      {
        generatedAt: state.data?.generatedAt,
        observer: state.data?.observer,
        filter: state.filter,
        viewMode: state.viewMode,
        comets: prepared
      },
      null,
      2
    );
    mime = "application/json;charset=utf-8";
    extension = "json";
  } else if (format === "matlab") {
    content = buildMatlabExport(prepared);
    mime = "text/x-matlab;charset=utf-8";
    extension = "m";
  }

  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `comet-hunter-${format}-${timestamp}.${extension}`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function buildMatlabExport(comets) {
  const lines = [
    "% Comet Hunter export",
    `observer.label = '${matlabEscape(state.observer.label)}';`,
    `observer.lat = ${state.observer.lat};`,
    `observer.lon = ${state.observer.lon};`,
    `observer.elev_km = ${state.observer.elev};`,
    "comets = struct([]);"
  ];

  comets.forEach((comet, index) => {
    const row = index + 1;
    lines.push(`comets(${row}).designation = '${matlabEscape(comet.designation)}';`);
    lines.push(`comets(${row}).name = '${matlabEscape(comet.displayName)}';`);
    lines.push(`comets(${row}).score = ${comet.clientScore};`);
    lines.push(`comets(${row}).median_mag = ${matlabNumber(comet.observations.medianMagnitude)};`);
    lines.push(`comets(${row}).total_mag = ${matlabNumber(comet.sky.totalMagnitude)};`);
    lines.push(`comets(${row}).best_alt_deg = ${matlabNumber(comet.visibilityWindow.bestNightAltitudeDeg)};`);
    lines.push(`comets(${row}).elong_deg = ${matlabNumber(comet.sky.solarElongationDeg)};`);
    lines.push(`comets(${row}).mu_arcsec_min = ${matlabNumber(comet.sky.skyMotionArcsecPerMin)};`);
    lines.push(`comets(${row}).vws = ${matlabNumber(comet.operational.visibilityWindowScore)};`);
    lines.push(`comets(${row}).uncertainty = '${matlabEscape(comet.uncertainty.label)}';`);
    lines.push(`comets(${row}).rise_utc = '${matlabEscape(comet.visibilityWindow.riseAt || "")}';`);
    lines.push(`comets(${row}).transit_utc = '${matlabEscape(comet.visibilityWindow.transitAt || "")}';`);
    lines.push(`comets(${row}).set_utc = '${matlabEscape(comet.visibilityWindow.setAt || "")}';`);
  });

  return lines.join("\n");
}

// ── Notification helpers ──────────────────────────────────────────────────────
async function toggleNotifications() {
  if (!("Notification" in window)) {
    alert(state.lang === "bs" ? "Vaš browser ne podržava obavještenja." : "Your browser does not support notifications.");
    return;
  }
  if (!state.notificationsEnabled) {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      state.notificationsEnabled = true;
      localStorage.setItem("comet-hunter-notif", JSON.stringify(true));
    } else {
      alert(state.lang === "bs" ? "Dozvola odbijena." : "Permission denied.");
    }
  } else {
    state.notificationsEnabled = false;
    localStorage.setItem("comet-hunter-notif", JSON.stringify(false));
  }
  render();
}

function sendBrowserNotification(title, body) {
  if (!state.notificationsEnabled || Notification.permission !== "granted") return;
  try {
    new Notification(title, {
      body,
      icon: "/images/comet-hunter.jpg",
      badge: "/images/comet-hunter.jpg"
    });
  } catch (_) {}
}

function scheduleVisibilityAlerts(comets) {
  if (!state.notificationsEnabled) return;
  comets.forEach((comet) => {
    const bestTime = comet.visibilityWindow?.bestNightAt;
    if (!bestTime) return;
    const ms = Date.parse(bestTime) - Date.now() - 15 * 60 * 1000; // 15 min before
    if (ms > 0 && ms < 12 * 60 * 60 * 1000) {
      setTimeout(() => {
        const mag = comet.observations?.medianMagnitude ?? comet.sky?.totalMagnitude;
        sendBrowserNotification(
          `🌠 ${comet.displayName} ${t("notifVisibleTonight")}`,
          `${t("notifAt")} ${formatEventTime(bestTime)} — mag ${mag?.toFixed(1) ?? "?"}`
        );
      }, ms);
    }
  });
}

async function checkAlarmConditions() {
  const comets = state.data?.comets || [];
  const aboveHorizon = comets.filter((c) => c.sky?.altitudeDeg > 10 &&
    (c.status?.visibilityBand === "night" || c.status?.visibilityBand === "up"));

  if (!aboveHorizon.length) {
    state.alarmStatus = { ok: false, message: t("conditionsNotMet") };
    return;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${state.observer.lat}&longitude=${state.observer.lon}&current=cloudcover&timezone=auto`;
    const res = await fetch(url);
    const json = await res.json();
    const cloudCover = json.current?.cloudcover ?? 100;
    state.cloudCover = cloudCover;
    if (cloudCover < 30) {
      state.alarmStatus = { ok: true, message: t("conditionsMet") };
      const best = aboveHorizon[0];
      sendBrowserNotification(
        `⭐ ${best.displayName} — ${t("conditionsMet")}`,
        `${t("cloudCheckFailed").replace("Nije moguće provjeriti oblačnost.", "")}Oblačnost: ${cloudCover}%`
      );
    } else {
      state.alarmStatus = { ok: false, message: `${t("conditionsNotMet")} (${state.lang === "bs" ? "Oblačnost" : "Cloud cover"}: ${cloudCover}%)` };
    }
  } catch (_) {
    state.alarmStatus = { ok: false, message: t("cloudCheckFailed") };
  }
}

// ── AR Camera ─────────────────────────────────────────────────────────────────
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("comet-hunter-theme", theme);
}

function setLang(lang) {
  document.documentElement.lang = lang;
  document.title = lang === "en" ? "Comet Hunter" : "Comet Hunter";
  localStorage.setItem("comet-hunter-lang", lang);
}

function buildStellariumUrl(comet) {
  const raDeg = hmsToDegrees(comet?.sky.rightAscension);
  const decDeg = dmsToDegrees(comet?.sky.declination);
  if (raDeg == null || decDeg == null) {
    return "https://stellarium-web.org/";
  }
  return `https://stellarium-web.org/?ra=${raDeg.toFixed(5)}&dec=${decDeg.toFixed(5)}&fov=20`;
}

function formatMagnitude(value) {
  return value == null ? "n/a" : `${formatPlainNumber(value)} mag`;
}

function formatPlainNumber(value) {
  return value == null ? "n/a" : numberFormat.format(value);
}

function formatAngle(value) {
  return value == null ? "n/a" : `${formatPlainNumber(value)}°`;
}

function formatMotion(value) {
  return value == null ? "n/a" : `${formatPlainNumber(value)} ″/min`;
}

function formatDistance(value, suffix = " AU") {
  return value == null ? "n/a" : `${formatPlainNumber(value)}${suffix}`;
}

function formatEventTime(value) {
  if (!value) {
    return "n/a";
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? escapeHtml(String(value)) : timeFormat.format(date);
}

function formatDuration(value) {
  return value == null ? "n/a" : `${formatPlainNumber(value)} h`;
}

function formatDate(value) {
  if (!value) {
    return "n/a";
  }
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return dateTimeFormat.format(date);
  }
  const fallback = new Date(String(value).replace(" ", "T"));
  return Number.isNaN(fallback.getTime()) ? escapeHtml(String(value)) : dateTimeFormat.format(fallback);
}

function sourceStateLabel(stateKey) {
  switch (stateKey) {
    case "live":      return t("sourceStateLive");
    case "partial":   return t("sourceStatePartial");
    case "error":     return t("sourceStateError");
    case "link-only": return t("sourceStateLinkOnly");
    case "night":     return t("sourceStateNight");
    case "up":        return t("sourceStateUp");
    case "down":      return t("sourceStateDown");
    default:          return stateKey || "n/a";
  }
}

function csvEscape(value) {
  const stringValue = value == null ? "" : String(value);
  if (!/[",\n]/.test(stringValue)) {
    return stringValue;
  }
  return `"${stringValue.replaceAll("\"", "\"\"")}"`;
}

function matlabEscape(value) {
  return String(value ?? "").replaceAll("'", "''");
}

function matlabNumber(value) {
  return value == null ? "NaN" : String(value);
}

function formatSignedNumber(value) {
  return `${formatPlainNumber(value)}`;
}

function loadStoredJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function loadStoredNumber(key, fallback) {
  const raw = Number(localStorage.getItem(key));
  return Number.isFinite(raw) ? raw : fallback;
}

function roundNumber(value, precision = 2) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function degToRad(value) {
  return (Number(value) * Math.PI) / 180;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function hmsToDegrees(value) {
  const match = String(value || "").match(/(\d+)h\s+(\d+)m\s+([\d.]+)s/);
  if (!match) {
    return null;
  }
  const [, h, m, s] = match;
  return (Number(h) + Number(m) / 60 + Number(s) / 3600) * 15;
}

function dmsToDegrees(value) {
  const match = String(value || "").match(/([+\-]?\d+)[^0-9+\-]+\s*(\d+)'\s*([\d.]+)"/);
  if (!match) {
    return null;
  }
  const [, d, m, s] = match;
  const sign = Number(d) < 0 ? -1 : 1;
  return Number(d) + sign * Number(m) / 60 + sign * Number(s) / 3600;
}
