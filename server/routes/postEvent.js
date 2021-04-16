const express = require('express')
const router = express.Router()
const postEvent = require('../models/postEvent')
const preEvent = require('../models/preEvent')
const requireLogin = require('../middleware/requireLogin')

router.post('/postEvent', requireLogin, (req, res) => {
    let preEventRef
    //console.log(req.body);
    //console.log('details received', req.headers)
    const { userEmail, eventId, eventName, evntType, propDate, propDateTo, durEvnt, evntLevel, orgInst, deptName, inputList} = req.body
    //console.log("ID : ", eventId)

    preEvent.findOne({eventId: eventId})
    .then( pre => {
        preEventRef = pre
        //console.log("PREEVNT: ", preEventRef)

        const post = new postEvent({
            eventId: preEventRef._id,
            actDate: req.body.actDate,
            actDateTo: req.body.actDateTo,
            evntDesc: req.body.evntDesc,
            noOfStud: req.body.noOfStud,
            evntPic1: req.body.evntPic1,
            evntPic2: req.body.evntPic2,
            evntPic3: req.body.evntPic3,
            evntPic4: req.body.evntPic4,
            evntCerti: req.body.evntCerti,
            evntPstr: req.body.evntPstr,
            studSheet: req.body.studSheet,
            inputList: req.body.inputList
         })
         //preEvent.create(req.body)
         post.save()
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
    .catch( err => {
        console.log(err)
    })

})
    
// router.get('/getdetails/:id', async (req, res) => {
//     //console.log(req.params)
//     const id = req.params.id
//     //console.log(id)
//     // preEvent.findOne({ eventId: req.body.eventId })
//     preEvent.findOne({ eventId: id })
//     .then((data) => {
//         console.log(data);
//         res.send(data)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

module.exports = router