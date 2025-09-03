import { Router } from 'express';
import { createMessage, getMessages, deleteMessage } from '../controllers/messageController';

const router = Router();

router.post('/', createMessage);
router.get('/', getMessages);
router.delete('/:id', deleteMessage);

export default router;
