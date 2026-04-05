import { useState, useEffect, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const AAMIAISET = {
  A1: {
    nimi: "Kaurapuuro + rahka + banaani",
    makrot: { kcal: 535, p: 44, h: 57, r: 14 },
    ainekset: ["80 g kaurahiutaleita","200 g rasvaton rahka (Valio 0%)","1 iso banaani (~120 g)","20 g manteleja","1 tl kanelia"],
    ohje: "Keitä kaura 300 ml vedessä miedolla lämmöllä 5 min. Anna jäähtyä 3 min, sekoita rahka joukkoon. Lisää päälle banaani ja mantelit. Ripottele kanelia.",
  },
  A2: {
    nimi: "Munakokkeli + ruisleipä + avokado",
    makrot: { kcal: 510, p: 38, h: 38, r: 24 },
    ainekset: ["4 kananmunaa","2 viipaletta ruisleipää","½ avokado","2 tomaattia","Ripaus suolaa & mustapippuria","1 tl voita"],
    ohje: "Riko munat kulhoon, mausta. Paista voissa miedolla lämmöllä jatkuvasti sekoittaen. Levitä avokado leivälle, murskaa haarukalla. Tarjoile kokkelin ja tomaattien kanssa.",
  },
  A3: {
    nimi: "Proteiinipannukakut",
    makrot: { kcal: 525, p: 43, h: 55, r: 13 },
    ainekset: ["2 kananmunaa","100 g rasvaton rahka","60 g kaurahiutaleita (blenderöitynä)","1 tl leivinjauhetta","150 g pakastemarjoja","1 tl hunajaa"],
    ohje: "Sekoita munat, rahka, jauhoksi blenderöidyt kaurat ja leivinjauhe tasaiseksi. Paista pannulla 2 min/puoli. Lämmitä marjat mikrossa 90 sek kastikkeeksi. Valuta + hunaja päälle.",
  },
  A4: {
    nimi: "Skyr + mysli + marjat",
    makrot: { kcal: 490, p: 38, h: 60, r: 10 },
    ainekset: ["300 g skyr (luonnon)","50 g vähäsokerinen mysli","150 g marjoja","1 rkl chia-siemeniä"],
    ohje: "Kaada skyr kulhoon. Lisää mysli juuri ennen syömistä (säilyy rapeana). Kaada marjat päälle, ripottele chia-siemenet. Alle 2 min.",
  },
  A5: {
    nimi: "Munakas + kaurapuuro",
    makrot: { kcal: 515, p: 42, h: 52, r: 14 },
    ainekset: ["3 kananmunaa + 2 valkuaista","½ paprika (pilkottuna)","½ sipuli (pilkottuna)","60 g kaurahiutaleita","1 appelsiini"],
    ohje: "Keitä ensin kaura. Paista paprika ja sipuli 2 min, lisää vatkatut munat, kääntele kunnes kypsää. Tarjoile munakas + puuro + appelsiini.",
  },
  A6: {
    nimi: "Proteiinismoothie + kaura",
    makrot: { kcal: 530, p: 46, h: 52, r: 16 },
    ainekset: ["1 mitta (30 g) heraproteiinia","1 banaani","200 ml täysmaitoa tai kasvijuomaa","60 g kaurahiutaleita (puurona)","20 g saksanpähkinöitä"],
    ohje: "Blenderöi proteiinijauhe, banaani ja maito. Keitä kaura erikseen. Syö puuro ensin, juo smoothie sitten tai mukaan kuljettaen.",
  },
  A7: {
    nimi: "Overnight oats",
    makrot: { kcal: 505, p: 40, h: 58, r: 11 },
    ainekset: ["70 g kaurahiutaleita","200 g rasvaton rahka","150 ml kasvijuomaa","1 iso banaani","15 g auringonkukansiemeniä","1 tl kanelia"],
    ohje: "ILLALLA: Sekoita kaurat, rahka ja kasvijuoma purkissa. Jääkaappiin yöksi. AAMULLA: Lisää päälle banaani + siemenet. Nopein aamupala, ei keittämistä.",
  },
};

const LOUNAAT = {
  L1: {
    nimi: "Teriyaki-broileri + riisi + wokasvikset",
    makrot: { kcal: 605, p: 52, h: 62, r: 14 },
    ainekset: ["180 g broilerin rintafileetä","70 g riisiä (kuiva)","200 g wokasviksia (paprika, parsakaali, porkkana)","2 rkl soijakastiketta","1 tl hunajaa","1 tl seesamiöljyä","1 valkosipulinkynsi + inkivääriä"],
    ohje: "Keitä riisi. Sekoita soija+hunaja+valkosipuli+inkivääri marinadiksi. Paista broileri kuumalla pannulla 3–4 min/puoli, lisää marinadi lopussa. Wokaa kasvikset nopeasti kuumalla pannulla. Valuta seesamiöljy.",
  },
  L2: {
    nimi: "Paistettua lohta + peruna + parsakaali",
    makrot: { kcal: 590, p: 48, h: 52, r: 18 },
    ainekset: ["180 g lohifilee","200 g perunaa","200 g tuoretta parsakaalia","1 sitruuna","Tilliä","1 tl oliiviöljyä","Suolaa, pippuria"],
    ohje: "Keitä perunat. Höyrytä parsakaali 5 min. Paista lohi nahkapuoli alaspäin 4 min, käännä 2 min. Purista sitruunaa. Mausta tilli+suola+pippuri.",
  },
  L3: {
    nimi: "Bolognese-pasta",
    makrot: { kcal: 615, p: 50, h: 65, r: 16 },
    ainekset: ["150 g nauta-sikajauheliha (15%)","80 g täysjyväpastaa (kuiva)","200 g tomaattimurskaa","1 sipuli","2 valkosipulinkynttä","1 tl oliiviöljyä","Basilikaa, oreganoa, suolaa"],
    ohje: "Keitä pasta al dente. Paista sipuli+valkosipuli öljyssä 3 min. Lisää jauheliha, ruskista. Lisää tomaattimurska+mausteet, hauduta 15 min. Sekoita pastan joukkoon.",
  },
  L4: {
    nimi: "Tonnikalakulho + riisi + avokado",
    makrot: { kcal: 595, p: 52, h: 60, r: 14 },
    ainekset: ["2 tlk (260 g) tonnikala vedessä","70 g riisiä (kuiva)","½ avokado","1 kurkku","1 tomaatti","2 rkl soijakastiketta","½ limetin mehu"],
    ohje: "Keitä riisi. Valuta tonnikala. Pilko kasvikset. Kokoa kulhoon: riisi, tonnikala, kasvikset, avokado. Soija+lime kastikkeeksi päälle.",
  },
  L5: {
    nimi: "Kalkkuna + bataatti + parsakaali",
    makrot: { kcal: 590, p: 50, h: 60, r: 13 },
    ainekset: ["180 g kalkkunan rintafileetä","250 g bataattia","200 g parsakaalia","1 tl oliiviöljyä","1 tl savupaprikaa","Suolaa, pippuria"],
    ohje: "Kuutioi bataatti, uunita 200°C 25 min oliiviöljyssä+savupaprikassa. Paista kalkkuna pannulla 4–5 min/puoli. Höyrytä parsakaali. Loistava meal prep -lounas.",
  },
  L6: {
    nimi: "Kana-quinoa-salaatti",
    makrot: { kcal: 580, p: 50, h: 55, r: 16 },
    ainekset: ["160 g broilerin rintafileetä (grillattuna)","80 g quinoaa (kuiva)","50 g fetajuustoa","Rucolaa tai salaattia","Kirsikkatomaatteja","1 kurkku","1 rkl oliiviöljyä + sitruunamehu"],
    ohje: "Keitä quinoa 2× vedessä 15 min. Paista broileri, leikkaa siivuiksi. Kokoa: quinoa+rucola+tomaatit+kurkku+kana+feta. Kastike: oliiviöljy+sitruuna+suola.",
  },
  L7: {
    nimi: "Jauheliha + riisi + salaatti",
    makrot: { kcal: 595, p: 48, h: 62, r: 14 },
    ainekset: ["150 g naudan jauheliha (10%)","70 g riisiä (kuiva)","Salaattia, tomaattia, kurkkua, paprikaa","1 tl oliiviöljyä","Valkosipulijauhe, paprika, suola"],
    ohje: "Ruskista jauheliha pannulla, mausta. Keitä riisi. Kokoa: riisi+liha+tuore salaatti+oliiviöljy. Klassinen meal prep, 20 min.",
  },
};

const VALIPALAT = {
  V1: {
    nimi: "Rahka + banaani",
    makrot: { kcal: 300, p: 26, h: 45, r: 2 },
    ainekset: ["200 g rasvaton rahka","1 iso banaani"],
    ohje: "Syö banaani ensin (nopea glukoosi), sitten rahka. Nopein pre-workout välipala.",
  },
  V2: {
    nimi: "Riisikakut + maapähkinävoi + banaani",
    makrot: { kcal: 315, p: 12, h: 50, r: 10 },
    ainekset: ["3 riisikakkua","1 rkl luonnollinen maapähkinävoi","1 banaani"],
    ohje: "Levitä maapähkinävoi riisikakuille. Syö banaanin kanssa. Hyvä vaihtoehto jos vatsa ei siedä maitopohjaisia ennen treeniä.",
  },
  V3: {
    nimi: "Heraproteiinismoothie",
    makrot: { kcal: 320, p: 32, h: 43, r: 5 },
    ainekset: ["1 mitta (30 g) heraproteiinia","1 banaani","200 ml vettä tai kaurajuomaa","40 g kaurahiutaleita"],
    ohje: "Blenderöi kaikki. Juotava = ei rasita vatsa ennen treeniä. Kaura antaa pitkäkestoisen energian.",
  },
  R1: {
    nimi: "Pähkinät + hedelmä (lepopäivä)",
    makrot: { kcal: 220, p: 7, h: 25, r: 12 },
    ainekset: ["25 g sekapähkinöitä","1 omena tai appelsiini"],
    ohje: "Lepopäivän välipala. Pähkinät = hyvät rasvat + proteiini. Hedelmä = sopivat hiilihydraatit lepopäivän tarpeisiin.",
  },
};

const ILLALLISET = {
  I1: {
    nimi: "Uunilohta + bataatti + parsakaali",
    makrot: { kcal: 555, p: 45, h: 48, r: 20 },
    ainekset: ["200 g lohifilee","250 g bataattia","200 g parsakaolia","1 sitruuna","Tilliä, suolaa, pippuria"],
    ohje: "Uuni 200°C. Kuutioi bataatti, pane uuniin 20 min. Lisää lohi pellille 15 min kohdalla. Purista sitruunaa. Höyrytä parsakaali. Kypsenee itsekseen.",
  },
  I2: {
    nimi: "Broileri + riisi + tuoresalaatti",
    makrot: { kcal: 540, p: 48, h: 52, r: 12 },
    ainekset: ["200 g broilerin rintafileetä","70 g riisiä (kuiva)","Iso salaatti: rucola, tomaatti, kurkku","1 tl oliiviöljyä + sitruunamehu","Valkosipulijauhe, paprika, suola"],
    ohje: "Mausta broileri, paista 5–6 min/puoli tai uunissa 200°C 22 min. Keitä riisi. Tee salaatti kastikkeella. Broileri kannattaa tehdä isompi erä kerralla.",
  },
  I3: {
    nimi: "Naudanpaisti + peruna + juurekset",
    makrot: { kcal: 560, p: 46, h: 46, r: 20 },
    ainekset: ["200 g naudan sisäfileetä tai ulkofileetä","250 g perunaa","150 g juureksia (porkkana, lanttu)","1 tl oliiviöljyä","Rosmariinia, timjamia, suolaa, pippuria"],
    ohje: "Ota liha huoneenlämpöön 30 min. Kuutioi juurekset, keitä 15 min. Paista nauta pannulla öljyssä 3 min/puoli (medium). Lepuuta 5 min. Keitä perunat.",
  },
  I4: {
    nimi: "Katkarapu-riisi-wok",
    makrot: { kcal: 520, p: 42, h: 56, r: 10 },
    ainekset: ["250 g pakastettuja katkarapuja (sulat.)","70 g riisiä (kuiva)","200 g wokasviksia","2 rkl soijakastiketta","2 valkosipulinkynttä","Pala inkivääriä","1 tl seesamiöljyä"],
    ohje: "Keitä riisi. Paista valkosipuli+inkivääri 30 sek. Lisää katkaravut 2 min. Lisää kasvikset+soija, wokaa 3 min. Valuta seesamiöljy. Nopein illallinen.",
  },
  I5: {
    nimi: "Kalkkunamureke + bataatti",
    makrot: { kcal: 545, p: 47, h: 48, r: 15 },
    ainekset: ["200 g kalkkunan jauheliha","1 kananmuna","½ sipuli (raastettu)","1 valkosipulinkynsi","250 g bataattia","150 g kasviksia","Suolaa, pippuria, timjamia"],
    ohje: "Sekoita jauheliha+muna+sipuli+valkosipuli+mausteet. Muotoile pihveiksi. Uunita 200°C 20–25 min. Keitä bataatti + höyrytä kasvikset samaan aikaan.",
  },
  I6: {
    nimi: "Tonnikala-pasta",
    makrot: { kcal: 530, p: 45, h: 56, r: 12 },
    ainekset: ["2 tlk (260 g) tonnikala vedessä","80 g täysjyväpastaa (kuiva)","200 g tomaattimurskaa","1 rkl kapriksia","10 oliivia","2 valkosipulinkynttä","1 tl oliiviöljyä, oreganoa"],
    ohje: "Keitä pasta. Paista valkosipuli öljyssä, lisää tomaattimurska+kaprikset+oliivit, hauduta 10 min. Lisää valuttu tonnikala. Sekoita pastan joukkoon.",
  },
  I7: {
    nimi: "Jauheliha + peruna + smetanakastike",
    makrot: { kcal: 555, p: 46, h: 50, r: 18 },
    ainekset: ["180 g nauta-sikajauheliha (15%)","250 g perunaa","150 g kasviksia (parsakaali, sipuli)","2 rkl smetanaa","Paprika, valkosipuli, suola"],
    ohje: "Keitä perunat. Ruskista jauheliha, mausta. Paista kasvikset liharasvoissa. Sekoita smetana joukkoon lämmöltä ottamisen jälkeen. Tarjoile perunoiden kanssa.",
  },
};

const YOPALAT = {
  Y1: {
    nimi: "Rahka + pähkinävoi + marjat",
    makrot: { kcal: 380, p: 40, h: 18, r: 18 },
    ainekset: ["400 g rasvaton rahka","1 rkl mantelivoita tai maapähkinävoita","100 g marjoja"],
    ohje: "Rahka = kaseiiniproteiinia → hajoaa hitaasti yön aikana. Ihanteellinen 30 min ennen nukkumaanmenoa. Pähkinävoi = hyvät rasvat + kcal. Marjat = antioksidantit.",
  },
  Y2: {
    nimi: "Skyr + kaakao + mantelit",
    makrot: { kcal: 365, p: 38, h: 22, r: 14 },
    ainekset: ["350 g skyr (luonnon)","1 tl tummaa kaakaota","20 g manteleja","1 tl hunajaa (valinnainen)"],
    ohje: "Sekoita kaakao skyrin joukkoon. Lisää mantelit päälle. Tumma kaakao sisältää magnesiumia joka tukee palautumista ja unen laatua.",
  },
  Y3: {
    nimi: "Rahka + heraproteiini + marjat",
    makrot: { kcal: 375, p: 45, h: 15, r: 14 },
    ainekset: ["300 g rasvaton rahka","15 g heraproteiinia (½ mitta)","100 g marjoja"],
    ohje: "Sekoita proteiinijauhe rahkaan tasaiseksi. Lisää marjat. Hera (nopea) + kaseiini (hidas) = pitkäkestoinen aminohappoprofiili koko yölle.",
  },
};

const ALL_MEALS = { ...AAMIAISET, ...LOUNAAT, ...VALIPALAT, ...ILLALLISET, ...YOPALAT };

const WEEKS = [
  [
    { pv: "Maanantai", tyyppi: "gym",    b:"A1",l:"L1",v:"V1",i:"I1",y:"Y1" },
    { pv: "Tiistai",   tyyppi: "gym",    b:"A2",l:"L2",v:"V2",i:"I2",y:"Y2" },
    { pv: "Keskiviikko",tyyppi:"gym",    b:"A3",l:"L3",v:"V3",i:"I3",y:"Y3" },
    { pv: "Torstai",   tyyppi: "futsal", b:"A4",l:"L4",v:"V1",i:"I4",y:"Y1" },
    { pv: "Perjantai", tyyppi: "gym",    b:"A5",l:"L5",v:"V2",i:"I5",y:"Y2" },
    { pv: "Lauantai",  tyyppi: "gym",    b:"A6",l:"L6",v:"V3",i:"I6",y:"Y3" },
    { pv: "Sunnuntai", tyyppi: "rest",   b:"A7",l:"L7",v:"R1",i:"I7",y:"Y1" },
  ],
  [
    { pv: "Maanantai", tyyppi: "gym",    b:"A3",l:"L2",v:"V2",i:"I5",y:"Y2" },
    { pv: "Tiistai",   tyyppi: "gym",    b:"A1",l:"L5",v:"V3",i:"I2",y:"Y3" },
    { pv: "Keskiviikko",tyyppi:"gym",    b:"A5",l:"L1",v:"V1",i:"I6",y:"Y1" },
    { pv: "Torstai",   tyyppi: "futsal", b:"A6",l:"L3",v:"V2",i:"I3",y:"Y2" },
    { pv: "Perjantai", tyyppi: "gym",    b:"A2",l:"L4",v:"V3",i:"I1",y:"Y3" },
    { pv: "Lauantai",  tyyppi: "gym",    b:"A7",l:"L6",v:"V1",i:"I4",y:"Y1" },
    { pv: "Sunnuntai", tyyppi: "rest",   b:"A4",l:"L7",v:"R1",i:"I7",y:"Y3" },
  ],
  [
    { pv: "Maanantai", tyyppi: "gym",    b:"A5",l:"L3",v:"V3",i:"I3",y:"Y3" },
    { pv: "Tiistai",   tyyppi: "gym",    b:"A3",l:"L6",v:"V1",i:"I5",y:"Y1" },
    { pv: "Keskiviikko",tyyppi:"gym",    b:"A1",l:"L2",v:"V2",i:"I2",y:"Y2" },
    { pv: "Torstai",   tyyppi: "futsal", b:"A7",l:"L4",v:"V3",i:"I4",y:"Y3" },
    { pv: "Perjantai", tyyppi: "gym",    b:"A4",l:"L1",v:"V1",i:"I1",y:"Y1" },
    { pv: "Lauantai",  tyyppi: "gym",    b:"A6",l:"L5",v:"V2",i:"I6",y:"Y2" },
    { pv: "Sunnuntai", tyyppi: "rest",   b:"A2",l:"L7",v:"R1",i:"I7",y:"Y2" },
  ],
];

const TYPE_CFG = {
  gym:    { color: "#10b981", bg: "#052e16", label: "💪 Salipäivä" },
  futsal: { color: "#f59e0b", bg: "#451a03", label: "⚽ Futsal" },
  rest:   { color: "#64748b", bg: "#0f172a", label: "😴 Lepopäivä" },
};

const SLOTS = [
  { key: "b", label: "Aamiainen", time: "07:30", icon: "🌅" },
  { key: "l", label: "Lounas",    time: "12:00", icon: "🍱" },
  { key: "v", label: "Välipala",  time: "15:30", icon: "⚡" },
  { key: "i", label: "Illallinen",time: "18:30", icon: "🍽️" },
  { key: "y", label: "Yöpala",   time: "21:00", icon: "🌙" },
];

// ─── STORAGE ─────────────────────────────────────────────────────────────────

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function storageKey(date, week, dayIdx, slot) {
  return `rv_${date}_w${week}_d${dayIdx}_${slot}`;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function MacroTag({ label, value, color }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, fontSize:12 }}>
      <span style={{ color, fontWeight:700 }}>{label}</span>
      <span style={{ color:"#d1d5db" }}>{value}g</span>
    </span>
  );
}

function MealCard({ slotKey, mealCode, dayType, week, dayIdx, dateKey }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(() => {
    try { return localStorage.getItem(storageKey(dateKey, week, dayIdx, slotKey)) === "1"; }
    catch { return false; }
  });

  const meal = ALL_MEALS[mealCode];
  if (!meal) return null;
  const slot = SLOTS.find(s => s.key === slotKey);
  const m = meal.makrot;
  const tc = TYPE_CFG[dayType];

  const toggleDone = (e) => {
    e.stopPropagation();
    const next = !done;
    setDone(next);
    try { localStorage.setItem(storageKey(dateKey, week, dayIdx, slotKey), next ? "1" : "0"); }
    catch {}
  };

  return (
    <div style={{
      background: done ? "#0a0f1a" : "#0f172a",
      border: `1px solid ${done ? tc.color + "66" : "#1e293b"}`,
      borderRadius: 16,
      marginBottom: 10,
      overflow: "hidden",
      opacity: done ? 0.75 : 1,
      transition: "all 0.2s",
    }}>
      <div
        style={{ padding: "14px 16px", cursor: "pointer" }}
        onClick={() => setOpen(o => !o)}
      >
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:10, flex:1, minWidth:0 }}>
            {/* Checkbox */}
            <button
              onClick={toggleDone}
              style={{
                width:24, height:24, borderRadius:7, flexShrink:0, marginTop:2,
                border: `2px solid ${done ? tc.color : "#374151"}`,
                background: done ? tc.color : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all 0.15s",
              }}
            >
              {done && <span style={{ color:"#fff", fontSize:13, fontWeight:900, lineHeight:1 }}>✓</span>}
            </button>
            <div style={{ minWidth:0 }}>
              <div style={{ color:"#6b7280", fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>
                {slot?.time} · {slot?.label}
              </div>
              <div style={{
                color: done ? "#6b7280" : "#f3f4f6",
                fontSize:15, fontWeight:700, marginTop:2,
                textDecoration: done ? "line-through" : "none",
              }}>
                {slot?.icon} {meal.nimi}
              </div>
              <div style={{ display:"flex", gap:10, marginTop:6, flexWrap:"wrap" }}>
                <MacroTag label="P" value={m.p} color="#10b981" />
                <MacroTag label="H" value={m.h} color="#3b82f6" />
                <MacroTag label="R" value={m.r} color="#f59e0b" />
                <span style={{ color:"#4b5563", fontSize:12 }}>·</span>
                <span style={{ color:"#6b7280", fontSize:12 }}>{m.kcal} kcal</span>
              </div>
            </div>
          </div>
          <span style={{ color:"#374151", fontSize:16, flexShrink:0 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {open && (
        <div style={{ padding:"0 16px 16px", borderTop:"1px solid #1e293b" }}>
          <div style={{ paddingTop:12 }}>
            <div style={{ color:"#6b7280", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>Ainekset</div>
            <ul style={{ marginBottom:14 }}>
              {meal.ainekset.map((a,i) => (
                <li key={i} style={{ display:"flex", gap:8, marginBottom:4 }}>
                  <span style={{ color: tc.color, flexShrink:0, marginTop:2 }}>•</span>
                  <span style={{ color:"#d1d5db", fontSize:13 }}>{a}</span>
                </li>
              ))}
            </ul>
            <div style={{ color:"#6b7280", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>Valmistusohje</div>
            <p style={{ color:"#9ca3af", fontSize:13, lineHeight:1.6 }}>{meal.ohje}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DayView({ day, week, dayIdx }) {
  const dateKey = getToday();
  const tc = TYPE_CFG[day.tyyppi];

  const [doneCount, setDoneCount] = useState(() => {
    let c = 0;
    SLOTS.forEach(s => {
      try { if (localStorage.getItem(storageKey(dateKey, week, dayIdx, s.key)) === "1") c++; }
      catch {}
    });
    return c;
  });

  // Recount on render
  useEffect(() => {
    let c = 0;
    SLOTS.forEach(s => {
      try { if (localStorage.getItem(storageKey(dateKey, week, dayIdx, s.key)) === "1") c++; }
      catch {}
    });
    setDoneCount(c);
  });

  const totals = SLOTS.reduce((acc, s) => {
    const m = ALL_MEALS[day[s.key]];
    if (!m) return acc;
    return { kcal: acc.kcal+m.makrot.kcal, p: acc.p+m.makrot.p, h: acc.h+m.makrot.h, r: acc.r+m.makrot.r };
  }, { kcal:0, p:0, h:0, r:0 });

  return (
    <div>
      {/* Summary card */}
      <div style={{
        background:"#0a0f1a",
        border:`1px solid ${tc.color}33`,
        borderRadius:18,
        padding:16,
        marginBottom:14,
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
          <div>
            <div style={{ color:"#6b7280", fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:700 }}>
              Päivän tavoite
            </div>
            <div style={{ color:"#f9fafb", fontSize:24, fontWeight:900, marginTop:2 }}>
              {totals.kcal} <span style={{ color:"#6b7280", fontSize:14, fontWeight:400 }}>kcal</span>
            </div>
          </div>
          <span style={{
            background: tc.color,
            color:"#fff",
            fontSize:11,
            fontWeight:700,
            padding:"5px 10px",
            borderRadius:20,
          }}>{tc.label}</span>
        </div>

        {/* Progress */}
        <div style={{ marginBottom:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ color:"#6b7280", fontSize:11 }}>Ateriat syöty</span>
            <span style={{ color: tc.color, fontSize:11, fontWeight:700 }}>{doneCount}/5</span>
          </div>
          <div style={{ height:6, background:"#1e293b", borderRadius:99 }}>
            <div style={{ height:6, background: tc.color, borderRadius:99, width:`${(doneCount/5)*100}%`, transition:"width 0.3s" }} />
          </div>
        </div>

        {/* Macros */}
        {[
          { label:"Proteiini", val:totals.p, max:230, color:"#10b981" },
          { label:"Hiilihydraatit", val:totals.h, max:280, color:"#3b82f6" },
          { label:"Rasva", val:totals.r, max:120, color:"#f59e0b" },
        ].map(({ label, val, max, color }) => (
          <div key={label} style={{ marginBottom:6 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
              <span style={{ color:"#6b7280", fontSize:11 }}>{label}</span>
              <span style={{ color:"#e5e7eb", fontSize:11, fontWeight:700 }}>{val}g</span>
            </div>
            <div style={{ height:4, background:"#1e293b", borderRadius:99 }}>
              <div style={{ height:4, background:color, borderRadius:99, width:`${Math.min((val/max)*100,100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Meal cards */}
      {SLOTS.map(slot => (
        <MealCard
          key={slot.key}
          slotKey={slot.key}
          mealCode={day[slot.key]}
          dayType={day.tyyppi}
          week={week}
          dayIdx={dayIdx}
          dateKey={dateKey}
        />
      ))}

      {/* Day note */}
      {day.tyyppi === "futsal" && (
        <div style={{ background:"#451a03", border:"1px solid #92400e", borderRadius:12, padding:12, marginTop:4 }}>
          <p style={{ color:"#fcd34d", fontSize:13 }}>⚽ <strong>Futsal-päivä:</strong> Välipala n. 60–90 min ennen peliä. Lisää tarvittaessa +1 banaani pelipäivänä.</p>
        </div>
      )}
      {day.tyyppi === "rest" && (
        <div style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:12, padding:12, marginTop:4 }}>
          <p style={{ color:"#94a3b8", fontSize:13 }}>😴 <strong>Lepopäivä:</strong> Vähemmän hiilareita, sama proteiini. Välipala on pähkinöitä + hedelmä.</p>
        </div>
      )}

      {/* Supplements */}
      <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:16, marginTop:12 }}>
        <div style={{ color:"#6b7280", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>
          💊 Päivittäiset lisäravinteet
        </div>
        {[
          { name:"Kreatiini", dose:"5 g", when:"milloin vain" },
          { name:"D-vitamiini", dose:"75 µg", when:"aamulla ruoan kanssa" },
          { name:"Omega-3", dose:"2–3 g EPA+DHA", when:"ruoan kanssa" },
        ].map(s => (
          <div key={s.name} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
            <span style={{ color:"#d1d5db", fontSize:13 }}>{s.name}</span>
            <div>
              <span style={{ color:"#10b981", fontSize:13, fontWeight:700 }}>{s.dose}</span>
              <span style={{ color:"#4b5563", fontSize:11, marginLeft:6 }}>({s.when})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

const DAY_ABR = ["Ma","Ti","Ke","To","Pe","La","Su"];

export default function App() {
  const [week, setWeek] = useState(0);
  const [dayIdx, setDayIdx] = useState(() => {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1; // Mon=0 ... Sun=6
  });

  const day = WEEKS[week][dayIdx];
  const tc = TYPE_CFG[day.tyyppi];

  return (
    <div style={{
      minHeight:"100vh",
      background:"#030712",
      fontFamily:"'DM Sans','Helvetica Neue',sans-serif",
      color:"#f3f4f6",
      maxWidth:480,
      margin:"0 auto",
      paddingBottom:40,
    }}>
      {/* HEADER */}
      <div style={{
        background:"linear-gradient(180deg,#0f172a 0%,#030712 100%)",
        padding:"env(safe-area-inset-top, 20px) 20px 0",
        borderBottom:"1px solid #111827",
        position:"sticky",
        top:0,
        zIndex:10,
      }}>
        <div style={{ paddingTop: 16 }}>
          <div style={{ fontSize:10, color:"#6b7280", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:700 }}>
            Rekompositio-ohjelma
          </div>
          <h1 style={{ fontSize:24, fontWeight:900, color:"#f9fafb", marginTop:2, marginBottom:14 }}>
            Ruokavalio
          </h1>

          {/* Week tabs */}
          <div style={{ display:"flex", gap:6, marginBottom:12 }}>
            {["Viikko 1","Viikko 2","Viikko 3"].map((w,i) => (
              <button key={i} onClick={() => setWeek(i)} style={{
                flex:1, padding:"8px 0", borderRadius:10, fontSize:12, fontWeight:700,
                background: week===i ? "#10b981" : "#111827",
                color: week===i ? "#fff" : "#6b7280",
                transition:"all 0.2s",
              }}>{w}</button>
            ))}
          </div>

          {/* Day tabs */}
          <div style={{ display:"flex", gap:2 }}>
            {WEEKS[week].map((d,i) => {
              const dtc = TYPE_CFG[d.tyyppi];
              const active = i===dayIdx;
              return (
                <button key={i} onClick={() => setDayIdx(i)} style={{
                  flex:1, paddingTop:8, paddingBottom: active ? 12 : 8,
                  borderRadius:"8px 8px 0 0",
                  fontSize:11, fontWeight: active ? 800 : 500,
                  background: active ? "#0f172a" : "transparent",
                  color: active ? "#f9fafb" : "#4b5563",
                  transition:"all 0.15s",
                }}>
                  {DAY_ABR[i]}
                  <div style={{
                    width:5, height:5, borderRadius:"50%",
                    background: dtc.color,
                    margin:"4px auto 0",
                    opacity: active ? 1 : 0.4,
                  }}/>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding:"16px 16px 0" }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:"#f9fafb", marginBottom:12 }}>
          {day.pv}
        </h2>
        <DayView day={day} week={week} dayIdx={dayIdx} />
      </div>
    </div>
  );
}
