const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//@desc register user
//@route POST /api/users/register
//@access public
const register = asyncHandler(async (req,res) => {
    const {username, email, password} = req.body

    //check user input
    if(!username || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exists
    if(await User.findOne({email})){
        res.status(400)
        throw new Error('Email used by another user')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            username,
            email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid input')
    }
})

//@desc login user
//@route POST /api/users/login
//@access public
const login = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    //check if user exists
    const userExists = await User.findOne({email})

    if(userExists && await bcrypt.compare(password, userExists.password)){
        res.status(200).json({
            _id: userExists.id,
            username: userExists.username,
            email: userExists.email,
            token: generateToken(userExists._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

function generateToken(id){
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    register,
    login
}
