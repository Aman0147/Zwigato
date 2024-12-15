import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
import authMiddleWare from "../middleware/auth.js";
import { listOrders, placeOrder, updateStatus, userOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();
orderRouter.post("/place",authMiddleWare,placeOrder);
orderRouter.post("/userOrders",authMiddleWare,userOrders)
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);
export default orderRouter;