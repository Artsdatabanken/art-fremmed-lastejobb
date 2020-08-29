const { io } = require("lastejobb");

const all = { a: {}, b: {}, area: {} };

const items = io.lesTempJson("30_original");
items.forEach(rec => {
  if (rec.utbredelse && rec.utbredelse.global) {
    mapOmråder(rec.utbredelse.global.naturlig, rec.autorkode);
    mapOmråder(rec.utbredelse.global.nåværende, rec.autorkode);
  }
});
io.skrivBuildfil("all", { items: [], data: all });

function mapOmråder(e, kode) {
  if (!e) return;
  Object.keys(e).forEach(key => {
    const [a, b] = key.split("_");
    all.a[a] = (all.a[a] || 0) + 1;
    all.b[b] = (all.b[b] || 0) + 1;
    const area = e[key];
    area.forEach(ar => {
      if (ar === "humid") console.log("xx", kode);
      //      console.log(a, b, ar);
      all.area[ar] = (all.area[ar] || 0) + 1;
    });
  });
}
