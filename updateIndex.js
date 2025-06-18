const fs = require("fs");
const path = require("path");

try {
  // Path to the index.html file
  const indexPath = path.join(__dirname, "index.html");

  // Read the current content of index.html
  let indexContent = fs.readFileSync(indexPath, "utf-8");

  // Find the existing directories in the repository, excluding specific ones
  const directories = fs
    .readdirSync(__dirname)
    .filter((dir) => {
      const fullPath = path.join(__dirname, dir);
      return (
        fs.statSync(fullPath).isDirectory() &&
        !dir.startsWith(".") &&
        dir !== "node_modules" &&
        dir !== "stylesheets"
      );
    })
    .sort(); // Sort alphabetically for consistent ordering

  // Generate the new list items for each directory
  const newListItems = directories
    .map((dir) => {
      const dirName = dir.replace(/-/g, " ");
      return `  <li><a href="https://cellijel.github.io/misc/${dir}/">${dirName}</a></li>`;
    })
    .join("\n");

  // Replace the old list items with the new ones within the <ol> element
  const updatedContent = indexContent.replace(
    /(<ol style="list-style-type: none;">)([\s\S]*?)(<\/ol>)/,
    `$1\n${newListItems}\n$3`
  );

  // Write the updated content back to index.html
  fs.writeFileSync(indexPath, updatedContent, "utf-8");
  console.log("Successfully updated index.html with new directory links!");
} catch (error) {
  console.error("Error updating index.html:", error.message);
  process.exit(1);
}
