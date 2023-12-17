import path from 'node:path'
import { json, urlencoded } from 'body-parser'
import type { Express } from 'express'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import uploadRoute from './routes/uploadRoute'

export const createServer = (): Express => {
  const app = express()

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use('/videos', express.static(path.join(__dirname, 'videos'))) // Serve videos from the 'videos' directory

    .get('/message/:name', (req, res) => {
      return res.json({ message: `hello ${req.params.name}` })
    })
    .get('/status', (_, res) => {
      return res.json({ ok: true })
    })
    .use('/upload', uploadRoute)

  // File upload route
  // app.post('/upload', upload.single('video'), async (req, res) => {
  //   try {
  //     const { buffer } = req.file

  //     const outputDirectory = './videos'
  //     if (!fs.existsSync(outputDirectory)) {
  //       fs.mkdirSync(outputDirectory)
  //     }

  //     const outputVideoPath = `./videos/watermarked-${Date.now()}.mp4`

  //     const readableStream = new Readable()
  //     readableStream.push(buffer)
  //     readableStream.push(null)

  //     const watermarkPath = './watermarks/mars.png'
  //     ffmpeg()
  //       .input(readableStream)
  //       .input(watermarkPath)
  //       .complexFilter(['overlay=10:10'])
  //       .output(outputVideoPath)
  //       .on('end', () => {
  //         console.log('Watermark applied successfully')

  //         const watermarkedVideoUrl = `/videos/${path.basename(
  //           outputVideoPath
  //         )}`

  //         return res.json({
  //           message: 'Video processed successfully',
  //           watermarkedVideoUrl,
  //         })
  //       })
  //       .on('error', (err) => {
  //         console.error('Error applying watermark:', err)
  //         return res.status(500).json({ error: 'Failed to process video' })
  //       })
  //       .run()
  //   } catch (error) {
  //     console.log('Error: ', error)
  //     return res.status(500).json({ error: 'Failed to process video' })
  //   }
  // })

  return app
}
