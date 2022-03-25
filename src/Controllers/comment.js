import Comment from "../../models/comment";
//send comments
export const sendComment = async (req, res) => {
  try {
    await Comment.create(req.body);
    res.status(201).json({ status: "success", code: "201",message: "Your comment is highly appreciated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", code: "500",message: "Comment not sent, internal_server_error" });

  }
};

//get All Comments
export const getComments = async (req, res) => {
  try {
    const allComments = await Comment.find();
    res.status(200).json({status: "success", code: "200", message: allComments});
  } catch (error) {
    res.status(500).json({ status: "error", code: "500",message: "Can not get Comments, internal_server_error" });
  }
};