import express from "express";

import { login, signup } from "../controllers/auth.js";
import { getAllUsers, updateProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";
// const { cloudinary } = require("../middleware/cloudinary.utils.js");
import cloudinary from "cloudinary";
const { v2: cloudinaryV2 } = cloudinary;
// import User
import User from "../models/auth.js";
cloudinary.config({
  cloud_name: "dtblj84n0",
  api_key: "839517933999776",
  api_secret: "liUXhia42EYH2TrQeXtuxxguF5w",
});

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);
router.patch("/upload", auth, async (req, res) => {
  try {
    // console.log(req.body);
    console.log(req.userId);
    const fileStr = req.body.data;
    // console.log(fileStr);
    const uploadResponse = cloudinary.uploader.upload(fileStr, {
      upload_preset: "ml_default",
    });
    // console.log(uploadResponse);
    if (!uploadResponse) return res.status(404).json({ msg: "Upload failed" });
    // find user
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    // update user
    user.profilePic = req.body.data;
    await user.save();

    res.json({ msg: "Upload success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});
export default router;
