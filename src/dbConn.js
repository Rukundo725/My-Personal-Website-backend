import mongoose from 'mongoose';
import 'dotenv/config' 
// connect to mongodb & listen for requests
const connectDb = async () =>{
    try{
        mongoose.connect(process.env.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    }catch(err){
        console.error(err);
    }
}

export default connectDb;
