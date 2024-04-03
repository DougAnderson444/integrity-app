/**
 * Secure Bookmark Bootloader
 * Compiles the app HTML and creates a base64 Data URL
 */
const encoded = `%%index%%`;

let decoded = atob(encoded);

var chunkSize = 1024;
var index = 0;

while (index < decoded.length) {
	var chunk = decoded.slice(index, Math.min(index + chunkSize, decoded.length));
	document.write(chunk);
	index += chunkSize;
}

//close
document.close();
