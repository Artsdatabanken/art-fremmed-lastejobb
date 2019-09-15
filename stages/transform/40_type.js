const { io, json } = require("lastejobb");

const moveKey = json.moveKey;

const items = io.lesBuildfil("original").items;
items.forEach(rec => map(rec));
io.skrivDatafil("type", json.arrayToObject(items, { uniqueKey: "kode" }));
io.skrivBuildfil("type", items);

function map(e) {
  moveKey(e, "beskrivelse av arten", "ingress.nb");
  e.risiko = e.risikovurdering["risikonivå 2018"];
  delete e.risikovurdering["risikonivå 2018"];
  cleanVurdering(e.risikovurdering);
  if (e.utbredelse) {
    delete e.utbredelse["andel i sterkt endra natur (%)"];
    delete e.utbredelse["geo variasjon"];
    delete e.utbredelse["norge"];
    if (e.utbredelse.forekomstområde)
      delete e.utbredelse.forekomstområde.mørketall;
  }
  e.kode = "AR-" + e.takson.taxonid;
  delete e.takson;
  const remove = [
    "tidligere vurdert",
    "referanser",
    "norsk bestand",
    "ekspertgruppe",
    "ekspertgruppe id"
  ];
  for (let r of remove) delete e[r];
  if (e.ingress) e.ingress.nb = stripHtml(e.ingress.nb);
}

function stripHtml(v) {
  v = v.replace("<sup>2</sup>", "²");
  v = v.replace("<sup>o</sup>", "°");
  v = v.replace("<sub>2 </sub>", "₂");
  v = v.replace(/\<!--.*?--\>/g, "");
  v = v.replace(/&#246:/g, "ö");
  v = v.replace(/&#233:/g, "é");
  v = v.replace(/&#235:/g, "ë");
  v = v.replace(/&#226:/g, "â");
  v = v.replace(/&#244:/g, "ô");
  v = v.replace(/&#228:/g, "ä");
  v = v.replace(/&#215:/g, "×");
  v = v.replace(/&#173:/g, "-");
  v = v.replace(/&#214:/g, "Ö");
  v = v.replace(/&#189:/g, "½");
  v = v.replace(/&#186:/g, "º");
  v = v.replace(/&#252:/g, "ü");
  v = v.replace(/&#176:/g, "°");
  v = v.replace(/&#225:/g, "á");
  v = v.replace(/&#234:/g, "ê");
  v = v.replace(/&#243:/g, "ó");
  v = v.replace(/&#201:/g, "É");
  v = v.replace(/&#237:/g, "í");
  v = v.replace(/&#181:/g, "µ");
  v = v.replace(/&#180:/g, "´");
  v = v.replace(/&#171:/g, "«");
  v = v.replace(/&#187:/g, "»");
  v = v.replace(/&#39:/g, "'");
  v = v.replace(/\<\/?b\>/g, "");
  v = v.replace(/\<\/?u\>/g, "");
  v = v.replace(/\<br\/?\>/g, "");
  v = v.replace(/\<\/?i\>/g, "");
  v = v.replace(/\<\/?em\>/g, "");
  v = v.replace(/\<\/?strong\>/g, "");
  v = v.replace(/\<\/?p\>/g, "");
  v = v.replace(/\<a href=\"(.*?)\">.*<\/a>/g, "$1");
  v = v.replace(/\n/g, "");

  v = v.replace("fler&#168:rig", "flerårig"); //stavefeil
  return v.trim();
}

function cleanVurdering(r) {
  delete r.invasjonspotensiale;
  delete r.invasjonspotensial;
  if (r.import) {
    delete r.import["kom til vurderingsområdet fra"];
    delete r.import["antall veier"];
    delete r.import["hovedveier"];
  }
  delete r.spredning;
  delete r["referanser"];
  delete r["tidligere vurdert"];
  delete r["effekt"];
  delete r["risikonivå 2012"];
  delete r["konklusjon"];
  const kriterie = r.kriterie;
  cleanKriterie(kriterie);
}

function cleanKriterie(r) {
  delete r.a;
  delete r.b;

  if (r.c) {
    delete r.c["usikkerhet opp"];
    delete r.c["usikkerhet ned"];
    delete r.c.delkategori;
  }
  if (r.d) {
    delete r.d["usikkerhet opp"];
    delete r.d["usikkerhet ned"];
    delete r.d.delkategori;
  }
  if (r.e) {
    delete r.e.delkategori;
    delete r.e["usikkerhet ned"];
    delete r.e["usikkerhet opp"];
  }
  delete r.f;
  if (r.g) {
    delete r.g.delkategori;
    delete r.g["usikkerhet ned"];
    delete r.g["usikkerhet opp"];
  }
  if (r.h) {
    delete r.h["usikkerhet ned"];
    delete r.h["usikkerhet opp"];
    delete r.h.delkategori;
  }
  if (r.i) {
    delete r.i["usikkerhet ned"];
    delete r.i["usikkerhet opp"];
    delete r.i.delkategori;
    delete r.i[""];
  }
  delete r["utslagsgivende 2018"];
}
//.map(e => "NN-NA-TI-" + e);
