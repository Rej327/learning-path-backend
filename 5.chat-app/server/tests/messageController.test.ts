import request from 'supertest';
import express, { Express } from 'express';
import * as messageController from '../src/controllers/messageController';

// Mock io.emit to prevent actual socket emissions
jest.mock('../app', () => ({
    io: { emit: jest.fn() },
}));

describe('MessageController', () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.post('/messages', messageController.createMessage);
        app.get('/messages', messageController.getMessages);
        app.delete('/messages/:id', messageController.deleteMessage);
    });

    it('should create a message', async () => {
        const res = await request(app)
            .post('/messages')
            .send({ content: 'Hello World' });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('content', 'Hello World');
        expect(res.body).toHaveProperty('createdAt');
    });

    it('should get all messages', async () => {
        const res = await request(app).get('/messages');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should delete a message', async () => {
        const createRes = await request(app)
            .post('/messages')
            .send({ content: 'Delete me' });

        const messageId = createRes.body.id;

        const res = await request(app).delete(`/messages/${messageId}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'Message deleted' });
    });

    it('should return 404 if message not found', async () => {
        const res = await request(app).delete('/messages/nonexistent-id');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'Message not found' });
    });
});
