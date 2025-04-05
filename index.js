require("dotenv").config();
const path = require("path");
const { checkAudio } = require("./modules/checkAudio");
const { processVideo } = require("./modules/processVideo");
const { saveVideo } = require("./modules/helpers");

const fileName = process.argv[2]; // The video file name passed as an argument
console.log("--- 1 inside VIdeo UPloader ---");
console.log("--- 2 fileName: ", fileName);
if (!fileName) {
  console.error(
    "❌ No file name provided. Please pass a file name as an argument."
  );
  process.exit(1);
}

const filePath = path.join(process.env.PATH_TO_UPLOADED_VIDEOS, fileName);

(async () => {
  console.log("--- 3 inside async function ---");
  try {
    console.log("--- 4 checking audio ---");
    const hasAudio = await checkAudio(filePath);

    if (hasAudio) {
      console.log(
        "🔊 The video has sound. Saving to the processed directory..."
      );
      saveVideo(filePath, process.env.PATH_TO_PROCESSED_VIDEOS);
    } else {
      console.log("🔇 No audio detected. Processing the video...");
      console.log("percent complete: 20");
      await processVideo(filePath);
    }

    console.log("✅ Operation completed successfully.");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
})();
