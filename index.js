require("dotenv").config();

const sequelize = require("./models/_connection");
require("./models/_associations");

// Sync database and then create environment users
sequelize
  .sync()
  .then(async () => {
    console.log("✅ Database connected & synced");
    // await onStartUpCreateEnvUsers(); // <-- Call function here
  })
  .catch((error) => console.error("❌ Error syncing database:", error));

const path = require("path");
const { checkAudio } = require("./modules/checkAudio");
const { processVideo } = require("./modules/processVideo");

const fs = require("fs");
const Video = require("./models/Video");

const fileName = process.argv[2]; // The video file name passed as an argument
const videoId = process.argv[3];
console.log("---> IN KVVIDEO UPLOADER");
console.log(`Video ID: ${videoId}`);
const filePath = path.join(process.env.PATH_TO_UPLOADED_VIDEOS, fileName);
const directoryPath = path.dirname(filePath);

if (!fileName) {
  throw new Error(
    "❌ No file name provided. Please pass a file name as an argument."
  );
}

if (!fs.existsSync(directoryPath)) {
  const errorMessage = `❌ Directory not found: ${directoryPath}`;
  console.error(errorMessage);
  throw new Error(errorMessage);
} else {
  console.log(`✅ Directory exists: ${directoryPath}`);
}

(async () => {
  try {
    const hasAudio = await checkAudio(filePath);

    if (hasAudio) {
      console.log(
        "🔊 The video has sound. Saving to the processed directory..."
      );
      // saveVideo(filePath, process.env.PATH_TO_PROCESSED_VIDEOS);
      await Video.update(
        { processingStatus: "processed" },
        { where: { id: videoId } }
      );
      console.log("percent complete: 100");
    } else {
      console.log("🔇 No audio detected. Processing the video...");
      console.log("percent complete: 20");
      await processVideo(filePath, videoId);
    }

    console.log("✅ Operation completed successfully.");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
})();
