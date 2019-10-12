const { io, json } = require("lastejobb");
const structure = require("./structure");

const items = io.lesDatafil("20_unflatten").items;
items.forEach(rec => {
  reorganize(rec);
});
io.skrivBuildfil("art", items);

function reorganize(e) {
  stripHtml(e, "invasjonspotensial");
  stripHtml(e, "konklusjon");
  stripHtml(e, "beskrivelse av arten");
  stripHtml(e, "spredningsmåter");
  stripHtml(e, "økologisk effekt");
  stripHtml(e, "utbredelse i norge");
  Object.keys(structure).forEach(key => json.moveKey(e, key, structure[key]));
}

// Convert unicode decimal representation inside a string to actual characters
// Example: "&244:" => ô
function unicodeToChar(text) {
  // hex
  text = text.replace(/\\u[\dA-F]{4}/gi, function(match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
  });
  // decimal
  text = text.replace(/&#[\d]*\:/gi, match =>
    String.fromCharCode(parseInt(match.replace(/&#/g, ""), 10))
  );

  return text;
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
  v = unicodeToChar(v);
  v = v.replace("fler&#168:rig", "flerårig"); //stavefeil
  e[k] = v.trim();
}
