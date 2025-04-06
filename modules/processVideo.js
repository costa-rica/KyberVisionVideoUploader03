const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
const Video = require("../models/Video");

const processVideo = (filePath, videoId) => {
  // const outputPath = process.env.PATH_TO_PROCESSED_VIDEOS;
  const fileName = path.basename(filePath);
  const outputFileName = fileName.replace(/(\.[\w\d_-]+)$/i, "_output.mp4");
  const outputFilePath = path.join(
    process.env.PATH_TO_PROCESSED_VIDEOS,
    outputFileName
  );

  if (!fs.existsSync(process.env.PATH_TO_PROCESSED_VIDEOS)) {
    fs.mkdirSync(process.env.PATH_TO_PROCESSED_VIDEOS, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .videoCodec("libx264")
      .audioCodec("aac")
      .outputOptions([
        "-profile:v baseline",
        "-b:a 128k",
        "-movflags",
        "faststart",
      ])
      .on("end", () => {
        // update database
        Video.update(
          {
            processingStatus: "processed",
            pathToVideoFile: process.env.PATH_TO_PROCESSED_VIDEOS,
          },
          {
            where: { id: videoId },
          }
        );
        // delete old video
        fs.unlinkSync(path.join(process.env.PATH_TO_UPLOADED_VIDEOS, fileName));
        console.log("percent complete: 100");
        console.log(`✅ Processed video saved to ${outputFilePath}`);
        // Flush stdout to make sure messages are captured
        process.stdout.write("", () => {
          resolve(outputFilePath);
        });
      })
      .on("error", (err) => {
        console.error(`❌ Error processing video: ${err.message}`);
        reject(err);
      })
      .save(outputFilePath);
  });
};

module.exports = { processVideo };
