const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const PostEventSchema = mongoose.Schema({
    eventId: {
        type: ObjectId,
        ref: "PreEvent"
    },
    actDate: {
        type: String
    },
    actDateTo: {
        type: String
    },
    evntDesc: {
        type: String
    },
    noOfStud: {
        type: String
    },
    evntPic1: {
        type: String
    },
    evntPic2: {
        type: String
    },
    evntPic3: {
        type: String
    },
    evntPic4: {
        type: String
    },
    evntCerti: {
        type: String
    },
    evntPstr: {
        type: String
    },
    studSheet: {
        type: String
    },
    inputList: {
        type: []
    }
})

const PostEventModel = mongoose.model('PostEvent', PostEventSchema)
module.exports = PostEventModel