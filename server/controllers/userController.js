import { createRequire } from "module";
const require = createRequire(import.meta.url);
import userModel from "../models/userModel.js";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }


        const token = createToken(user._id);

        res.json({ success: true, token });

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30m" });
};

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists!!" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email!!" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password length must be at least 8 characters!!" });
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPass = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name: name, email: email, password: bcryptPass });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" });
    }
};



export { loginUser, registerUser };
