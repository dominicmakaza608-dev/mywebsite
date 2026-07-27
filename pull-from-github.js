const simpleGit = require('simple-git');

const git = simpleGit('c:\\Users\\Admin\\Desktop\\mywebsite', {
  binary: 'C:\\Program Files\\Git\\bin\\git.exe',
  unsafe: { allowUnsafeCustomBinary: true }
});

async function pullAndUpdate() {
  try {
    console.log('Pulling latest changes from GitHub...');
    await git.pull('origin', 'main');
    console.log('✅ Successfully pulled changes from GitHub!');
    console.log('Your website will be redeployed to Vercel...');
  } catch (error) {
    console.error('Error pulling from GitHub:', error.message);
  }
}

pullAndUpdate();
