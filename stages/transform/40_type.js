const { io, json } = require("lastejobb");

let type = json.objectToArray(
  io.lesDatafil("art-fremmed-ubehandlet/type"),
  "kode"
);
io.skrivBuildfil("type", type);
