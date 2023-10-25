import express from "express";

import {getTables, addTable, updateTable, removeTable} from "../Controllers/tables.js";

const router = express.Router();

router.get("/", getTables)

router.post("/add", addTable)

router.put("/:id", updateTable)

router.delete("/:id", removeTable)

export default router;