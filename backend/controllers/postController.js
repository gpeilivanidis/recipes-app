const Post = require('../models/postModels')
const asyncHandler = require('express-async-handler')

//@desc create post
//@route POST /api/posts/
//@access private
const createPost = asyncHandler(async (req,res) => {
    const {title, body, ingredients} = req.body

    //check user input
    if(!title || !body || !ingredients){
        res.status(400)
        throw new Error('Please add a title, a body and some ingredients')
    }

    const post = await Post.create({
        title,
        body,
        ingredients,
        author: req.user.id
    })

    if(post){
        res.status(201).json(post)
    } else {
        res.status(400)
        throw new Error('Invalid input')
    }
})

//@desc get posts
//@route GET /api/posts/
//@access public
const getPosts = asyncHandler(async (req,res) => {
    const { searchQuery } = req.body

    //if no search input, return 10 recent posts
    if(!searchQuery){
        const posts = await Post.find().sort({createdAt: 1}).limit(10)
        res.status(200).json(posts)
    } else {
        const posts = await Post.find({
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { body: { $regex: searchQuery, $options: "i" } },
                { ingredients: { $regex: searchQuery, $options: "i" } }
            ]
        }).limit(10)
        res.status(200).json(posts)
    }
})

//@desc update post
//@route PUT /api/posts/:id
//@access private
const updatePost = asyncHandler(async (req,res) => {

    const post = await Post.findById(req.params.id)

    //check if post exists
    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }
    
    //check if user is owner of post
    if(req.user.id !== post.author.toString()){
        res.status(401)
        throw new Error('Not authorized')
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})

    if(updatedPost){
        res.status(200).json(updatedPost)
    } else {
        res.status(400)
        throw new Error('Invalid input')
    }
})

//@desc delete post
//@route DELETE /api/posts/:id
//@access private
const deletePost = asyncHandler(async (req,res) => {

    const post = await Post.findById(req.params.id)

    //check if post exists
    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }
    
    //check if user is owner of post
    if(req.user.id !== post.author.toString()){
        res.status(401)
        throw new Error('Not authorized')
    }

    const deleted = await Post.findByIdAndDelete(req.params.id)

    if(deleted){
        res.status(200).json(deleted)
    } else {
        res.status(400)
        throw new Error('Something went wrong, your post was not deleted, try again later')
    }
})

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost
}
