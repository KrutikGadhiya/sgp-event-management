const express = require('express')
const router = express.Router()
const preEvent = require('../models/preEvent')
const postEvent = require('../models/postEvent')
const User = require('../models/user')
const requireLogin = require('../middleware/requireLogin')

router.post('/preevent', requireLogin, (req, res) => {
    //console.log('details received', req.headers)
    const { userEmail, eventId, eventName, evntType, propDate, propDateTo, durEvnt, evntLevel, orgInst, deptName, inputList} = req.body
    //console.log("USER : ",req.user)
    const pre = new preEvent({
        userEmail,
        eventId,
        eventName,
        evntType,
        propDate,
        propDateTo,
        durEvnt,
        evntLevel,
        orgInst,
        deptName,
        inputList,
        createdBy: req.user
     })
     //preEvent.create(req.body)
     pre.save()
     .then((response) => {
         console.log("ENTRY MADE")
         //res.json(response)
         res.json({message: "PreEvent Details Saved"})
     })
     .catch((err) => {
         console.log(err)
     })
     //console.log(preDetails)
})
    
router.get('/getdetails/:id', async (req, res) => {
    let evnts = []
    //console.log(req.params)
    const id = req.params.id
    //console.log(id)
    // preEvent.findOne({ eventId: req.body.eventId })
    preEvent.findOne({ eventId: id })
    .populate("createdBy", "_id userName email")
    .then((data) => {
        //console.log(data);
        //evnts.push(data)
        postEvent.findOne({eventId: data._id})
        .populate("eventId")
        .then( post => {
            evnts.push(post)
            //console.log("all Details \n",evnts);
            //res.json(evnts)
            let x = post
            //console.log("X", x);
            User.findById(x.eventId.createdBy)
            .then((data) => {
                console.log(data);
                res.json({postDetails: post, user: data})
            })
            .catch( err => {
                console.log(err);
                res.json({error: "Something Went Wrong!!"})
            })
        })
        .catch( err => {
            console.log(err)
            res.json({error: "Make Sure The Post Event Is Added"})
        })
    })
    .catch((err) => {
        console.log(err)
        res.json({error: "Something Went Wrong!! Make Sure The Event ID is correct"})
    })
})

module.exports = router