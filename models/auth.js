import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
  profilePic: {
    type: String,
    default:
      "https://res.cloudinary.com/dtblj84n0/image/upload/v1684576903/bdvjeba45jhmts0oqnqy.png",
  },
});

export default mongoose.model("User", userSchema);
