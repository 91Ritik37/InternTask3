const express = require('express');
const router = express.Router();
const verification = require("../protected/protected")

const { create_post, update_post, delete_Post, readById, likeOnPost, commentOnPost } = require('../controllers/postController');

router.post("/create_post", verification, create_post);

router.put('/update_post/:id', verification, update_post);

router.delete('/delete_post/:id', verification, delete_Post)

router.get("/posts/:id", verification, readById);

router.put("/:id/likes", verification, likeOnPost);

router.put("/:id/comment", verification, commentOnPost);

module.exports = router;