// OBE 2025-04-06

const fs = require("fs");
const path = require("path");

const saveVideo = (filePath, targetDirectory) => {
  const fileName = path.basename(filePath);
  const destinationPath = path.join(targetDirectory, fileName);

  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
  }

  fs.copyFileSync(filePath, destinationPath);
  console.log(`✅ Video saved to ${destinationPath}`);
  console.log("percent complete: 100");
};

module.exports = { saveVideo };
