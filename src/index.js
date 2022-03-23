import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoute from "./Routers/Auth";
import connectDb from './dbConn';
import blogRoute from "./Routers/blog";
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
const port = process.env.PORT ||4000;

// Connect to MongoDB
connectDb();
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen( port, () => console.log(`Server running on port ${port}`));
});

export default app;

