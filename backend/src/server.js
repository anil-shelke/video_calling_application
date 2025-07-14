import express from "express"
import dotenv from "dotenv"
import authRoutes from './routes/auth.route.js'
import connectDB from "./lib/db.js";
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.route.js'
import chatRoutes from './routes/chat.route.js'
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json());
app.use(cookieParser())

connectDB();

app.get('/',(req, res) => {
    res.send("Hello world")
})

app.use('/api/auth', authRoutes)
app.use('/api/users',userRoutes)
app.use("/api/chat",chatRoutes);


app.listen(PORT, () =>{
    console.log(`application started on the port ${PORT}`)
})
