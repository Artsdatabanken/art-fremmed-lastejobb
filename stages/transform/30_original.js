const { io, json, text } = require("lastejobb");
const structure = require("./structure");

const r = {};
const items = io.lesDatafil("20_unflatten").items;
items.forEach(rec => {
  reorganize(rec);
});
console.log(r);
io.skrivBuildfil("art", items);

function reorganize(e) {
  Object.keys(e).forEach(k => stripHtml(e, k));
  Object.keys(structure).forEach(key => json.moveKey(e, key, structure[key]));
}

function stripHtml(e, k) {
  if (!e) return;
  if (!e.hasOwnProperty(k)) return;
  let v = e[k];
  if (!v) return;
  if (typeof v !== "string") return;
  e[k] = text.decode(v);
}
