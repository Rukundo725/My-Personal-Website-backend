import Message from "../../models/message";
//send messages
export const sendMessage = async (req, res) => {
  try {
    await Message.create(req.body);
    res.status(201).json({ status: "success", code: "201",message: "Message sent" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", code: "500",message: "Message not sent, internal_server_error" });

  }
};

//get All Messages
export const getMessages = async (req, res) => {
  try {
    const allMessages = await Message.find();
    res.status(200).json({status: "success", code: "200", Message: allMessages});
  } catch (error) {
    res.status(500).json({ status: "error", code: "500",message: "Can not get messages, internal_server_error" });
  }
};