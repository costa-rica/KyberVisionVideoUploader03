const ffmpeg = require("fluent-ffmpeg");

const checkAudio = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        console.error("Error with ffprobe", err.message);
        return reject(err);
      }

      const hasAudioStream = metadata.streams.some(
        (stream) => stream.codec_type === "audio"
      );
      // ✅ Log progress before resolving the promise
      // console.log("percent complete: 10");
      console.log(`Audio stream found: ${hasAudioStream}`);
      resolve(hasAudioStream);
    });
  });
};

module.exports = { checkAudio };
