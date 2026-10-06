/**
 * Strips identifying EXIF/metadata from uploaded evidence files before storage.
 * This is a scaffold — wire in a library such as "sharp" (for images) or
 * "exiftool-vendored" for a production implementation.
 */
async function removeMetadata(filePath) {
  // TODO: integrate an actual metadata-stripping library for the file types
  // you accept (images, PDFs, documents). Left as a clear extension point
  // rather than silently doing nothing in a security-sensitive path.
  return filePath;
}

module.exports = removeMetadata;
