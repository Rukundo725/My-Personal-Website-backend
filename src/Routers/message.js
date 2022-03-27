import express from "express";
import {verifyToken} from "./Auth";
import { sendMessage, getMessages} from "../Controllers/message";

const router = express.Router();


router.post("/send", sendMessage);
router.get("/", verifyToken, getMessages);

export default router;

