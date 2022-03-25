import express from "express";
import {verifyToken} from "./Auth";
import { sendComment, getComments} from "../Controllers/comment";

const router = express.Router();

router.post("/comment", sendComment);
router.get("/", verifyToken, getComments);

export default router;

