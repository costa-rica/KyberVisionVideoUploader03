const ffmpeg = require("fluent-ffmpeg");

const checkAudio = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          console.error("Error with ffprobe", err.message);
          return reject(err);
        }

        console.log("ffprobe completed successfully");

        const hasAudioStream = metadata.streams.some(
          (stream) => stream.codec_type === "audio"
        );

        console.log(`Audio stream found: ${hasAudioStream}`);
        console.log("percent complete: 10");
        resolve(hasAudioStream);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { checkAudio };
