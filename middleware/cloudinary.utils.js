require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: dtblj84n0,
  api_key: 839517933999776,
  api_secret: liUXhia42EYH2TrQeXtuxxguF5w,
});

module.exports = { cloudinary };
