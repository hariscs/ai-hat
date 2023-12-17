/* eslint-disable react/function-component-definition */
import React, { useState } from 'react'
import './styles.css'

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [watermarkedVideoUrl, setWatermarkedVideoUrl] = useState<string | null>(
    null
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setWatermarkedVideoUrl(null)
      setError(null)
      setLoading(true)

      const formData = new FormData()
      formData.append('video', selectedFile)

      fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Upload successful:', data)
          if (data.watermarked_video_url) {
            setWatermarkedVideoUrl(data.watermarked_video_url)
            setError(null)
          } else {
            setError('Failed to retrieve the watermarked video URL.')
          }
        })
        .catch((uploadError) => {
          console.error('Error uploading file:', uploadError)
          setError('Failed to upload the file.')
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <div className='file-upload-container'>
      <h1>File Upload</h1>

      <label className='file-input-label' htmlFor='videoFile'>
        Choose a video file:
        <input
          accept='video/*'
          id='videoFile'
          onChange={handleFileChange}
          required
          type='file'
        />
      </label>

      {loading ? <p className='loading-message'>Uploading...</p> : null}
      {error ? <p className='error-message'>{error}</p> : null}

      {/* {watermarkedVideoUrl && ( */}
      <div className='video-container'>
        <h2>Watermarked Video</h2>
        <video
          autoPlay
          className='watermarked-video'
          controls
          muted
          width='400'
        >
          <source src={watermarkedVideoUrl} type='video/mp4' />
          {/* <source
            src=''
            type='video/mp4'
          /> */}
        </video>
      </div>
      {/* )} */}
    </div>
  )
}

export default FileUpload
