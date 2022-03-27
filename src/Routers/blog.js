import express from "express";
import {verifyToken} from "./Auth";
import { createArticle, getOneArticle, deleteArticle, updateArticle, getAllArticle} from "../Controllers/blog";


const router = express.Router();


router.post("/add", verifyToken, createArticle);
router.get("/:id",  getOneArticle);
router.delete("/:id", verifyToken,  deleteArticle);
router.put("/:id", verifyToken, updateArticle);
router.get("/", getAllArticle);

export default router;

