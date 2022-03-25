import Article from "../../models/blog.js";
//create blog article
export const createArticle = async (req, res) => {
  try {
    await Article.create(req.body);
    res.status(201).json({ status: "Created", code: "201",message: "Article added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", code: "500",message: "internal_server_error" });

  }
};

//get one Article
export const getOneArticle = async (req, res) => {
  try {
    const oneArticle = await Article.findOne({ _id: req.params.id });
    res.status(200).json({status: "success", code: "200", Article: oneArticle});
  } catch (error) {
    res.status(500).json({ status: "error", code: "500",message: "internal_server_error" });
  }
};

//delete Article
export const deleteArticle = async (req, res) => {
  try {
    await Article.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ status: "success", code: "200",message: "Article is deleted" });
  } catch (error) {
    res.status(500).json({status: "error", code: "500" , error: "Internal server error", message: "Article not found"});
  }
};


//update Article
export const updateArticle = async (req, res) => {
  try {
    await Article.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", code: "200",message: "Article is Updated" });
  } catch (error) {
    res.status(500).json({ status: "error", code: "500",message: "internal_server_error", message: "Article not found" });
  }
};

//get All posts
export const getAllArticle = async (req, res) => {
  try {
    const allArticle = await Article.find();
    res.status(200).json({status: "success", code: "200", Articles: allArticle});
  } catch (error) {
    res.status(500).json({ status: "error", code: "500",message: "internal_server_error" });
  }
};