const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const router = require('./getCount')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')

const JWT_SECRET = 'ahwifbdoajxcvbneiajvcebp'


router.get('/protected',requireLogin ,(req, res) => {
    res.send('Hello User')
})


router.post('/saveUser', (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body
    if(!email || !password || !name){
        return res.status(422).json({error: "please add all the fields!"})
    }
    User.findOne({email: email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error: "User already Exists with this email"})
        } else {
            bcrypt.hash(password, 12)
            .then( hashedPassword => {
                const user = new User({
                    email,
                    userName: name,
                    password: hashedPassword
                })
    
                user.save()
                .then( user => {
                    res.json({message: "User Saved Successfully"})
                })
                .catch( err => {
                    console.log(err);
                })
            })
        }
    })
    .catch( err => {
        console.log(err);
    })
    // res.json({message: "Successfully Added"})
})

router.post('/userSignin', (req, res) => {
    const { email, password } = req.body
    if(!email || !password){
        return res.status(422).json({error: "please add email or Password!"})
    }
    User.findOne({email: email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error: "Invalid email or Password!"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch){
                // res.json({message: "Successfully Signed IN"})

                const token = jwt.sign({ id: savedUser._id}, JWT_SECRET)
                res.json({token: token})
            }
            else{
                return res.status(422).json({error: "Invalid email or Password!"})
            }
        })
        .catch( err => {
            console.log(err);
        })
    })
    .catch( err => {
        console.log(err);
    })
})
module.exports = router