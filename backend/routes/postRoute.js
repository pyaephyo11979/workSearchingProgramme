const express = require('express');
const bodyParser = require('body-parser');
const auth= require('../middlewares/auth');
const post_router=express();
post_router.use(bodyParser.json());
post_router.use(bodyParser.urlencoded({ extended: true }));
post_router.use(express.static('public'));
const postController = require('../controllers/postController');
post_router.get('/get', postController.getPosts);
post_router.get('/get/:id', postController.getPost);
post_router.post('/create',auth.onlyEmployer, postController.createPost);
post_router.patch('/update/:id',auth.onlyEmployer, postController.updatePost);
post_router.delete('/delete/:id',auth.onlyEmployer, postController.deletePost);
post_router.patch('/apply/:pid',auth.user, postController.applyJob);
post_router.get('/getApplicants/:pid',auth.onlyEmployer, postController.getApplicants);
post_router.patch('/save/:pid',auth.user,postController.saveWork);
module.exports = post_router