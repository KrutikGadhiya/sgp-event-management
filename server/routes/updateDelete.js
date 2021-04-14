const express = require('express')
const router = express.Router()
const preEvent = require('../models/preEvent')
const postEvent = require('../models/postEvent')
const User = require('../models/user')
const requireLogin = require('../middleware/requireLogin')

router.post('/deleteEvent/', requireLogin, (req, res) => {
    console.log("PARAMS : ", req.body)
    const { uId, preId, postId } = req.body

    res.json({ message: "deleted"})
})
    
router.get('/updateEvent/:id', async (req, res) => {

})

module.exports = router