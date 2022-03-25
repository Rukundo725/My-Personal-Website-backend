import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import connectDb from './dbConn';
import authRoute from "./Routers/Auth";
import blogRoute from "./Routers/blog";
import commentRoute from "./Routers/comment";
import messageRoute from "./Routers/message";
import cors from "cors";

const app = express();

// Connect to MongoDB
connectDb();


// middleware 
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/user', authRoute);
app.use('/api/blog', blogRoute);
app.use('/api/comment', commentRoute);
app.use('/api/message', messageRoute);
const port = process.env.PORT ||4000;

// Connect to MongoDB
connectDb();
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen( port, () => console.log(`Server running on port ${port}`));
});

export default app;

