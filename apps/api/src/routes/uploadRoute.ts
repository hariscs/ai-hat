import multer from 'multer'
import { Router } from 'express'
import { upload_controller } from '../controllers/uploadController'

const upload = multer({
  storage: multer.memoryStorage(),
})

const router = Router()

router.post('/', upload.single('video'), upload_controller)

export default router
