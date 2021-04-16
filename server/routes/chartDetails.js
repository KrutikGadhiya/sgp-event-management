const express = require('express')
const router = express.Router()
const preEvent = require('../models/preEvent')
const postEvent = require('../models/postEvent')


router.post('/getYearCount', (req, res) => {
    //console.log(req.body)
    let yearLst = req.body.yearList
    let yearCnt = []
    let stdCount = []
    let postResYear = []
    let postStdCount = []
    let resYearLst = []

    preEvent.find()
    .then((PreEvents) => {
        PreEvents.map( (year, i) => {
            //console.log(year.propDate);
            resYearLst.push(parseInt(year.propDate.slice(0, 4)))
        })
    })
    .then(() => {
        let count = 0
        for(let i = 0; i < yearLst.length; i++){
            count = 0
            //console.log("COUNT   ", yearLst[i], resYearLst[i]);
            for(let j = 0; j < resYearLst.length; j++){
                if(yearLst[i] === resYearLst[j]){
                    count++
                }
            }
            yearCnt.push(count)
        }
        postEvent.find()
        .then( postevnts => {
            postevnts.map( (singlePostEvnt, i) => {
                //console.log("NO OF STUDENT: ",singlePostEvnt.noOfStud);
                postResYear.push(parseInt(singlePostEvnt.actDate.slice(0, 4)))
                postStdCount.push(parseInt(singlePostEvnt.noOfStud))
            })
        })
        .then(() => {
            let count = 0
            console.log("detaile", postResYear, postStdCount);
            for(let i = 0; i < yearLst.length; i++){
                count = 0
                //console.log("COUNT   ", yearLst[i], resYearLst[i]);
                for(let j = 0; j < postResYear.length; j++){
                    if(yearLst[i] === postResYear[j]){
                        count += postStdCount[j]
                    }
                }
                stdCount.push(count)
            }
            //console.log(stdCount);
        }).then(() => {
            res.json({yearCnt, stdCount})
        })

    })
    .catch( err => {
        console.log(err);
    })

})

router.post('/getEvntTypeCount', (req, res) => {
    let yearLst = req.body.yearList
    let evntTypeCount = {
        Webinar: 0,
        Seminar: 0,
        Confrence: 0,
        Technical: 0,
        Nontechnical: 0,
        Cultural: 0,
        FTP: 0,
        HTTP: 0
    }
    preEvent.find()
    .then( evnts => {
        evnts.map((e, i) => {
            if(e.evntType === "Webinar" && yearLst.includes(parseInt(e.propDate.slice(0, 4)))){
                evntTypeCount.Webinar++
            }
            if(e.evntType === "Seminar" && yearLst.includes(parseInt(e.propDate.slice(0, 4)))){
                evntTypeCount.Seminar++
            }
            if(e.evntType === "Confrence" && yearLst.includes(parseInt(e.propDate.slice(0, 4)))){
                evntTypeCount.Confrence++
            }
            if(e.evntType === "Technical" && yearLst.includes(parseInt(e.propDate.slice(0, 4)))){
                evntTypeCount.Technical++
            }
            if(e.evntType === "Nontechnical" && yearLst.includes(parseInt(e.propDate.slice(0, 4)))){
                evntTypeCount.Nontechnical++
            }
            if(e.evntType === "Cultural" && yearLst.includes(parseInt(e.propDate.slice(0, 4)))){
                evntTypeCount.Cultural++
            }
            if(e.evntType === "FTP" && yearLst.includes(parseInt(e.propDate.slice(0, 4)))){
                evntTypeCount.FTP++
            }
            if(e.evntType === "HTTP" && yearLst.includes(parseInt(e.propDate.slice(0, 4)))){
                evntTypeCount.HTTP++
            }
        })
    })
    .then(() => {
        const { Webinar, Seminar, Confrence, Technical, Nontechnical, Cultural, FTP, HTTP } = evntTypeCount
        res.json([ Webinar, Seminar, Confrence, Technical, Nontechnical, Cultural, FTP, HTTP ])
    })
    .catch( err => {
        console.log(err);
    })
})

router.post('/getDepcount', (req, res) => {
    let yearLst = req.body.yearList
    const depCount = {
        aripCount: 0,
        cipsCount: 0,
        cmpicaCount: 0,
        cspitCount: 0,
        depstarCount: 0,
        i2imCount: 0,
        mtinCount: 0,
        pdpiasCount: 0,
        rpcpCount: 0
    }

    preEvent.find()
    .then( data => [
        data.map((evnt, i) => {
            if(evnt.orgInst === "CSPIT" && yearLst.includes(parseInt(evnt.propDate.slice(0, 4))) ){
                depCount.cspitCount++
            }
            if(evnt.orgInst === "DEPSTAR" && yearLst.includes(parseInt(evnt.propDate.slice(0, 4)))){
                depCount.depstarCount++
            }
            if(evnt.orgInst === "PDPIAS" && yearLst.includes(parseInt(evnt.propDate.slice(0, 4))))[
                depCount.pdpiasCount++
            ]
            if(evnt.orgInst === "CMPICA" && yearLst.includes(parseInt(evnt.propDate.slice(0, 4)))){
                depCount.cmpicaCount++
            }
            if(evnt.orgInst === "I2IM" && yearLst.includes(parseInt(evnt.propDate.slice(0, 4)))){
                depCount.i2imCount++
            }
            if(evnt.orgInst === "RPCP" && yearLst.includes(parseInt(evnt.propDate.slice(0, 4)))){
                depCount.rpcpCount++
            }
            if(evnt.orgInst === "ARIP" && yearLst.includes(parseInt(evnt.propDate.slice(0, 4)))){
                depCount.aripCount++
            }
            if(evnt.orgInst === "MTIN" && yearLst.includes(parseInt(evnt.propDate.slice(0, 4)))){
                depCount.mtinCount++
            }
            if(evnt.orgInst === "CIPS" && yearLst.includes(parseInt(evnt.propDate.slice(0, 4)))){
                depCount.cipsCount++
            }
        })
    ])
    .then(() => {
        res.json(depCount)
    })
    .catch(err => {
        console.log(err);
    })

})
module.exports = router