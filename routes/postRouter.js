const express = require("express");
const router = express.Router();

const { postController } = require("../controllers");

router.post("/createposts", postController.createPosts);
router.get("/getAllPosts", postController.getAllPosts);

module.exports = router;
