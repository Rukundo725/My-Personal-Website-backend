import mongoose from 'mongoose';
// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://owner:owner123@cluster0.zqwo7.mongodb.net/MyPersonalWebsite?retryWrites=true&w=majority";
const connectDb = async () =>{
    try{
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    }catch(err){
        console.error(err);
    }
}

export default connectDb;






//   .then(result => app.listen(3000))
//   .catch(err => console.log(err));