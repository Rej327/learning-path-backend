import request from 'supertest';
import fs from 'fs';
import path from 'path';
import express from 'express';
import postRoutes from '../routes/postRoutes';

const app = express();
app.use('/uploads', express.static('uploads'));
app.use('/posts', postRoutes);

describe('Post Controller', () => {
    let postId: string;
    const testFilePath = path.join(__dirname, 'test.jpg');

    beforeAll(() => {
        fs.writeFileSync(testFilePath, 'dummy content');
    });

    afterAll(() => {
        if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
    });

    it('should create a post', async () => {
        const res = await request(app)
            .post('/posts')
            .field('caption', 'Controller Test')
            .attach('file', testFilePath);
        expect(res.status).toBe(201);
        expect(res.body.caption).toBe('Controller Test');
        postId = res.body.id;
    });

    it('should fail to create post without file', async () => {
        const res = await request(app).post('/posts').field('caption', 'No file');
        expect(res.status).toBe(400);
    });

    it('should get all posts', async () => {
        const res = await request(app).get('/posts');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get single post', async () => {
        const res = await request(app).get(`/posts/${postId}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(postId);
    });

    it('should return 404 for non-existent post', async () => {
        const res = await request(app).get('/posts/fake-id');
        expect(res.status).toBe(404);
    });

    it('should update post caption', async () => {
        const res = await request(app)
            .put(`/posts/${postId}`)
            .field('caption', 'Updated Caption');
        expect(res.status).toBe(200);
        expect(res.body.caption).toBe('Updated Caption');
    });

    it('should update post file', async () => {
        const res = await request(app)
            .put(`/posts/${postId}`)
            .attach('file', testFilePath);
        expect(res.status).toBe(200);
        expect(res.body.fileUrl).toContain('uploads');
    });

    it('should fail to update non-existent post', async () => {
        const res = await request(app)
            .put('/posts/fake-id')
            .field('caption', 'Fail Update');
        expect(res.status).toBe(404);
    });

    it('should delete post successfully', async () => {
        const res = await request(app).delete(`/posts/${postId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Post deleted successfully');
    });

    it('should fail to delete non-existent post', async () => {
        const res = await request(app).delete('/posts/fake-id');
        expect(res.status).toBe(404);
    });
});
