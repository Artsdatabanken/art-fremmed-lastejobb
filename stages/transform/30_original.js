const { io, json } = require("lastejobb");
const structure = require("./structure");

const items = io.lesDatafil("20_unflatten").items;
items.forEach(rec => reorganize(rec));
io.skrivDatafil(__filename, items);

function reorganize(e) {
  stripHtml(e, "invasjonspotensial");
  stripHtml(e, "konklusjon");
  stripHtml(e, "beskrivelse av arten");
  stripHtml(e, "spredningsmåter");
  stripHtml(e, "økologisk effekt");
  stripHtml(e, "utbredelse i norge");
  Object.keys(structure).forEach(key => json.moveKey(e, key, structure[key]));
}

function stripHtml(e, k) {
  if (!e) return;
  if (!e.hasOwnProperty(k)) return;
  let v = e[k];
  if (typeof v !== "string") return;
  v = v.replace("<sub>2 </sub>", "₂ ");
  v = v.replace("<sup>2</sup>", "²");
  v = v.replace("<sup>o</sup>", "°");
  v = v.replace(/\<!--.*?--\>/g, "");
  v = v.replace(/\<\/?b\>/g, "");
  v = v.replace(/\<\/?em\>/g, "");
  v = v.replace(/\<\/?i\>/g, "");
  v = v.replace(/\<\/?p\>/g, "");
  v = v.replace(/\<\/?strong\>/g, "");
  v = v.replace(/\<\/?u\>/g, "");
  v = v.replace(/\<a href=\"(.*?)\">.*<\/a>/g, "$1");
  v = v.replace(/\<br\/?\>/g, "");
  v = v.replace(/\n/g, "");
  v = v.replace(/&#171:/g, "«");
  v = v.replace(/&#173:/g, "-");
  v = v.replace(/&#176:/g, "°");
  v = v.replace(/&#180:/g, "´");
  v = v.replace(/&#181:/g, "µ");
  v = v.replace(/&#186:/g, "º");
  v = v.replace(/&#187:/g, "»");
  v = v.replace(/&#189:/g, "½");
  v = v.replace(/&#201:/g, "É");
  v = v.replace(/&#214:/g, "Ö");
  v = v.replace(/&#215:/g, "×");
  v = v.replace(/&#225:/g, "á");
  v = v.replace(/&#226:/g, "â");
  v = v.replace(/&#228:/g, "ä");
  v = v.replace(/&#233:/g, "é");
  v = v.replace(/&#234:/g, "ê");
  v = v.replace(/&#235:/g, "ë");
  v = v.replace(/&#237:/g, "í");
  v = v.replace(/&#243:/g, "ó");
  v = v.replace(/&#244:/g, "ô");
  v = v.replace(/&#246:/g, "ö");
  v = v.replace(/&#252:/g, "ü");
  v = v.replace(/&#39:/g, "'");

  v = v.replace("fler&#168:rig", "flerårig"); //stavefeil
  e[k] = v.trim();
}
