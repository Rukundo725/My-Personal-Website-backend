import express from "express";
import {
  createArticle} from "../Controllers/blog";


const router = express.Router();

router.post("/add", createArticle);




export default router;

