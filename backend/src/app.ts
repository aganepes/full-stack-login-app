import 'dotenv/config';
import Express,{ Request , Response } from 'express';
import cors from 'cors';
import authRoutes from './routers/auth.routes';
import cookieParser from 'cookie-parser';

const app = Express();

app.use(cors({
    origin:["http://localhost:5173","*"],
    credentials:true
}));
app.use(cookieParser());
app.use(Express.json());

app.use('/api/auth',authRoutes);

app.get('/',(req:Request,res:Response)=>{
    res.send('Auth API is working!');
});

export default app;