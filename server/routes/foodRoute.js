import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
import { addFood, listFood,removeFood } from "../controllers/foodController.js";

const multer = require('multer');
const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage});

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);


export default foodRouter;