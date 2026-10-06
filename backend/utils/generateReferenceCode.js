/** Generates a short, human-readable reference code like CR-4821. */
function generateReferenceCode() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `CR-${random}`;
}

module.exports = generateReferenceCode;
