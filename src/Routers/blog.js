import express from "express";
import { createArticle, getOneArticle, deleteArticle, updateArticle,} from "../Controllers/blog";


const router = express.Router();

router.post("/add", createArticle);
router.get("/:id", getOneArticle);
router.delete("/:id", deleteArticle);
router.put("/:id", updateArticle);





export default router;

