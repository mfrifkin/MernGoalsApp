const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc register new user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req,res)=>{
    const {name, password, email} = req.body;
    if(!name || !password || !email){
        res.status(400)
        throw new Error('please enter all fields')
    }

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400)
        throw new Error('user already exists ')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password:  hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('invalid user data')
    }

})

// @desc log in the user
// @route POST  /api/users/login
// @access Public
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email})

    // need bcrypt because we need to salt and hash before comparer
    // not sure how bcrypt knows which salt to use though...???**
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id: user.id,
            email: user.email,
            name: user.name,
            token: generateToken(user._id) 
        })
    } else {
        res.status(400)
        throw new Error('invalid credentials')
    }

    

})

// @desc get current user
// @route GET  /api/users/me
// @access Private
const getMe = asyncHandler(async (req,res)=>{
    // req.user gets set in protect from the token
    // so will contain whatever user is logged in
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name, 
        email
    })

})

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,  {expiresIn: '30d'})
     
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}