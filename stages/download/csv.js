const { http } = require("lastejobb");

const url = "https://artsdatabanken.no/Fab2018/api/export/csv";

http.downloadBinary(url, "fa.csv");
