const removeMetadata = require("../utils/removeMetadata");

async function sanitizeUpload(file) {
  const cleanedPath = await removeMetadata(file.path);
  return { ...file, path: cleanedPath };
}

module.exports = { sanitizeUpload };
