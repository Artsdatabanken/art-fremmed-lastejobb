const { io, json } = require("lastejobb");
const structure = require("./structure");

const moveKey = json.moveKey;

const src = io.lesDatafil("20_unflatten").items;
const r = src.map(rec => reorganize(rec));
io.skrivBuildfil("type", r);

function reorganize(e) {
  Object.keys(structure).forEach(key => moveKey(e, key, structure[key]));
}

//.map(e => "NN-NA-TI-" + e);
