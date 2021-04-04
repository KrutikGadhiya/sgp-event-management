const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const dbfile = require('./conn');
const preEvent = require('./models/preEvent')
const User = require('./models/user')

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


app.get('/allEvents', (req, res) => {
    preEvent.find()
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

app.post('/preevent', (req, res) => {
    console.log('details received')
    //console.log(req.body)
     preEvent.create(req.body)
     .then((response) => {
         console.log("ENTRY MADE")
         res.json(response)
     })
     .catch((err) => {
         console.log(err)
     })
     //console.log(preDetails)
})
    
app.get('/getdetails/:id', async (req, res) => {
    console.log(req.params)
    const id = req.params.id
    console.log(id)
    // preEvent.findOne({ eventId: req.body.eventId })
    preEvent.findOne({ eventId: id })
    .then((data) => {
        console.log(data);
        res.send(data)
    })
    .catch((err) => {
        console.log(err)
    })
})

// listen for request
app.listen(port, () =>{
    console.log("Server Started Successfully")
});

