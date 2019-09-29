const { io } = require("lastejobb");

const src = io.lesDatafil("10_json").items;
const r = src.map(rec => map(rec));
io.skrivDatafil(__filename, r);

function map(rec) {
  const ok = {};
  Object.keys(rec).forEach(key => {
    let value = rec[key];
    if (value.length === 0) return;
    if (erUkjent(value)) return;

    key = key.toLowerCase();
    key = key.replace(", år", " (år)");
    key = key.replace(", km²", " (km²)");
    key = key.replace(", antall arter", "");
    const segs = key.replace(" - ", ",").split(",");
    let cursor = ok;
    while (segs.length > 1) {
      const seg = segs.shift().trim();
      if (!cursor[seg]) cursor[seg] = {};
      cursor = cursor[seg];
    }
    const k = segs.shift().trim();
    value = cleanValue(value, k);
    cursor[k] = value;
  });
  ok.kode = ok.id.replace(/\//g, "-");
  ok.autorkode = ok.id;
  delete ok.id;
  return ok;
}

function erUkjent(v) {
  if (typeof v !== "string") return false;
  const ukjente = ["ukjent", "vet ikke", "unknown"];
  const lc = v.toLowerCase();
  for (var ukjent of ukjente) if (lc === ukjent) return true;
  return false;
}

function cleanValue(v, k) {
  switch (k) {
    case "seksuell reproduksjon":
    case "aseksuell reproduksjon":
      return v === "V" ? true : v;
    case "utslagsgivende kriterier 2018":
    case "hovedveier":
    case "andre arter/nøkkelarter":
    case "trua arter/nøkkelarter":
    case "arten finnes i følgende fylker/områder":
    case "marint":
    case "livsmiljø":
      return v.split(",");
    case "naturtyper":
    case "koloniserte naturtyper":
    case "øvrige naturtyper":
      return v.split(",");
    case "naturlig utbredelse":
    case "nåværende utbredelse":
      return v.split("|").reduce((acc, v) => {
        const f = v.split(":");
        acc[f[0]] = f[1].split(",");
        return acc;
      }, {});
    default:
      if (v === "V") return true;
      // Convert to number if value is a number
      const num = parseFloat(v);
      if (!Number.isNaN(num)) return num;
      return v;
  }
}
