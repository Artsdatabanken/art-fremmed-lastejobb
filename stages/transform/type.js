const { csv, io } = require("lastejobb");

const options = {
  delimiter: ";",
  quote: ""
};

const src = csv.les("data/fa.csv", options, { encoding: "utf16le" });
const r = src.map(rec => map(rec));
io.skrivDatafil(__filename, r);

function map(rec) {
  const ok = {};
  Object.keys(rec).forEach(key => {
    const value = rec[key];
    key = key.toLowerCase();
    if (value.length === 0) return;
    const segs = key.replace(" - ", ",").split(",");
    //    if (segs.length > 1) debugger;
    let cursor = ok;
    while (segs.length > 1) {
      const seg = segs.shift().trim();
      if (!cursor[seg]) cursor[seg] = {};
      cursor = cursor[seg];
    }
    const k = segs.shift().trim();
    cursor[k] = clean(value, k);
  });
  return ok;
}

function clean(v, k) {
  switch (k) {
    //    case "år":
    case "andel i sterkt endra natur (%)":
    case "km²":
    case "m/år":
      if (v !== "0" && !parseFloat(v)) debugger;
      return parseFloat(v);
    case "delkategori":
    case "antall arter":
    case "antall veier":
      if (v !== "0" && !parseInt(v)) debugger;
      if (parseInt(v) !== parseFloat(v)) debugger;
      return parseInt(v);
    case "utslagsgivende kriterier 2018":
    case "hovedveier":
    case "andre arter/nøkkelarter":
    case "arten finnes i følgende fylker/områder":
    case "marint":
    case "livsmiljø":
      return v.split(",");
    case "naturtyper":
    case "koloniserte naturtyper":
    case "øvrige naturtyper":
      return v.split(",").map(e => "NN-NA-TI-" + e);
    case "naturlig utbredelse":
    case "nåværende utbredelse":
      return v.split("|").reduce((acc, v) => {
        const f = v.split(":");
        acc[f[0]] = f[1].split(",");
        return acc;
      }, {});
  }
  return v;
}
