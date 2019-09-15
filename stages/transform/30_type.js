const { io, json } = require("lastejobb");
const structure = require("./structure");

const moveKey = json.moveKey;

const items = io.lesDatafil("20_unflatten").items;
items.forEach(rec => reorganize(rec));
io.skrivBuildfil("type", items);

function reorganize(e) {
  Object.keys(structure).forEach(key => moveKey(e, key, structure[key]));
}

//.map(e => "NN-NA-TI-" + e);
