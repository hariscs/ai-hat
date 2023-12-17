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
    const selectedFile = e?.target?.files?.[0]
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
          if (data.watermarkedVideoUrl) {
            setWatermarkedVideoUrl(data.watermarkedVideoUrl)
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

      <label htmlFor='videoFile' className='file-input-label'>
        Choose a video file:
        <input
          type='file'
          id='videoFile'
          accept='video/*'
          onChange={handleFileChange}
          required
        />
      </label>

      {loading && <p className='loading-message'>Uploading...</p>}
      {error && <p className='error-message'>{error}</p>}

      {/* {watermarkedVideoUrl && ( */}
      <div className='video-container'>
        <h2>Watermarked Video</h2>
        <video
          width='400'
          controls
          autoPlay
          muted
          className='watermarked-video'
        >
          <source src={watermarkedVideoUrl} type='video/mp4' />
          {/* <source
            src=''
            type='video/mp4'
          /> */}
          Your browser does not support the video tag.
        </video>
      </div>
      {/* )} */}
    </div>
  )
}

export default FileUpload
