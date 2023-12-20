const express = require('express');
const bodyParser = require('body-parser');
const post_router=express();
post_router.use(bodyParser.json());
post_router.use(bodyParser.urlencoded({ extended: true }));
post_router.use(express.static('public'));
const postController = require('../controllers/postController');
post_router.get('/get', postController.getPosts);
post_router.get('/get/:id', postController.getPost);
post_router.post('/create', postController.createPost);
post_router.patch('/update/:id', postController.updatePost);
post_router.delete('/delete/:id', postController.deletePost);
post_router.patch('/apply/:id', postController.applyJob);
module.exports = post_router