import express from "express";
import {
    getAllGroups,
    getScheduleById
} from "../controllers/groups.js";

const router = express.Router();

router.get("/groups", getAllGroups);
router.get("/schedule", getScheduleById)

export default router;