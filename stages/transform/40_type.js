const { io, json } = require("lastejobb");

let items = io.lesDatafil("30_original").items;
let kategorier = json.objectToArray(
  io.lesDatafil("fremmede-arter-ubehandlet/type"),
  "kode"
);
items = items.concat(kategorier);
io.skrivBuildfil("type", items);
