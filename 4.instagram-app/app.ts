import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use('/posts', postRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
