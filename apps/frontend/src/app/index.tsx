import * as React from 'react'
import './styles.css'
import { CounterButton, Link } from '@repo/ui'
import FileUpload from '../components/file-upload'

function App(): JSX.Element {
  return (
    <div className='container'>
      <FileUpload />
    </div>
  )
}

export default App
