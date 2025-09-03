import express from 'express';
import multer from 'multer';
import path from 'path';
import {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
} from '../controllers/postController';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, 'uploads/'),
    filename: (_req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });
router.post('/', upload.single('file'), createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.put('/:id', upload.single('file'), updatePost);
router.delete('/:id', deletePost);

export default router;
