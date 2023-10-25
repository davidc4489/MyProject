import express from "express";

import {getStat, getStatByPercent} from "../Controllers/statistics.js";

const router = express.Router();

router.get("/", getStat)
router.get("/ByPercent", getStatByPercent)

export default router;