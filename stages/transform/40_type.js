const { io, json } = require("lastejobb");

let type = json.objectToArray(
  io.lesTempJson("art-fremmed-ubehandlet/type"),
  "kode"
);
io.skrivBuildfil("type", type);
