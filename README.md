# KyberVisionVideoUploader03

A Node.js microservice to process uploaded Kyber Vision volleyball match videos.

## Overview

This microservice checks if an uploaded video file contains audio. If no audio is detected, it will process the video by adding a silent audio track. The processed video is then saved to the designated output directory.

## Dependencies

- This microservice relies on `fluent-ffmpeg` for processing videos.

## Important Note

- Even after processing, videos do not show up with metadata indicating that the processed video has audio. However, when streaming to Android devices, the audio appears to work as expected.
