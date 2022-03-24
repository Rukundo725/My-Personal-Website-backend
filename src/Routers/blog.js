import express from "express";
import {verifyToken} from "./Auth";
import { createArticle, getOneArticle, deleteArticle, updateArticle, getAllArticle} from "../Controllers/blog";


const router = express.Router();

/**
 * @swagger
 * /blog/add:
 *   post:
 *     tags:
 *     - BLOG
 *     summary: Create blog article.
 *     responses:
 *       200:
 *         description: Article created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: blog title.
 *                   example: lorem ipsum
 *                 body:
 *                   type: string
 *                   description: The blog content.
 *                   example: lorem ipsum generator....
 */

router.post("/add", verifyToken, createArticle);
router.get("/:id",  getOneArticle);
router.delete("/:id", verifyToken,  deleteArticle);
router.put("/:id", verifyToken, updateArticle);
router.get("/", getAllArticle);

export default router;

