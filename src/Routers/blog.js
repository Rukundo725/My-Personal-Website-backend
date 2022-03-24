import express from "express";
import {verifyToken} from "./Auth";
import { createArticle, getOneArticle, deleteArticle, updateArticle, getAllArticle} from "../Controllers/blog";


const router = express.Router();


router.post("/add", verifyToken, createArticle);
/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     tags:
 *     - BLOG
 *     summary: Retrieve a single blog article.
 *     description: Retrieve a single blog can be used to show Visitors blog article from API to blog page.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the blog article to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
 */
router.get("/:id",  getOneArticle);
router.delete("/:id", verifyToken,  deleteArticle);
router.put("/:id", verifyToken, updateArticle);
router.get("/", getAllArticle);

export default router;

