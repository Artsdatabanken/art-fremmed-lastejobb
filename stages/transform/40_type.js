const { io, json } = require("lastejobb");

let type = json.objectToArray(
  io.lesDatafil("fremmed-art-ubehandlet/type"),
  "kode"
);
io.skrivBuildfil("type", type);
