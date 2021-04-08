const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const dbfile = require('./conn');
const preEvent = require('./models/preEvent')
const User = require('./models/user')
const requireLogin = require('./middleware/requireLogin')

const pdfTemplate = require('./documents');
const { json } = require('body-parser');

const port = process.env.PORT || 5000;

// express app
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('./routes/createPdf'))
app.use(require('./routes/getCount'))
app.use(require('./routes/auth'))
app.use(require("./routes/preEvent"))


app.get('/myEvents', requireLogin, (req, res) => {
    preEvent.find({createdBy: req.user._id})
    .populate("createdBy", "_id userName email")
    .then( mypost => {
        res.json(mypost)
    })
    .catch( err => {
        console.log(err)
    })
})

app.get('/allEvents', (req, res) => {
    preEvent.find()
    .populate("createdBy", "_id userName email")
    .then( evnts => {
        res.json({evnts})
    })
    .catch( err => {
        console.log(err)
    })
})

app.post('/postFrom', (req, res) => {
    const data = req.body
    console.log(data.inputList[0].spkCV[0]);
})


// listen for request
app.listen(port, () =>{
    console.log("Server Started Successfully")
});

