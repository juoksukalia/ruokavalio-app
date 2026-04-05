# 🥗 Rekompositio-ruokavalio

Henkilökohtainen 3 viikon kiertävä ruokavalio-sovellus.

## Ominaisuudet

- 3 viikon kiertävä ohjelma (salipäivä / futsal / lepopäivä)
- Kaikki reseptit ja ainekset
- Aterian merkkaus syödyksi ✓
- Päivän makrot ja edistymispalkki
- Toimii kännykällä

---

## Deployment Railwaylle (5 min)

### 1. Asenna Git & Node (jos ei vielä)
```bash
# Tarkista
git --version
node --version
```

### 2. Luo GitHub-repositorio
1. Mene https://github.com → New repository
2. Nimi: `ruokavalio-app`
3. Public tai Private, kumpi vain
4. **Älä** lisää README/gitignore (ne on jo mukana)

### 3. Push koodi GitHubiin
```bash
# Projektin kansiossa:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SINUN-KAYTTAJATUNNUS/ruokavalio-app.git
git push -u origin main
```

### 4. Luo Railway-projekti
1. Mene https://railway.app → Sign in with GitHub
2. **New Project** → **Deploy from GitHub repo**
3. Valitse `ruokavalio-app`
4. Railway tunnistaa automaattisesti Node.js-projektin
5. Klikkaa **Deploy** → odota ~2 min

### 5. Hae domain
1. Railway-dashboardissa: **Settings** → **Domains**
2. **Generate Domain** → saat osoitteen muotoa `ruokavalio-app-production.up.railway.app`
3. Avaa se puhelimella!

### (Valinnainen) Lisää aloitusnäytölle
- **Android Chrome:** Kolme pistettä → "Lisää aloitusnäytölle"
- **iPhone Safari:** Jaa-nappi → "Lisää kotivalikkoon"

---

## Paikallinen kehitys

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Build tuotantoon

```bash
npm run build
npm start
```
