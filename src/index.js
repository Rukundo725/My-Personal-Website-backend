import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import connectDb from './dbConn'
// import routes from './Routers/index'


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 7000;

// Connect to MongoDB
connectDb();



// app.use('/', routes);


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
});

export default app;