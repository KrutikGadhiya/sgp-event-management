const mongoose = require('mongoose')

const PreEventSchema = mongoose.Schema({
    userEmail: {
        type: String
    },
    eventId: {
        type: String
    },
    eventName: {
        type: String
    },
    evntType: {
        type: String
    },
    propDate: {
        type: String
    },
    propDateTo: {
        type: String
    },
    durEvnt: {
        type: String
    },
    evntLevel: {
        type: String
    },
    orgInst: {
        type: String
    },
    deptName: {
        type: String
    },
    inputList: {
        type: [{
            cordName: String,
            cordEmail: String,
            cordNumber: String
        }]
    }
})

const PreEventModel = mongoose.model('PreEvent', PreEventSchema)

module.exports = PreEventModel