const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const dbfile = require('./conn');

const pdfTemplate = require('./documents')

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
app.get('/create-pdf', (req, res) => {
    console.log('server')
})
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`);
}); 

// listen for request
app.listen(port, () =>{
    console.log("Server Started Successfully")
});

