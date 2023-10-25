import express from "express";

import {getCustomers, addCustomer, updateCustomer, removeCustomer, getCustomerOrder, updateOrderCustomer} from "../Controllers/customers.js";

const router = express.Router();

router.get("/", getCustomers)
router.get("/:id", getCustomerOrder)

router.post("/add", addCustomer)

router.put("/:id", updateCustomer)
router.put("/OrdersList/:id", updateOrderCustomer)

router.delete("/:id", removeCustomer)

export default router;