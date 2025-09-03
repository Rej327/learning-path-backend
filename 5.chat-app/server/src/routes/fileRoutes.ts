import { Router } from 'express';
import { uploadFile, getFiles, deleteFile } from '../controllers/fileController';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

router.post('/', upload.single('file'), uploadFile);
router.get('/', getFiles);
router.delete('/:id', deleteFile);

export default router;
