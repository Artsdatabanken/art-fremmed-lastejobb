const { io } = require("lastejobb");

const områder = io.lesTempJson("art-fremmed-ubehandlet/område");

const items = io.lesTempJson("30_original");
items.forEach(rec => {
  if (rec.utbredelse && rec.utbredelse.norge)
    mapOmråder(rec.utbredelse.norge, "nåværende");
});
io.skrivBuildfil("art", items);

function mapOmråder(e, key) {
  const src = e[key];
  if (!src) return;
  const dest = [];
  src.forEach(område => {
    const value = områder[område];
    if (!value) return log.warn("Mangler definisjon for område " + område);
    dest.push(...value.koder);
  });
  e[key] = dest;
}
