import express from 'express';
import * as path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

const envPath =
  process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, '../.env') // For dist
    : path.resolve(__dirname, './.env'); // For src

dotenv.config({ path: envPath });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/auth', authRoutes);


const PORT: number = parseInt(process.env.PORT || '5000', 10);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});