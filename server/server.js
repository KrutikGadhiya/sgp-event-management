const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const dbfile = require('./conn');
const preEvent = require('./models/preEvent')

const pdfTemplate = require('./documents');

const port = process.env.PORT || 5000;

// express app
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//  POST - PDF generate and fetching of the data

app.post('/create-pdf', (req, res) => {
    //console.log(req)
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err){
            console.log('error');
            res.send( Promise.reject() );
        }
        res.send( Promise.resolve() );
    })
})

// GET - SEND THE GENERATED PDF TO CLIENT
// app.get('/create-pdf', (req, res) => {
//     console.log('server')
// })
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`);
}); 



app.post('/preevent', async (req, res) => {
    console.log('details received')
    //console.log(req.body)
     await preEvent.create(req.body)
     .then(() => {
         console.log("ENTRY MADE")
         res.send('Entry done')
     })
     .catch((err) => {
         console.log(err)
     })
     //console.log(preDetails)
})
    
app.post('/getdetails', async (req, res) => {
    console.log(req.body)
    preEvent.findOne({ eventId: req.body.eventId })
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log(err)
    })
})

app.post('/getcount', async (req, res) => {
    var count = {
        cspitCount: '0',
        depstarCount: '0',
        pdpiasCount: '0',
        cmpicaCount: '0',
        i2imCount: '0',
        rpcpCount: '0',
        aripCount: '0',
        mtinCount: '0',
        cipsCount: '0'
    }
    await preEvent.countDocuments({orgInst: 'DEPSTAR'}, (err, c) => {
        if(!err){
            //console.log(c)
            count.depstarCount = String(c)
        }
        else{ console.log(err) }
        //res.send(c)
    })
    await preEvent.countDocuments({orgInst: 'CSPIT'}, (err, c) => {
        if(!err){
            //console.log(c)
            count.cspitCount = String(c)
        }
        else{ console.log(err) }
        //res.send(c)
    })
    await preEvent.countDocuments({orgInst: 'PDPIAS'}, (err, c) => {
        if(!err){
            //console.log(c)
            count.pdpiasCount = String(c)
        }
        else{ console.log(err) }
        //res.send(c)
    })
    await preEvent.countDocuments({orgInst: 'CMPICA'}, (err, c) => {
        if(!err){
            //console.log(c)
            count.cmpicaCount = String(c)
        }
        else{ console.log(err) }
        //res.send(c)
    })
    await preEvent.countDocuments({orgInst: 'I2IM'}, (err, c) => {
        if(!err){
            //console.log(c)
            count.i2imCount = String(c)
        }
        else{ console.log(err) }
        //res.send(c)
    })
    await preEvent.countDocuments({orgInst: 'RPCP'}, (err, c) => {
        if(!err){
            //console.log(c)
            count.rpcpCount = String(c)
        }
        else{ console.log(err) }
        //res.send(c)
    })
    await preEvent.countDocuments({orgInst: 'ARIP'}, (err, c) => {
        if(!err){
            //console.log(c)
            count.aripCount = String(c)
        }
        else{ console.log(err) }
        //res.send(c)
    })
    await preEvent.countDocuments({orgInst: 'MTIN'}, (err, c) => {
        if(!err){
            //console.log(c)
            count.mtinCount = String(c)
        }
        else{ console.log(err) }
        //res.send(c)
    })
    await preEvent.countDocuments({orgInst: 'CIPS'}, (err, c) => {
        if(!err){
            //console.log(c)
            count.cipsCount = String(c)
        }
        else{ console.log(err) }
        //res.send(c)
    })
    console.log(count)
    res.send( count )
})

// app.post('/preEventSubmit', async (req, res) => {
//     let count = preEvent.countDocuments({orgInst: 'DEPSTAR'}, (err, c) => {
//         console.log(c)
//     })
//     console.log(count)
//     res.send(count)
// })

// listen for request
app.listen(port, () =>{
    console.log("Server Started Successfully")
});

