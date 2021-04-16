const express = require('express')
const router = express.Router()
const preEvent = require('../models/preEvent')
const postEvent = require('../models/postEvent')
const User = require('../models/user')
const requireLogin = require('../middleware/requireLogin')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

router.post('/deleteEvent/', requireLogin, (req, res) => {
    console.log("PARAMS : ", req.body)
    const { uId, preId, postId } = req.body

    preEvent.findByIdAndDelete({ _id: preId })
    .then(() => {
        postEvent.findByIdAndDelete({ _id: postId })
        .then(() => {
            res.json({message: "Event Successfully Deleted"})
        })
        .catch( err => {
            console.log(err)
            res.json({error: "Make Sure Post Event is Added"})
        })
    })
    .catch( err => {
        console.log(err)
        res.json({error: "Make Sure the Event Id is Correct"})
    })
})

router.post('/updateEvent', (req, res) => {
    console.log(req.body);
    const { pre, post } = req.body

    preEvent.findOneAndUpdate({ eventId: pre.eventId }, {
        $set: pre
    }, { useFindAndModify: false })
        .then((data) => {
            console.log("OLD PRE EVENT: ", data);
            postEvent.findOneAndUpdate({ eventId: data._id }, {
                $set: post
            }, { new: true, useFindAndModify: false })
                .then(response => {
                    console.log("OLD POST EVENT: ", response);
                    res.json({ message: "Updated!!!" })
                })
                .catch( err => {
                    console.log(err);
                    res.json({error: "Someting Went Wrong!!"})
                })
        })
        .catch(err => {
            console.log(err);
            res.json({error: "Someting Went Wrong!!"})
        })

})

module.exports = router