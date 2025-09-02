const request = require('supertest');
const app = require('../src/app');

describe('User API', () => {
    let token;

    it('registers a new user', async () => {
        const res = await request(app)
            .post('/api/register')
            .send({ username: 'jeff', password: '12345' });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User registered');
    });

    it('logs in and returns a token', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'jeff', password: '12345' });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        token = res.body.token;
    });

    it('gets profile with valid token', async () => {
        const res = await request(app)
            .get('/api/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.user.username).toBe('jeff');
    });

    it('rejects profile without token', async () => {
        const res = await request(app)
            .get('/api/profile');
        expect(res.statusCode).toBe(401);
    });

    it('returns 404 for unknown route', async () => {
        const res = await request(app).get('/api/unknown');
        expect(res.statusCode).toBe(404);
    });
});
