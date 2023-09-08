const express = require("express");
const router = express.Router();

const { postController } = require("../controllers");

router.post("/createposts", postController.createPosts);

module.exports = router;
