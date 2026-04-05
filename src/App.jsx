import { useState, useEffect } from "react";

const MEAL_PREP_WEEKS = {
  0: {
    teema: "🍗 Broileri + Riisi",
    prepOhje: [
      "1,2 kg broilerin rintafileetä → paista uunissa 200°C 22 min, jäähdytä, jaa annoksiin (180–200 g)",
      "500 g riisiä (kuiva) → keitä, jaa 7 annokseen (~200 g keitetty/annos)",
      "Overnight oats: tee 3 purkkia kerralla (kaurat+rahka+kaurajuoma) — riittää 3 päiväksi",
      "Kasvikset: pilko paprika, kurkku, parsakaali valmiiksi viikon tarpeisiin",
    ],
    aamiaiset: {
      A: {
        nimi: "Overnight oats",
        makrot: { kcal: 505, p: 40, h: 58, r: 11 },
        ainekset: ["70 g kaurahiutaleita","200 g rasvaton rahka","150 ml kaurajuomaa","1 banaani","15 g auringonkukansiemeniä"],
        ohje: "ILLALLA (tee 2–3 purkkia kerralla): Sekoita kaurat+rahka+kaurajuoma purkkiin. Jääkaappiin yöksi. AAMULLA: Lisää banaani+siemenet päälle. 0 min aamurutiinia.",
      },
      B: {
        nimi: "Kaurapuuro + rahka + banaani",
        makrot: { kcal: 535, p: 44, h: 57, r: 14 },
        ainekset: ["80 g kaurahiutaleita","200 g rasvaton rahka","1 banaani","20 g manteleja","1 tl kanelia"],
        ohje: "Keitä kaura 5 min. Sekoita rahka joukkoon (lisää kremaa ja proteiinia). Päälle banaani, mantelit, kaneli. Nopea vaihtoehto overnight oatsille.",
      },
    },
    lounaat: {
      L1: {
        nimi: "Teriyaki-broilerikulho",
        makrot: { kcal: 595, p: 52, h: 62, r: 12 },
        ainekset: ["180 g esivalmistettua broileria (prep)","200 g keitettyä riisiä (prep)","200 g pilkottuja kasviksia (prep)","2 rkl soijakastiketta","1 tl hunajaa","1 tl seesamiöljyä"],
        ohje: "Lämmitä broileri+riisi mikrossa 2 min. Sekoita soija+hunaja kastikkeeksi. Kaada päälle. Valuta seesamiöljy. VALMIS 3 minuutissa.",
      },
      L2: {
        nimi: "Sitruuna-valkosipulibroileri + riisi",
        makrot: { kcal: 580, p: 51, h: 60, r: 12 },
        ainekset: ["180 g esivalmistettua broileria (prep)","200 g keitettyä riisiä (prep)","200 g kasviksia (prep)","½ sitruunan mehu","1 tl oliiviöljyä","Valkosipulijauhetta, persiljaa"],
        ohje: "Lämmitä broileri+riisi mikrossa 2 min. Sekoita sitruuna+oliiviöljy+valkosipulijauhe kastikkeeksi. Pirskottele päälle. VALMIS 3 minuutissa.",
      },
    },
    illalliset: {
      I1: {
        nimi: "Uunilohta + bataatti + parsakaali",
        makrot: { kcal: 555, p: 45, h: 48, r: 20 },
        ainekset: ["200 g lohifilee","250 g bataattia","200 g parsakaalia","1 sitruuna","Tilliä, suolaa, pippuria"],
        ohje: "Uuni 200°C. Kuutioi bataatti pellille, 20 min. Lisää lohi 15 min kohdalla. Höyrytä parsakaali. Purista sitruunaa päälle. Kypsenee itsekseen 20 min.",
      },
      I2: {
        nimi: "Broileri + riisi + kasvikset (nopea)",
        makrot: { kcal: 540, p: 48, h: 52, r: 12 },
        ainekset: ["200 g esivalmistettua broileria (prep)","200 g keitettyä riisiä (prep)","Iso tuoresalaatti","1 tl oliiviöljyä + sitruunamehu"],
        ohje: "Lämmitä broileri+riisi mikrossa. Tee pikasalaatti. 5 min illallinen — prep-viikon nopein illallinen. Hyvä vaihtoehto kun ei jaksa kokata.",
      },
    },
  },
  1: {
    teema: "🦃 Kalkkuna + Bataatti",
    prepOhje: [
      "1,2 kg kalkkunan jauhelihaa → ruskista pannulla mausteilla (paprika, valkosipuli, suola), jaa annoksiin",
      "1,5 kg bataattia → kuutioi, uunita 200°C 25 min oliiviöljyssä, jaa annoksiin",
      "Skyr-aamiaiset: laita 3 purkkia (skyr+chia) valmiiksi, mysli erikseen rapeana",
      "Kasvikset: parsakaali, paprika, pinaatti valmiiksi pilkottuna",
    ],
    aamiaiset: {
      A: {
        nimi: "Skyr + mysli + marjat",
        makrot: { kcal: 490, p: 38, h: 60, r: 10 },
        ainekset: ["300 g skyr (luonnon)","50 g vähäsokerinen mysli","150 g marjoja","1 rkl chia-siemeniä"],
        ohje: "PREP: Laita skyr+chia valmiiksi purkkeihin. Mysli erikseen (pysyy rapeana). AAMULLA: Kaada mysli+marjat päälle. Alle 1 min.",
      },
      B: {
        nimi: "Munakokkeli + ruisleipä + avokado",
        makrot: { kcal: 510, p: 38, h: 38, r: 24 },
        ainekset: ["4 kananmunaa","2 viipaletta ruisleipää","½ avokado","2 tomaattia","1 tl voita"],
        ohje: "Paista munat voissa miedolla lämmöllä, mausta. Murskaa avokado leivälle. Tarjoile tomaattien kanssa. Sopii vaihteluksi skyrin rinnalle.",
      },
    },
    lounaat: {
      L1: {
        nimi: "Kalkkunakulho + bataatti + pinaatti",
        makrot: { kcal: 590, p: 50, h: 58, r: 14 },
        ainekset: ["180 g esivalmistettua kalkkunajauhelihaa (prep)","200 g uunitettua bataattia (prep)","Kourallinen pinaattia tai salaattia","2 rkl soijakastiketta","½ limen mehu"],
        ohje: "Lämmitä kalkkuna+bataatti mikrossa 2 min. Lisää tuore pinaatti. Soija+lime kastikkeeksi. VALMIS 3 minuutissa.",
      },
      L2: {
        nimi: "Tonnikalakulho + riisi + avokado",
        makrot: { kcal: 595, p: 52, h: 60, r: 14 },
        ainekset: ["2 tlk (260 g) tonnikala vedessä","70 g riisiä (kuiva — keitä erikseen)","½ avokado","1 kurkku","1 tomaatti","2 rkl soijakastiketta"],
        ohje: "Ainoa lounas jossa keität riisin erikseen (12 min). Valuta tonnikala, kokoa kulho. Ei lämmitystä tarvita — nopea vaihtoehto.",
      },
    },
    illalliset: {
      I1: {
        nimi: "Kalkkunapihvit + bataatti + parsakaali",
        makrot: { kcal: 545, p: 47, h: 48, r: 15 },
        ainekset: ["200 g esivalmistettua kalkkunajauhelihaa (prep)","250 g uunitettua bataattia (prep)","150 g parsakaalia","Timjamia, suolaa, pippuria"],
        ohje: "Muotoile prep-jauhelihasta pihvejä, kuumenna pannulla 2–3 min/puoli. Lämmitä bataatti mikrossa. Höyrytä parsakaali. VALMIS 10 min.",
      },
      I2: {
        nimi: "Katkarapu-wok + bataatti",
        makrot: { kcal: 520, p: 42, h: 50, r: 12 },
        ainekset: ["250 g pakastettuja katkarapuja (sulata mikrossa)","200 g uunitettua bataattia (prep)","200 g wokasviksia","2 rkl soijakastiketta","2 valkosipulinkynttä","1 tl seesamiöljyä"],
        ohje: "Paista valkosipuli kuumalla pannulla 30 sek. Lisää katkaravut+kasvikset 3 min. Soija päälle. Lämmitä bataatti mikrossa erikseen. Seesamiöljy viimeisenä.",
      },
    },
  },
  2: {
    teema: "🥩 Nauta + Peruna",
    prepOhje: [
      "800 g naudan jauhelihaa → ruskista mausteilla (paprika, valkosipuli, suola, pippuri), jaa annoksiin",
      "1,5 kg perunaa → keitä isossa kattilassa, jaa annoksiin (säilyy 4 pv jääkaapissa)",
      "Overnight oats: tee 3 purkkia sunnuntaina — riittää ma/ke/pe",
      "Kasvikset: pilko juureksia ja parsakaalia valmiiksi",
    ],
    aamiaiset: {
      A: {
        nimi: "Overnight oats (proteiinivariantti)",
        makrot: { kcal: 505, p: 40, h: 58, r: 11 },
        ainekset: ["70 g kaurahiutaleita","200 g rasvaton rahka","150 ml kaurajuomaa","1 banaani","15 g auringonkukansiemeniä","1 tl kanelia"],
        ohje: "ILLALLA (tee 2–3 purkkia kerralla): Sekoita kaurat+rahka+kaurajuoma purkkiin. Jääkaappiin. AAMULLA: Banaani+siemenet päälle. 0 min aamurutiinia.",
      },
      B: {
        nimi: "Proteiinipannukakut",
        makrot: { kcal: 525, p: 43, h: 55, r: 13 },
        ainekset: ["2 kananmunaa","100 g rasvaton rahka","60 g kaurahiutaleita (blenderöitynä)","1 tl leivinjauhetta","150 g pakastemarjoja","1 tl hunajaa"],
        ohje: "Sekoita munat+rahka+blenderöidyt kaurat+leivinjauhe. Paista 2 min/puoli. Marjat mikrossa 90 sek kastikkeeksi. Sopii viikonloppuaamuihin.",
      },
    },
    lounaat: {
      L1: {
        nimi: "Bolognese-pasta",
        makrot: { kcal: 615, p: 50, h: 65, r: 16 },
        ainekset: ["150 g esivalmistettua naudan jauhelihaa (prep)","80 g täysjyväpastaa (kuiva)","200 g tomaattimurskaa","1 sipuli","2 valkosipulinkynttä","Basilikaa, oreganoa"],
        ohje: "Keitä pasta (12 min). Lämmitä jauheliha+sipuli+tomaattimurska+mausteet kattilassa 8 min. Yhdistä. Prep tekee tästä 20 min lounaasta 15 min.",
      },
      L2: {
        nimi: "Jauhelihakulho + peruna + salaatti",
        makrot: { kcal: 585, p: 48, h: 58, r: 14 },
        ainekset: ["150 g esivalmistettua naudan jauhelihaa (prep)","250 g keitettyä perunaa (prep)","Iso tuoresalaatti","1 tl oliiviöljyä"],
        ohje: "Lämmitä jauheliha+peruna mikrossa 2 min. Kokoa salaatti. VALMIS 3 minuutissa. Klassisin meal prep -lounas.",
      },
    },
    illalliset: {
      I1: {
        nimi: "Naudanpaisti + peruna + juurekset",
        makrot: { kcal: 560, p: 46, h: 46, r: 20 },
        ainekset: ["200 g naudan sisä- tai ulkofileetä","250 g keitettyä perunaa (prep)","150 g juureksia (porkkana, lanttu)","Rosmariinia, timjamia","1 tl oliiviöljyä"],
        ohje: "Ota file huoneenlämpöön 30 min. Paista pannulla öljyssä 3 min/puoli (medium). Lepuuta 5 min. Lämmitä peruna+juurekset mikrossa. Viikon laadukkain illallinen.",
      },
      I2: {
        nimi: "Jauhelihapihvit + peruna + smetana",
        makrot: { kcal: 545, p: 46, h: 48, r: 18 },
        ainekset: ["180 g esivalmistettua naudan jauhelihaa (prep)","250 g keitettyä perunaa (prep)","150 g parsakaalia","2 rkl smetanaa tai kreikkalainen jogurtti"],
        ohje: "Muotoile prep-jauhelihasta pihvejä, kuumenna pannulla 2 min/puoli. Lämmitä peruna. Höyrytä parsakaali. Smetana kastikkeeksi lämmöltä ottamisen jälkeen.",
      },
    },
  },
};

const VALIPALAT = {
  V1: {
    nimi: "Rahka + banaani",
    makrot: { kcal: 300, p: 26, h: 45, r: 2 },
    ainekset: ["200 g rasvaton rahka","1 iso banaani"],
    ohje: "Banaani ensin (nopea glukoosi), sitten rahka. Nopein pre-workout välipala.",
  },
  V2: {
    nimi: "Riisikakut + maapähkinävoi + banaani",
    makrot: { kcal: 315, p: 12, h: 50, r: 10 },
    ainekset: ["3 riisikakkua","1 rkl luonnollinen maapähkinävoi","1 banaani"],
    ohje: "Levitä maapähkinävoi riisikakuille. Syö banaanin kanssa. Hyvä jos vatsa ei siedä maitopohjaisia ennen treeniä.",
  },
  V3: {
    nimi: "Heraproteiinismoothie",
    makrot: { kcal: 320, p: 32, h: 43, r: 5 },
    ainekset: ["1 mitta (30 g) heraproteiinia","1 banaani","200 ml kaurajuomaa","40 g kaurahiutaleita"],
    ohje: "Blenderöi kaikki. Juotava = ei rasita vatsaa ennen treeniä. Kaura antaa pitkäkestoisen energian.",
  },
  R1: {
    nimi: "Pähkinät + hedelmä (lepopäivä)",
    makrot: { kcal: 220, p: 7, h: 25, r: 12 },
    ainekset: ["25 g sekapähkinöitä","1 omena tai appelsiini"],
    ohje: "Lepopäivän välipala — hyvät rasvat + sopivat hiilihydraatit matalammalle aktiivisuudelle.",
  },
};

const YOPALAT = {
  Y1: {
    nimi: "Rahka + pähkinävoi + marjat",
    makrot: { kcal: 380, p: 40, h: 18, r: 18 },
    ainekset: ["400 g rasvaton rahka","1 rkl mantelivoita tai maapähkinävoita","100 g marjoja"],
    ohje: "Kaseiini hajoaa hitaasti yön aikana → lihasproteiinisynteesi koko yön. 30 min ennen nukkumaanmenoa.",
  },
  Y2: {
    nimi: "Skyr + kaakao + mantelit",
    makrot: { kcal: 365, p: 38, h: 22, r: 14 },
    ainekset: ["350 g skyr","1 tl tummaa kaakaota","20 g manteleja","1 tl hunajaa"],
    ohje: "Sekoita kaakao skyrin joukkoon. Tumma kaakao sisältää magnesiumia — tukee palautumista ja unen laatua.",
  },
  Y3: {
    nimi: "Rahka + heraproteiini + marjat",
    makrot: { kcal: 375, p: 45, h: 15, r: 14 },
    ainekset: ["300 g rasvaton rahka","15 g heraproteiinia (½ mitta)","100 g marjoja"],
    ohje: "Hera (nopea) + kaseiini (hidas) = pitkäkestoinen aminohappoprofiili koko yölle.",
  },
};

const WEEKS = [
  [
    { pv:"Maanantai",   tyyppi:"gym",    b:"A",l:"L1",v:"V1",i:"I1",y:"Y1" },
    { pv:"Tiistai",     tyyppi:"gym",    b:"B",l:"L2",v:"V2",i:"I2",y:"Y2" },
    { pv:"Keskiviikko", tyyppi:"gym",    b:"A",l:"L1",v:"V3",i:"I1",y:"Y3" },
    { pv:"Torstai",     tyyppi:"futsal", b:"B",l:"L2",v:"V1",i:"I2",y:"Y1" },
    { pv:"Perjantai",   tyyppi:"gym",    b:"A",l:"L1",v:"V2",i:"I1",y:"Y2" },
    { pv:"Lauantai",    tyyppi:"gym",    b:"B",l:"L2",v:"V3",i:"I2",y:"Y3" },
    { pv:"Sunnuntai",   tyyppi:"rest",   b:"A",l:"L1",v:"R1",i:"I1",y:"Y1" },
  ],
  [
    { pv:"Maanantai",   tyyppi:"gym",    b:"A",l:"L1",v:"V1",i:"I1",y:"Y2" },
    { pv:"Tiistai",     tyyppi:"gym",    b:"B",l:"L2",v:"V2",i:"I2",y:"Y3" },
    { pv:"Keskiviikko", tyyppi:"gym",    b:"A",l:"L1",v:"V3",i:"I1",y:"Y1" },
    { pv:"Torstai",     tyyppi:"futsal", b:"B",l:"L2",v:"V1",i:"I2",y:"Y2" },
    { pv:"Perjantai",   tyyppi:"gym",    b:"A",l:"L1",v:"V2",i:"I1",y:"Y3" },
    { pv:"Lauantai",    tyyppi:"gym",    b:"B",l:"L2",v:"V3",i:"I2",y:"Y1" },
    { pv:"Sunnuntai",   tyyppi:"rest",   b:"A",l:"L1",v:"R1",i:"I1",y:"Y2" },
  ],
  [
    { pv:"Maanantai",   tyyppi:"gym",    b:"A",l:"L1",v:"V1",i:"I1",y:"Y3" },
    { pv:"Tiistai",     tyyppi:"gym",    b:"B",l:"L2",v:"V2",i:"I2",y:"Y1" },
    { pv:"Keskiviikko", tyyppi:"gym",    b:"A",l:"L1",v:"V3",i:"I1",y:"Y2" },
    { pv:"Torstai",     tyyppi:"futsal", b:"B",l:"L2",v:"V1",i:"I2",y:"Y3" },
    { pv:"Perjantai",   tyyppi:"gym",    b:"A",l:"L1",v:"V2",i:"I1",y:"Y1" },
    { pv:"Lauantai",    tyyppi:"gym",    b:"B",l:"L2",v:"V3",i:"I2",y:"Y2" },
    { pv:"Sunnuntai",   tyyppi:"rest",   b:"A",l:"L1",v:"R1",i:"I1",y:"Y3" },
  ],
];

const TYPE_CFG = {
  gym:    { color:"#10b981", label:"💪 Salipäivä" },
  futsal: { color:"#f59e0b", label:"⚽ Futsal" },
  rest:   { color:"#64748b", label:"😴 Lepopäivä" },
};

const SLOTS = [
  { key:"b", label:"Aamiainen", time:"07:30", icon:"🌅" },
  { key:"l", label:"Lounas",    time:"12:00", icon:"🍱" },
  { key:"v", label:"Välipala",  time:"15:30", icon:"⚡" },
  { key:"i", label:"Illallinen",time:"18:30", icon:"🍽️" },
  { key:"y", label:"Yöpala",    time:"21:00", icon:"🌙" },
];

const DAY_ABR = ["Ma","Ti","Ke","To","Pe","La","Su"];

function getToday() { return new Date().toISOString().slice(0,10); }
function sKey(date,w,d,s) { return `rv3_${date}_w${w}_d${d}_${s}`; }

function getMeal(wi, slotKey, code) {
  const wk = MEAL_PREP_WEEKS[wi];
  if (slotKey==="b") return code==="A" ? wk.aamiaiset.A : wk.aamiaiset.B;
  if (slotKey==="l") return code==="L1" ? wk.lounaat.L1 : wk.lounaat.L2;
  if (slotKey==="i") return code==="I1" ? wk.illalliset.I1 : wk.illalliset.I2;
  if (slotKey==="v") return VALIPALAT[code];
  if (slotKey==="y") return YOPALAT[code];
  return null;
}

function MealCard({ slotKey, mealCode, wi, dayIdx, dayType }) {
  const [open, setOpen] = useState(false);
  const today = getToday();
  const [done, setDone] = useState(() => {
    try { return localStorage.getItem(sKey(today,wi,dayIdx,slotKey))==="1"; } catch { return false; }
  });

  const meal = getMeal(wi, slotKey, mealCode);
  if (!meal) return null;
  const slot = SLOTS.find(s=>s.key===slotKey);
  const m = meal.makrot;
  const tc = TYPE_CFG[dayType];

  const toggle = e => {
    e.stopPropagation();
    const next = !done;
    setDone(next);
    try { localStorage.setItem(sKey(today,wi,dayIdx,slotKey), next?"1":"0"); } catch {}
  };

  return (
    <div style={{
      background: done ? "#060b13" : "#0f172a",
      border: `1px solid ${done ? tc.color+"55" : "#1e293b"}`,
      borderRadius:16, marginBottom:10, overflow:"hidden",
      opacity: done ? 0.7 : 1, transition:"all 0.2s",
    }}>
      <div style={{ padding:"14px 16px", cursor:"pointer" }} onClick={()=>setOpen(o=>!o)}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
          <button onClick={toggle} style={{
            width:24, height:24, borderRadius:7, flexShrink:0, marginTop:3,
            border:`2px solid ${done ? tc.color : "#374151"}`,
            background: done ? tc.color : "transparent",
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"all 0.15s",
          }}>
            {done && <span style={{ color:"#fff", fontSize:13, fontWeight:900, lineHeight:1 }}>✓</span>}
          </button>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ color:"#6b7280", fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              {slot?.time} · {slot?.label}
            </div>
            <div style={{ color: done ? "#6b7280" : "#f3f4f6", fontSize:15, fontWeight:700, marginTop:2, textDecoration: done?"line-through":"none" }}>
              {slot?.icon} {meal.nimi}
            </div>
            <div style={{ display:"flex", gap:10, marginTop:5, flexWrap:"wrap", alignItems:"center" }}>
              {[["P",m.p,"#10b981"],["H",m.h,"#3b82f6"],["R",m.r,"#f59e0b"]].map(([l,v,c])=>(
                <span key={l} style={{ fontSize:12 }}>
                  <span style={{ color:c, fontWeight:700 }}>{l}</span>
                  <span style={{ color:"#d1d5db" }}> {v}g</span>
                </span>
              ))}
              <span style={{ color:"#4b5563", fontSize:11 }}>· {m.kcal} kcal</span>
            </div>
          </div>
          <span style={{ color:"#374151", fontSize:14, flexShrink:0, marginTop:4 }}>{open?"▲":"▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ padding:"0 16px 16px", borderTop:"1px solid #1e293b" }}>
          <div style={{ paddingTop:12 }}>
            <div style={{ color:"#6b7280", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>Ainekset</div>
            <ul style={{ marginBottom:14 }}>
              {meal.ainekset.map((a,i)=>(
                <li key={i} style={{ display:"flex", gap:8, marginBottom:5 }}>
                  <span style={{ color:tc.color, flexShrink:0, marginTop:2 }}>•</span>
                  <span style={{ color:"#d1d5db", fontSize:13 }}>{a}</span>
                </li>
              ))}
            </ul>
            <div style={{ color:"#6b7280", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>Ohje</div>
            <p style={{ color:"#9ca3af", fontSize:13, lineHeight:1.65 }}>{meal.ohje}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function PrepCard({ wi }) {
  const [open, setOpen] = useState(false);
  const wk = MEAL_PREP_WEEKS[wi];
  return (
    <div style={{
      background:"#0a0f1a", border:"1px solid #10b98133",
      borderRadius:16, marginBottom:14, overflow:"hidden",
    }}>
      <button
        style={{ width:"100%", padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }}
        onClick={()=>setOpen(o=>!o)}
      >
        <div style={{ textAlign:"left" }}>
          <div style={{ color:"#10b981", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>
            🧑‍🍳 Sunnuntai-prep — {wk.teema}
          </div>
          <div style={{ color:"#f3f4f6", fontSize:14, fontWeight:600, marginTop:3 }}>
            Valmista nämä → lounaat & illalliset alle 5 min/pv
          </div>
        </div>
        <span style={{ color:"#374151", fontSize:14 }}>{open?"▲":"▼"}</span>
      </button>
      {open && (
        <div style={{ padding:"0 16px 16px", borderTop:"1px solid #1e293b" }}>
          <ul style={{ marginTop:12 }}>
            {wk.prepOhje.map((step,i)=>(
              <li key={i} style={{ display:"flex", gap:10, marginBottom:10 }}>
                <span style={{
                  background:"#10b98122", color:"#10b981",
                  width:22, height:22, borderRadius:6, flexShrink:0,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:11, fontWeight:800,
                }}>{i+1}</span>
                <span style={{ color:"#d1d5db", fontSize:13, lineHeight:1.5 }}>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DayView({ day, wi, dayIdx }) {
  const today = getToday();
  const tc = TYPE_CFG[day.tyyppi];
  const [tick, setTick] = useState(0);
  useEffect(()=>{ const id=setInterval(()=>setTick(n=>n+1),1500); return()=>clearInterval(id); },[]);

  const doneCount = SLOTS.reduce((acc,s)=>{
    try { return acc+(localStorage.getItem(sKey(today,wi,dayIdx,s.key))==="1"?1:0); } catch { return acc; }
  },0);
  const totals = SLOTS.reduce((acc,s)=>{
    const m=getMeal(wi,s.key,day[s.key]);
    if(!m) return acc;
    return {kcal:acc.kcal+m.makrot.kcal,p:acc.p+m.makrot.p,h:acc.h+m.makrot.h,r:acc.r+m.makrot.r};
  },{kcal:0,p:0,h:0,r:0});

  return (
    <div>
      <div style={{ background:"#0a0f1a", border:`1px solid ${tc.color}33`, borderRadius:18, padding:16, marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
          <div>
            <div style={{ color:"#6b7280", fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:700 }}>Päivän tavoite</div>
            <div style={{ color:"#f9fafb", fontSize:24, fontWeight:900, marginTop:2 }}>
              {totals.kcal} <span style={{ color:"#6b7280", fontSize:14, fontWeight:400 }}>kcal</span>
            </div>
          </div>
          <span style={{ background:tc.color, color:"#fff", fontSize:11, fontWeight:700, padding:"5px 10px", borderRadius:20 }}>{tc.label}</span>
        </div>
        <div style={{ marginBottom:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ color:"#6b7280", fontSize:11 }}>Ateriat syöty</span>
            <span style={{ color:tc.color, fontSize:11, fontWeight:700 }}>{doneCount}/5</span>
          </div>
          <div style={{ height:6, background:"#1e293b", borderRadius:99 }}>
            <div style={{ height:6, background:tc.color, borderRadius:99, width:`${(doneCount/5)*100}%`, transition:"width 0.3s" }}/>
          </div>
        </div>
        {[
          {label:"Proteiini",val:totals.p,max:230,color:"#10b981"},
          {label:"Hiilihydraatit",val:totals.h,max:280,color:"#3b82f6"},
          {label:"Rasva",val:totals.r,max:120,color:"#f59e0b"},
        ].map(({label,val,max,color})=>(
          <div key={label} style={{ marginBottom:6 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
              <span style={{ color:"#6b7280", fontSize:11 }}>{label}</span>
              <span style={{ color:"#e5e7eb", fontSize:11, fontWeight:700 }}>{val}g</span>
            </div>
            <div style={{ height:4, background:"#1e293b", borderRadius:99 }}>
              <div style={{ height:4, background:color, borderRadius:99, width:`${Math.min((val/max)*100,100)}%` }}/>
            </div>
          </div>
        ))}
      </div>

      {SLOTS.map(slot=>(
        <MealCard key={slot.key} slotKey={slot.key} mealCode={day[slot.key]} wi={wi} dayIdx={dayIdx} dayType={day.tyyppi}/>
      ))}

      {day.tyyppi==="futsal" && (
        <div style={{ background:"#451a03", border:"1px solid #92400e", borderRadius:12, padding:12, marginTop:4 }}>
          <p style={{ color:"#fcd34d", fontSize:13 }}>⚽ <strong>Futsal-päivä:</strong> Välipala 60–90 min ennen peliä. Lisää tarvittaessa +1 banaani.</p>
        </div>
      )}
      {day.tyyppi==="rest" && (
        <div style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:12, padding:12, marginTop:4 }}>
          <p style={{ color:"#94a3b8", fontSize:13 }}>😴 <strong>Lepopäivä:</strong> Sama proteiini, vähemmän hiilareita. Välipala pähkinöitä + hedelmä.</p>
        </div>
      )}

      <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:16, marginTop:12 }}>
        <div style={{ color:"#6b7280", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>💊 Päivittäiset lisäravinteet</div>
        {[
          {name:"Kreatiini",dose:"5 g",when:"milloin vain"},
          {name:"D-vitamiini",dose:"75 µg",when:"aamulla ruoan kanssa"},
          {name:"Omega-3",dose:"2–3 g EPA+DHA",when:"ruoan kanssa"},
        ].map(s=>(
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

export default function App() {
  const [week, setWeek] = useState(0);
  const [dayIdx, setDayIdx] = useState(()=>{ const d=new Date().getDay(); return d===0?6:d-1; });
  const day = WEEKS[week][dayIdx];
  const wk = MEAL_PREP_WEEKS[week];

  return (
    <div style={{ minHeight:"100vh", background:"#030712", fontFamily:"'DM Sans','Helvetica Neue',sans-serif", color:"#f3f4f6", maxWidth:480, margin:"0 auto", paddingBottom:40 }}>
      <div style={{ background:"linear-gradient(180deg,#0f172a 0%,#030712 100%)", paddingTop:"max(env(safe-area-inset-top),16px)", paddingLeft:20, paddingRight:20, borderBottom:"1px solid #111827", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ fontSize:10, color:"#6b7280", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:700 }}>Rekompositio-ohjelma</div>
        <div style={{ display:"flex", alignItems:"baseline", gap:8, marginTop:2, marginBottom:14 }}>
          <h1 style={{ fontSize:22, fontWeight:900, color:"#f9fafb" }}>Ruokavalio</h1>
          <span style={{ color:"#10b981", fontSize:12, fontWeight:700 }}>{wk.teema}</span>
        </div>
        <div style={{ display:"flex", gap:6, marginBottom:12 }}>
          {["Viikko 1","Viikko 2","Viikko 3"].map((w,i)=>(
            <button key={i} onClick={()=>setWeek(i)} style={{ flex:1, padding:"8px 0", borderRadius:10, fontSize:12, fontWeight:700, background:week===i?"#10b981":"#111827", color:week===i?"#fff":"#6b7280", transition:"all 0.2s", border:"none", cursor:"pointer" }}>{w}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:2 }}>
          {WEEKS[week].map((d,i)=>{
            const dtc=TYPE_CFG[d.tyyppi]; const active=i===dayIdx;
            return (
              <button key={i} onClick={()=>setDayIdx(i)} style={{ flex:1, paddingTop:8, paddingBottom:active?12:8, borderRadius:"8px 8px 0 0", fontSize:11, fontWeight:active?800:500, background:active?"#0f172a":"transparent", color:active?"#f9fafb":"#4b5563", transition:"all 0.15s", border:"none", cursor:"pointer" }}>
                {DAY_ABR[i]}
                <div style={{ width:5, height:5, borderRadius:"50%", background:dtc.color, margin:"4px auto 0", opacity:active?1:0.4 }}/>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding:"16px 16px 0" }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:"#f9fafb", marginBottom:12 }}>{day.pv}</h2>
        <PrepCard wi={week}/>
        <DayView day={day} wi={week} dayIdx={dayIdx}/>
      </div>
    </div>
  );
}
