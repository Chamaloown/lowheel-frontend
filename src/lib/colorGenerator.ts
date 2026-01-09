export function colorGenerator() {
  const couleur = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + couleur.padStart(6, "0");
}
