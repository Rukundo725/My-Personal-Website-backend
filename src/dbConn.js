import mongoose from 'mongoose';
import 'dotenv/config' 
import express from 'express'
// connect to mongodb & listen for requests
const connectDb = async () =>{
    try{
        mongoose.connect(process.env.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }); await parseAndLoadPlanetsData();
    }catch(err){
        console.error(err);
    }
}

export default connectDb;
