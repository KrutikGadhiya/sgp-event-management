const express = require('express')
const router = express.Router()
const pdf = require('html-pdf')
const pdfTemplate = require('../documents')
const pdfTemplate2 = require('../documents/fullPDF')

const dir = __dirname;
const dir2 = dir.replace("\\" + "routes" , '')

router.post('/create-pdf', (req, res) => {
    //console.log(req.body)
    pdf.create(pdfTemplate(req.body), {}).toFile('./result.pdf', (err) => {
        console.log('creating PDF')
        if(err){
            console.log('error');
            res.send( Promise.reject() );
        }
        res.send( Promise.resolve() );
    })
})

router.post('/createFull-pdf', (req, res) => {
    //console.log(req.body)
    pdf.create(pdfTemplate2(req.body), {}).toFile('./result.pdf', (err) => {
        console.log('creating PDF')
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
router.get('/fetch-pdf', (req, res) => {
    console.log('sending PDF', dir2)
    res.sendFile(`${dir2}/result.pdf`);
}); 

module.exports = router