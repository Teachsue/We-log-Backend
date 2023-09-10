const express = require("express");
const router = express.Router();

const { postController } = require("../controllers");

router.post("/createposts", postController.createPosts);
router.get("/getAllPosts", postController.getAllPosts);
router.get("/getMyPosts", postController.getMyPosts);
router.get("/getUserPosts", postController.getUserPosts);
router.post("/like/:postId", postController.likePostById);
router.get("/getLikePostByMe", postController.getLikePostByMe);
router.get("/getTemporaryPost", postController.getTemporaryPost);
router.patch("/:postId", postController.modifyPostById);
router.delete("/:postId", postController.deletePost);
router.post("/addComment", postController.addComment);
router.get("/:postId/getComment", postController.getComment);

module.exports = router;
