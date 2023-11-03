const express = require('express');
const router = express.Router();
const { loginRequired } = require('../utils/auth');
const { postController } = require('../controllers');
const { upload } = require('../utils/s3.js');

router.post('', loginRequired, postController.createPosts);
router.get('/getAllPosts', postController.getAllPosts);
router.get('/getMyPosts', loginRequired, postController.getMyPosts);
router.get('/:postId', postController.getUserPosts);
router.post('/like/:postId', loginRequired, postController.likePostById);
router.get('/getLikePostByMe', loginRequired, postController.getLikePostByMe);
router.get('/getTemporaryPost', loginRequired, postController.getTemporaryPost);
router.patch('/:postId', loginRequired, postController.modifyPostById);
router.delete('', loginRequired, postController.deletePost);
router.post('/addComment', loginRequired, postController.addComment);
router.get('/:postId/getComment', postController.getComment);
router.post('/image', upload.single('image'), postController.uploadPostImage);
module.exports = router;
