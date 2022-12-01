const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc Register User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please Add all Fields')
    }

    //Check if user exists
    
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    //Hash Password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

//@desc Authenticate User
//@route POST /api/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    res.json({message: 'Login User'})
})

//@desc Get User Data
//@route GET /api/users/me
//@access Private
const getUser = asyncHandler(async (req, res) => {
    res.json({message: 'Display User Data'})
})

module.exports = {
    registerUser,
    loginUser,
    getUser,
}