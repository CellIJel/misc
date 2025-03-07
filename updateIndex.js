const fs = require('fs');
const path = require('path');

// Path to the index.html file
const indexPath = path.join(__dirname, 'index.html');

// Read the current content of index.html
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// Find the existing directories in the repository, excluding specific ones
const directories = fs.readdirSync(__dirname).filter(dir => 
  fs.statSync(path.join(__dirname, dir)).isDirectory() && 
  dir !== '.git' && 
  dir !== 'node_modules' && 
  dir !== 'stylesheets' && 
  !dir.startsWith('.github')
);

// Generate the new list items for each directory
const newListItems = directories.map(dir => {
  const dirName = dir.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  return `<li><a href="https://cellijel.github.io/GPTMade/${dir}/">${dir}</a></li>`;
}).join('\n  ');

// Replace the old list items with the new ones within the <ol style="list-style-type: none;"> element, preserving the formatting
indexContent = indexContent.replace(/(<ol style="list-style-type: none;">)([\s\S]*?)(<\/ol>)/, `$1\n  ${newListItems}\n$3`);

// Write the updated content back to index.html
fs.writeFileSync(indexPath, indexContent, 'utf-8');
