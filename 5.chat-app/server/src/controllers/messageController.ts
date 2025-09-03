import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { io } from '../../app';
interface Message {
  id: string;
  content: string;
  createdAt: Date;
}

const messages: Message[] = [];

export const createMessage = (req: Request, res: Response) => {
  const { content } = req.body;
  const message = { id: uuidv4(), content, createdAt: new Date() };
  messages.push(message);

  io.emit('messageReceived', message);
  res.status(201).json(message);
};

export const getMessages = (req: Request, res: Response) => {
  res.json(messages);
};

export const deleteMessage = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = messages.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: 'Message not found' });
  messages.splice(index, 1);
  res.status(200).json({ message: 'Message deleted' });
};
