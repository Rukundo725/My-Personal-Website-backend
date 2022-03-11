import Article from "../../models/blog";
//create blog article
export const createArticle = async (req, res) => {
  try {
    await Article.create(req.body);
    res.status(200).json("Article added");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);

  }
};

