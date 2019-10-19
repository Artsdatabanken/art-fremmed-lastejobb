const { io, json, text } = require("lastejobb");
const structure = require("./structure");

const items = io.lesDatafil("20_unflatten").items;
items.forEach(rec => {
  reorganize(rec);
});

io.skrivDatafil(__filename, items);

function reorganize(e) {
  Object.keys(e).forEach(k => stripHtml(e, k));
  Object.keys(structure).forEach(key => json.moveKey(e, key, structure[key]));

  const rv = e.risikovurdering;
  if (!rv) return;
  const kriterie = rv.kriterie;
  if (!kriterie) return;
  livsmedium_prefiks(kriterie.c, "koloniserte naturtyper");
  livsmedium_prefiks(kriterie.d, "naturtyper");
  livsmedium_prefiks(kriterie.e, "naturtyper");
  livsmedium_prefiks(kriterie.g, "øvrige naturtyper");
}

function livsmedium_prefiks(kriterie, key) {
  if (!kriterie) return;
  const typer = kriterie[key];
  if (!typer) return;
  kriterie[key] = typer.map(k => {
    const livsmedium_hoved = ["MS", "MF", "FS", "FF", "TS", "TF"];
    if (k.indexOf("LI ") === 0) return k.replace("LI ", "LI-");
    for (var li of livsmedium_hoved) if (k.indexOf(li) === 0) return "LI-" + k; //Livsmedium
    return "NN-NA-TI-" + k;
  });
}

function stripHtml(e, k) {
  if (!e) return;
  if (!e.hasOwnProperty(k)) return;
  let v = e[k];
  if (!v) return;
  if (typeof v !== "string") return;
  e[k] = text.decode(v);
}
