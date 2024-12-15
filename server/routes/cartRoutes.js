import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
import { addToCart,getCart,removeFromCart } from "../controllers/cartController.js";
import authMiddleWare from "../middleware/auth.js";

const cartRouter = express.Router();
cartRouter.post("/add",authMiddleWare,addToCart);
cartRouter.post("/remove",authMiddleWare,removeFromCart);
cartRouter.post("/get",authMiddleWare,getCart);

export default cartRouter;