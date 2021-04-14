const mongoose = require('mongoose')
//const uri = 'mongodb+srv://KK:krutik@cluster0.b6tlv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const uri1 = 'mongodb+srv://KK:krutik@sandbox.ftta1.mongodb.net/SGP?retryWrites=true&w=majority';
const client = mongoose.connect(uri1, {useNewUrlParser: true, useUnifiedTopology: true});

const dbObj = mongoose.connection

dbObj.on('connected', () => {
    console.log('MongoDB Connection Successfull');
})
dbObj.on('error', () => {
    console.log('MongoDB Connection Failed');
})

module.exports = mongoose