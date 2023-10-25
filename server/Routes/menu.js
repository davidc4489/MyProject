import express from "express";

import {getMenu, addDish, updateDish, removeDish} from "../Controllers/menu.js";

const router = express.Router();

router.get("/", getMenu)

router.post("/add", addDish)

router.put("/:id", updateDish)

router.delete("/:id", removeDish)

export default router;