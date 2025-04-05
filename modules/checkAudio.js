const ffmpeg = require("fluent-ffmpeg");

const checkAudio = (filePath) => {
  console.log("--- 5 inside checkAudio ---");
  console.log(`Checking audio for file: ${filePath}`);
  return new Promise((resolve, reject) => {
    console.log("--- 6 inside Promise ---");

    try {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          console.error("--- 7 Error with ffprobe ---", err.message);
          return reject(err);
        }

        console.log("--- 8 ffprobe completed successfully ---");
        console.log(
          `--- 9 Metadata retrieved: ${JSON.stringify(metadata, null, 2)} ---`
        );

        const hasAudioStream = metadata.streams.some(
          (stream) => stream.codec_type === "audio"
        );

        console.log(`--- 10 Audio stream found: ${hasAudioStream} ---`);
        console.log("percent complete: 10");
        resolve(hasAudioStream);
      });
    } catch (error) {
      console.error("--- 11 Unexpected Error ---", error.message);
      reject(error);
    }
  });
};

module.exports = { checkAudio };
