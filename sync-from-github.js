const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchFromGitHub(filePath, localPath) {
  const url = `https://raw.githubusercontent.com/dominicmakaza608-dev/mywebsite/main/${filePath}`;
  
  console.log(`Fetching ${filePath} from GitHub...`);
  
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      const fileStream = fs.createWriteStream(localPath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✅ Updated ${localPath}`);
      });
    } else {
      console.error(`Failed to fetch ${filePath}: ${response.statusCode}`);
    }
  }).on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });
}

// Fetch updated files from GitHub
fetchFromGitHub('content.js', 'c:\\Users\\Admin\\Desktop\\mywebsite\\content.js');
