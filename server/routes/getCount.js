const express = require('express')
const router = express.Router()
const preEvent = require('../models/preEvent')


router.post('/getcount', async (req, res) => {
    let count = {
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

module.exports = router