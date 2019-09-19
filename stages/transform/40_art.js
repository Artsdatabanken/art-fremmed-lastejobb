const { io } = require("lastejobb");

let items = io.lesDatafil("30_original").items;
io.skrivBuildfil("art", items);
