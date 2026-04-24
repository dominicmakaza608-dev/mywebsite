const sharp = require('sharp');
const path = require('path');

// Crop the image to preserve mainly the Flightradar24 interface
// Remove browser chrome from top and sidebar from right
sharp(path.join(__dirname, 'Screenshot', 'flightinfo.png'))
  .extract({
    left: 0,        // Start from left edge
    top: 40,        // Skip browser chrome at top (~40px)
    width: 1150,    // Width (excluding right sidebar which is ~140px)
    height: 750     // Height (full viewport minus chrome)
  })
  .toFile(path.join(__dirname, 'Screenshot', 'flightinfo-cropped.png'), (err, info) => {
    if (err) {
      console.error('Error cropping image:', err);
      process.exit(1);
    }
    console.log('Image cropped successfully:', info);
  });
