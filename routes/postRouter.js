const express = require("express");
const router = express.Router();
const { loginRequired } = require("../utils/auth");

const { postController } = require("../controllers");

router.post("/createposts", loginRequired, postController.createPosts);
router.get("/getAllPosts", postController.getAllPosts);
router.get("/getMyPosts", loginRequired, postController.getMyPosts);
router.get("/getUserPosts", postController.getUserPosts);
router.post("/like/:postId", loginRequired, postController.likePostById);
router.get("/getLikePostByMe", loginRequired, postController.getLikePostByMe);
router.get("/getTemporaryPost", loginRequired, postController.getTemporaryPost);
router.patch("/:postId", loginRequired, postController.modifyPostById);
router.delete("/:postId", loginRequired, postController.deletePost);
router.post("/addComment", loginRequired, postController.addComment);
router.get("/:postId/getComment", postController.getComment);

module.exports = router;
