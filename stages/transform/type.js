const { csv, io, json } = require("lastejobb");
const moveKey = json.moveKey;

const options = {
  delimiter: ";",
  quote: ""
};

const src = csv.les("data/fa.csv", options, { encoding: "utf16le" });
const r = src.map(rec => map(rec));
io.skrivBuildfil(__filename, r);

function map(rec) {
  const ok = {};
  Object.keys(rec).forEach(key => {
    const value = rec[key];
    key = key.toLowerCase();
    if (value.length === 0) return;
    const segs = key.replace(" - ", ",").split(",");
    let cursor = ok;
    while (segs.length > 1) {
      const seg = segs.shift().trim();
      if (!cursor[seg]) cursor[seg] = {};
      cursor = cursor[seg];
    }
    const k = segs.shift().trim();
    cursor[k] = cleanValue(value, k);
  });
  reorganize(ok);
  return ok;
}

function reorganize(e) {
  moveKey(e, "populærnavn", "takson.populærnavn");
  moveKey(e, "artsgruppe", "takson.artsgruppe");
  moveKey(e, "author", "takson.author");
  moveKey(e, "scientificnameid", "takson.scientificnameid");
  moveKey(e, "taxonid", "takson.taxonid");
  moveKey(e, "norsk bestand", "utbredelse.norsk bestand");
  moveKey(e, "naturlig utbredelse", "utbredelse.naturlig");
  moveKey(e, "livsmiljø", "utbredelse.livsmiljø");
  moveKey(e, "nåværende utbredelse", "utbredelse.nåværende");
  moveKey(e, "aseksuell reproduksjon", "utbredelse.reproduksjon.aseksuell");
  moveKey(e, "seksuell reproduksjon", "utbredelse.reproduksjon.seksuell");
  moveKey(e, "generasjonstid", "utbredelse.reproduksjon.generasjonstid");
  moveKey(
    e,
    "andel i sterkt endra natur (%)",
    "utbredelse.andel i sterkt endra natur (%)"
  );
  moveKey(e, "naturlig utbredelse", "utbredelse.naturlig");
  moveKey(
    e,
    "arten finnes i følgende fylker/områder",
    "utbredelse.finnes i områder"
  );
  moveKey(e, "forekomstareal", "utbredelse.forekomstareal");
  moveKey(e, "a", "risikovurdering.kriterie.a");
  moveKey(e, "b", "risikovurdering.kriterie.b");
  moveKey(e, "c", "risikovurdering.kriterie.c");
  moveKey(e, "d", "risikovurdering.kriterie.d");
  moveKey(e, "e", "risikovurdering.kriterie.e");
  moveKey(e, "f", "risikovurdering.kriterie.f");
  moveKey(e, "g", "risikovurdering.kriterie.g");
  moveKey(e, "h", "risikovurdering.kriterie.h");
  moveKey(e, "i", "risikovurdering.kriterie.i");
  moveKey(e, "invasjonspotensial", "risikovurdering.invasjonspotensial");
  moveKey(e, "dørstokkart", "risikovurdering.dørstokkart");
  moveKey(e, "utenfor definisjon", "risikovurdering.utenfor definisjon");
  moveKey(e, "konklusjon", "risikovurdering.konklusjon");
  moveKey(
    e,
    "definisjonsavgrensning",
    "risikovurdering.kriterie.definisjonsavgrensning"
  );
  moveKey(
    e,
    "effekter på opphavsbestanden",
    "risikovurdering.effekt.opphavsbestanden"
  );
  moveKey(e, "økologisk effekt", "risikovurdering.effekt.økologisk");
  moveKey(
    e,
    "effekter på økosystemtjenester",
    "risikovurdering.effekt.økosystemtjenester"
  );

  moveKey(
    e,
    "utslagsgivende kriterier 2018",
    "risikovurdering.kriterie.utslagsgivende.2018"
  );
  moveKey(e, "klimaeffekter", "risikovurdering.effekt.klima");
  moveKey(e, "kriterie", "risikovurdering.kriterie");
  moveKey(e, "invasjonspotensiale", "risikovurdering.invasjonspotensiale");
  moveKey(e, "helseeffekter", "risikovurdering.effekt.helse");
  moveKey(e, "økonomiske effekter", "risikovurdering.effekt.økonomisk");
  moveKey(
    e,
    "positive økologiske effekter",
    "risikovurdering.effekt.positive økologiske"
  );
  moveKey(
    e,
    "kom til vurderingsområdet fra",
    "import.kom til vurderingsområdet fra"
  );
  moveKey(e, "først observert", "import.først observert");
  moveKey(e, "referanser", "risikovurdering.referanser");
  moveKey(e, "risikonivå 2012", "risikovurdering.risikonivå.2012");
  moveKey(e, "risikonivå 2018", "risikovurdering.risikonivå.2018");
  moveKey(e, "spredningsveier", "risikovurdering.spredning.vei");
  moveKey(e, "spredningsmåter", "risikovurdering.spredning.måte");
  moveKey(e, "import", "risikovurdering.import");
  moveKey(e, "regionalt fremmed art", "risikovurdering.regionalt fremmed art");
  moveKey(
    e,
    "antatt forekomstareal. km²",
    "utbredelse.antatt forekomstareal km²"
  );
  moveKey(
    e,
    "mørketall for forekomstområdet",
    "utbredelse.forekomstområde.mørketall"
  );
  moveKey(
    e,
    "potensielt forekomstareal",
    "utbredelse.forekomstområde.potensielt"
  );
  moveKey(e, "geo. variasjon", "utbredelse.geo. variasjon");
  moveKey(e, "utbredelse i norge", "utbredelse.norge");
  moveKey(e, "utbredelsesområde", "utbredelse.område");
  moveKey(e, "vitenskapelig navn", "takson.vitenskapelig navn");
  moveKey(
    e,
    "tidligere økologisk risikovurdering i norge",
    "risikovurdering.tidligere vurdert.norge"
  );
  moveKey(
    e,
    "tidligere økologisk riskiovurdering i anna land",
    "risikovurdering.tidligere vurdert.andre land"
  );
}

function cleanValue(v, k) {
  switch (k) {
    case "år":
    case "andel i sterkt endra natur (%)":
    case "km²":
    case "m/år":
      if (v !== "0" && !parseFloat(v)) return v;
      return parseFloat(v);
    case "delkategori":
    case "referanser":
    case "antall arter":
    case "antall veier":
    case "taxonid":
    case "scientificnameid":
      if (v !== "0" && !parseInt(v)) return v;
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
