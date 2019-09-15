const { csv, io } = require("lastejobb");

const options = {
  delimiter: ";",
  quote: ""
};

const src = csv.les("data/fa.csv", options, { encoding: "utf16le" });
io.skrivDatafil(__filename, src);
