/**
 * Secure Bookmark Bootloader
 * Compiles the app HTML and creates a base64 Data URL
 */
const encoded = `%%index%%`;

// decode from base64 then write to document
// let decoded = atob(encoded);
document.write(encoded);
