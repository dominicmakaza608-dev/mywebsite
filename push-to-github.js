const simpleGit = require('simple-git');
const git = simpleGit('c:\\Users\\Admin\\Desktop\\mywebsite', {
  binary: 'C:\\Program Files\\Git\\bin\\git.exe',
  unsafe: { allowUnsafeCustomBinary: true }
});

async function setupGitHub() {
  try {
    console.log('Adding all changes...');
    await git.add('.');
    
    console.log('Committing changes...');
    await git.commit('Update: Added Flightradar24 guide with cropped screenshot');
    
    console.log('Pushing to GitHub...');
    await git.push('origin', 'main');
    
    console.log('✅ Successfully pushed to GitHub!');
    console.log('Your Vercel auto-deployment should start shortly...');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

setupGitHub();
