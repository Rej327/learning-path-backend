import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import messageRoutes from './src/routes/messageRoutes';
import fileRoutes from './src/routes/fileRoutes';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(express.json());
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

app.use('/messages', messageRoutes);
app.use('/files', fileRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: '*' },
});

io.on('connection', socket => {
    console.log('Client connected:', socket.id);

    socket.on('newMessage', message => {
        io.emit('messageReceived', message);
    });

    socket.on('newFile', file => {
        io.emit('fileUploaded', file);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export { io };
export default app;
