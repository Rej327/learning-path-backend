import request from 'supertest';
import express, { Express } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import * as fileController from '../src/controllers/fileController';

// Mock io.emit to prevent actual socket emissions
jest.mock('../app', () => ({
    io: { emit: jest.fn() },
}));

const upload = multer({ dest: 'uploads/' });

describe('FileController', () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.post('/upload', upload.single('file'), fileController.uploadFile);
        app.get('/files', fileController.getFiles);
        app.delete('/files/:id', fileController.deleteFile);
    });

    afterAll(() => {
        // Cleanup uploads folder
        const uploadDir = path.join(__dirname, '../uploads');
        if (fs.existsSync(uploadDir)) {
            fs.readdirSync(uploadDir).forEach(file => fs.unlinkSync(path.join(uploadDir, file)));
        }
    });

    it('should upload a file', async () => {
        const res = await request(app)
            .post('/upload')
            .attach('file', Buffer.from('test file'), 'test.txt');

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('filename');
        expect(res.body).toHaveProperty('url');
    });

    it('should return all files', async () => {
        const res = await request(app).get('/files');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should delete a file', async () => {
        const uploadRes = await request(app)
            .post('/upload')
            .attach('file', Buffer.from('delete me'), 'delete.txt');

        const fileId = uploadRes.body.id;

        const res = await request(app).delete(`/files/${fileId}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'File deleted' });
    });

    it('should return 404 if file not found', async () => {
        const res = await request(app).delete('/files/nonexistent-id');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'File not found' });
    });
});
