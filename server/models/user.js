const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }

})

const userModel = mongoose.model('User', userSchema)
module.exports = userModel