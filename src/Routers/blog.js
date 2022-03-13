import express from "express";
import { createArticle, getOneArticle, deleteArticle } from "../Controllers/blog";


const router = express.Router();

router.post("/add", createArticle);
router.get("/:id", getOneArticle);
router.delete("/:id", deleteArticle);





export default router;

