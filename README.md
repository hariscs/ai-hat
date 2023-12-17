# AI Hat

A simple application built with Node.js, Express, and ffmpeg using turborepo that allows users to add watermarks to videos. Users can upload a video, and the server applies a watermark to the video using ffmpeg.

## Prerequisites

Before running the application, ensure you have the following installed on your system:

- Node.js
- ffmpeg

## Running the app

Run the following commands:

1. Install dependencies

```sh
npm install
```

2. Set the path to the ffmpeg executable in _apps/api/src/controllers/uploadController.ts_. Update the following line with the correct path:

```js
ffmpeg.setFfmpegPath('/path/to/your/ffmpeg')
```

3. Set the path to the ffmpeg executable in server.ts. Update the following line with the correct path:

```sh
npm run dev
```

This will start the app, api http://localhost:5001 and the frontend on http://localhost:3001.
To test the app use a sample video from the _apps/frontend/public/samples/train.mp4_
