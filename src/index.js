import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import authRoute from "./Routers/Auth";
import Jwt from 'jsonwebtoken';
import verifyToken from "./Routers/Auth";
import connectDb from './dbConn';
import blogRoute from "./Routers/blog";

const app = express();

// Connect to MongoDB
connectDb();


// middleware 
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/user', authRoute);
app.use('/api/blog', blogRoute);
const port = 4000;

// Connect to MongoDB
connectDb();
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(process.env.port || port, () => console.log(`Server running on port ${port}`));
});

export default app;

