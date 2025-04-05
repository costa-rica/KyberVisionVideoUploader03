const ffmpeg = require("fluent-ffmpeg");

const checkAudio = (filePath) => {
  console.log("--- 5 inside checkAudio ---");
  return new Promise((resolve, reject) => {
    console.log("--- 6 inside Promise ---");
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);

      const hasAudioStream = metadata.streams.some(
        (stream) => stream.codec_type === "audio"
      );
      // ✅ Log progress before resolving the promise
      console.log("percent complete: 10");
      resolve(hasAudioStream);
    });
  });
};

module.exports = { checkAudio };
