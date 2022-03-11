import express from "express";
import { createArticle, getOneArticle } from "../Controllers/blog";


const router = express.Router();

router.post("/add", createArticle);
router.get("/:id", getOneArticle);




export default router;

