/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable camelcase */
import { Readable } from 'node:stream'
import fs from 'node:fs'
import path from 'node:path'
import ffmpeg from 'fluent-ffmpeg'
import { Router } from 'express'

ffmpeg.setFfmpegPath('/Users/haris/Downloads/ffmpeg')

const router = Router()

export const upload_controller = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const { buffer } = req?.file

    const output_directory = './videos'
    if (!fs.existsSync(output_directory)) {
      fs.mkdirSync(output_directory)
    }

    const output_video_path = `./videos/watermarked-${Date.now()}.mp4`

    const readable_stream = new Readable()
    readable_stream.push(buffer)
    readable_stream.push(null)

    const watermark_path = './watermarks/mars.png'
    ffmpeg()
      .input(readable_stream)
      .input(watermark_path)
      .complexFilter(['overlay=10:10'])
      .output(output_video_path)
      .on('end', () => {
        console.log('Watermark applied successfully')

        const watermarked_video_url = `/videos/${path.basename(
          output_video_path
        )}`

        return res.json({
          message: 'Video processed successfully',
          watermarked_video_url,
        })
      })
      .on('error', (err) => {
        console.error('Error applying watermark:', err)
        return res.status(500).json({ error: 'Failed to process video' })
      })
      .run()
  } catch (error) {
    console.log('Error: ', error)
    return res.status(500).json({ error: 'Failed to process video' })
  }
}

export default router
