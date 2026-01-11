export function colorGenerator() {
  const greyShade = Math.floor(Math.random() * 256);
  const hexShade = greyShade.toString(16).padStart(2, "0");
  return `#${hexShade}${hexShade}${hexShade}`;
}
