import proj4 from "proj4";

// Definir EPSG:25830 (UTM zona 30N)
proj4.defs("EPSG:25830", "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs");

export function toWGS84(x: number, y: number) {
  // Convierte de UTM (EPSG:25830) → WGS84 (EPSG:4326)
  const [lon, lat] = proj4("EPSG:25830", "EPSG:4326", [x, y]);
  return { lat, lon };
}
