import express from "express";
import { createMessage } from "../controllers/message.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/", createMessage);

export default router;
