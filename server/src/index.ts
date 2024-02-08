import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './config/db.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', routes());
connect().then(() => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`server started on  http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.log("🚀 ~ connect ~ error:", error)
        
    }
})


