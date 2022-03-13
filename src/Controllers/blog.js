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

//get one Article
export const getOneArticle = async (req, res) => {
  try {
    const oneArticle = await Article.findOne({ _id: req.params.id });
    res.status(200).json(oneArticle);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete Article
export const deleteArticle = async (req, res) => {
  try {
    await Article.findOneAndDelete({ _id: req.params.id });
    res.status(200).json("Article is deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};


//update Article
export const updateArticle = async (req, res) => {
  try {
    await Article.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json("Article updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

//get All posts
export const getAllArticle = async (req, res) => {
  try {
    const allArticle = await Article.find();
    res.status(200).json(allArticle);
  } catch (error) {
    res.status(500).json(error);
  }
};