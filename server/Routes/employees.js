import express from "express";

import {getEmployees, addEmployee, updateEmployee, removeEmployee} from "../Controllers/employees.js";

const router = express.Router();

router.get("/", getEmployees)

router.post("/add", addEmployee)

router.put("/:id", updateEmployee)

router.delete("/:id", removeEmployee)

export default router;