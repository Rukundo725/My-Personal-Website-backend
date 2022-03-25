import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  email: {
    type: String,
    required: true
  },
 
  comment: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;