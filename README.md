# Comet Hunter v5

**Autor / Author:** Alan Catovic

Profesionalni dashboard za praćenje kometa / Professional comet tracking dashboard.

## Pokretanje / Running

```bash
node server.js
# Opens at http://127.0.0.1:3000
```

**Node.js 18+** required.

## Mogućnosti / Features

| Feature | BS | EN |
|---|---|---|
| Live kometni radar (JPL · MPC · COBS · Aerith) | ✅ | ✅ |
| Interaktivna zvjezdana mapa (Az/Alt) | ✅ | ✅ |
| 3D orbita u Sunčevom sistemu | ✅ | ✅ |
| Kalendar vidljivosti (sedmica/mjesec) | ✅ | ✅ |
| Push obavještenja + alarm za povoljne uslove | ✅ | ✅ |
| Upozorenja za nove komete | ✅ | ✅ |
| Watchlist + export (CSV / JSON / MATLAB) | ✅ | ✅ |
| Altitude curve 24h | ✅ | ✅ |
| Mobilni prikaz (responsive) | ✅ | ✅ |
| Dvojezičnost (BS/EN) | ✅ | ✅ |

## Deployment

Server radi kao `node server.js` na bilo kojoj Node.js platformi:
- **Railway / Render / Fly.io:** dodaj `PORT` env varijablu
- **VPS:** `pm2 start server.js --name comet-hunter`
- **Docker:** `FROM node:20-alpine`, `CMD ["node","server.js"]`

Port se čita iz `process.env.PORT` (default: 3000).  
Host se čita iz `process.env.HOST` (default: 127.0.0.1 — za produkciju postavi na `0.0.0.0`).

## Konfiguracija / Config

Podrazumijevana lokacija posmatrača: **Sarajevo** (43.8563°N, 18.4131°E).  
Mijenja se direktno u UI-ju bez restarta servera.

## Licence

Privatna upotreba / Private use — Alan Catovic 2026.
