const express = require('express');
const Post = require("../model/post");
const User = require("../model/userSchema")
const verification = require("../protected/protected")
const jwt = require('jsonwebtoken');
const { token } = require('morgan');


const create_post = async (req, res, next) => {

    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }

};



//update the post 
const update_post = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(post.userId);
        if (post.userId == req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }

}




const delete_Post = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.deleteOne();
            res.status(200).json("The post has been deleted ")
        } else {
            res.status(401).json("You are not authorized to perform this action");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


const likeOnPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked ");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


const commentOnPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        await post.updateOne({ $push: { comment_ByUser: req.body.userId } });

        res.status(200).json("The comment has been done on the post  ");

    } catch (error) {
        res.status(500).json(error);
    }

}



const readById = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}



module.exports = { create_post, update_post, delete_Post, readById, likeOnPost, commentOnPost };
