import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const cors = require("cors");
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
const dotenv = require("dotenv");
dotenv.config();
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.get("/" ,(req,res) => {
    res.send("API WORKING");
})

connectDB();

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.listen(port,()=>{
    console.log(` Running at ${port}`);
});


