import React, { useState } from 'react'
// import React, { useState, Component } from 'react';
// import Pdf from 'react-to-pdf'
import axios from 'axios';
import { saveAs } from 'file-saver'
import './css/PrePdf.css';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import { Link } from 'react-router-dom';

toast.configure()

const ref = React.createRef();
var today = new Date();

const downloadingProgress = () => {
   Swal.fire({
      icon: 'info',
       title: 'Downloading PDF, The Download Will Begin Shortly',
       timer: 5000,
       timerProgressBar: true,
       didOpen: () => {
           Swal.showLoading()
       }
   })
}


const EventPdf = () => {
    const [eventId, setevntId] = useState('');
    const [eventName, setevntName] = useState('');
    const [evntType, setevntType] = useState('');
    const [propDate, setPropDate] = useState('');
    const [propDateTo, setPropDateTo] = useState('');
    const [durEvnt, setdurEvnt] = useState('');
    const [evntLevel, setevntLevel] = useState('');
    const [orgInst, setorgInst] = useState('');
    const [deptName, setdeptName] = useState('');
    const [inputList, setInputList] = useState([{ cordName: "", cordEmail: "", cordNumber: "" }]);
    const [cordList, setCordList] = useState([])

    const [inputList1, setInputList1] = useState([{ spkName: "", spkEmail: "", spkCV: "", spkPhoto: "" }]);

    const [postEvntId, setPostEvntId] = useState('')
    const [actDate, setactDate] = useState('')
    const [actDateTo, setactDateTo] = useState('')
    const [evntDesc, setevntDesc] = useState('')
    const [noOfStud, setnoOfStud] = useState('')
    const [evntPic1, setevntPic1] = useState('')
    const [evntPic2, setevntPic2] = useState('')
    const [evntPic3, setevntPic3] = useState('')
    const [evntPic4, setevntPic4] = useState('')
    const [evntCerti, setevntCerti] = useState('')
    const [evntPstr, setevntPstr] = useState('')
    const [studSheet, setstudSheet] = useState('')

    const [evntPic1Url, setevntPic1Url] = useState('')
    const [evntPic2Url, setevntPic2Url] = useState('')
    const [evntPic3Url, setevntPic3Url] = useState('')
    const [evntPic4Url, setevntPic4Url] = useState('')
    const [evntCertiUrl, setevntCertiUrl] = useState('')
    const [evntPstrUrl, setevntPstrUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [haveLst, setHaveLst] = useState(false)

    const getData = async () => {
        await axios.get(`/getdetails/${eventId}`)
       .then((response) => {
           if(response.data.error){
               toast.error(response.data.error, {
                   autoClose: 5000
               })
               return
           }
           console.log(response.data)
           setevntName(response.data.postDetails.eventId.eventName)
           setevntType(response.data.postDetails.eventId.evntType)
           setPropDate(response.data.postDetails.eventId.propDate)
           setPropDateTo(response.data.postDetails.eventId.propDateTo)
           setdurEvnt(response.data.postDetails.eventId.durEvnt)
           setevntLevel(response.data.postDetails.eventId.evntLevel)
           setorgInst(response.data.postDetails.eventId.orgInst)
           setdeptName(response.data.postDetails.eventId.deptName)
           setInputList(response.data.postDetails.eventId.inputList)
           setCordList(response.data.postDetails.eventId.inputList)

           setPostEvntId(response.data.postDetails.eventId)
           setactDate(response.data.postDetails.actDate)
           setactDateTo(response.data.postDetails.actDateTo)
           setevntDesc(response.data.postDetails.evntDesc)
           setnoOfStud(response.data.postDetails.noOfStud)
           setevntCertiUrl(response.data.postDetails.evntCerti)
           setevntPic1Url(response.data.postDetails.evntPic1)
           setevntPic2Url(response.data.postDetails.evntPic2)
           setevntPic3Url(response.data.postDetails.evntPic3)
           setevntPic4Url(response.data.postDetails.evntPic4)
           setevntPstrUrl(response.data.postDetails.evntPstr)
           setstudSheet(response.data.postDetails.studSheet)
           setInputList1(response.data.postDetails.inputList)
           console.log(response.data.postDetails.inputList);
           
           setHaveLst(true)

       })
       .catch( (err) => {
           console.log(err);
       })
    }

      const createAndDownloasPdf = () => {
         downloadingProgress();
         axios.post('/createFull-pdf', {
            eventId: eventId,
            eventName: eventName,
            evntType: evntType,
            propDate: propDate,
            propDateTo: propDateTo,
            durEvnt: durEvnt,
            evntLevel: evntLevel,
            orgInst: orgInst,
            deptName: deptName,
            inputList: inputList,
            createdBy: JSON.parse(localStorage.getItem('user')).email,
            actDate,
            actDateTo,
            evntDesc,
            noOfStud,
            studSheet,
            evntCertiUrl,
            evntPstrUrl,
            evntPic1Url,
            evntPic2Url,
            evntPic3Url,
            evntPic4Url,
            inputList1
         })
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
         const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
         saveAs(pdfBlob, `${eventId}.pdf`);
      })
   }

    return(
       <>
       <div id="card1">
                <div  className="container">
                    <div  className="row">
                        <div class="col-25"> 
                            <label for="eventId">Event ID</label>
                        </div>
                        <div class="col-75">
                                <input className="input" type="text" id="eId" name="eventID" placeholder="YYYY - INSTITUTE - DEPARTMENT - COUNT" 
                                    value={eventId} onChange={(e)=>setevntId(e.target.value)}
                                />
                            <div style={{padding: '2%', textAlign: 'center'}}>
                                <button onClick={ getData } className='submit'>Go</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div id="doc" class="invoice-box" ref={ref}>
            <table cellPadding="0" cellSpacing="0">
               <tr class="top">
                  <td colspan="2">
                     <table>
                        <tr>
                           <td class="title"><img  src="https://yt3.ggpht.com/a/AATXAJybtd3y_fW-_MgaRsbLpldlKK-02_AMYxU6ZEgKnQ=s900-c-k-c0xffffffff-no-rj-mo"
                              style={{width: '100%',maxWidth: '156px'}} alt="unilogo" /></td>
                           <td>
                              Date: {`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                              <div>
                              Created By: <b>{ JSON.parse(localStorage.getItem('user')).email }</b>
                              </div>
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
               <tr class="information">
                  <td colspan="2">
                    <h1 style={{textAlign: 'center'}}>Pre Event</h1>
                     <table>
                        <tr>
                           <td>
                              Event name: {eventName}
                           </td>
                           <td>
                              Event ID: <b>{eventId}</b>
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
               <tr class="pdfHeading">
                  <td>Event Information</td>
                  <td></td>
               </tr>
               <tr class="item">
                  <td>Event ID:</td>
                  <td>{eventId}</td>
               </tr>
               <tr class="item">
               <td>Event Name:</td>
               <td>{eventName}</td>
               </tr>
               <tr class="item">
               <td>Event Type:</td>
               <td>{evntType}</td>
               </tr>
               <tr class="item">
               <td>Proposed Date From:</td>
               <td>{propDate}</td>
               </tr>
               <tr class="item">
               <td>Proposed Date To:</td>
               <td>{propDateTo}</td>
               </tr>
               <tr class="item">
               <td>Event Duration:</td>
               <td>{durEvnt}</td>
               </tr>
               <tr class="item">
               <td>Event Level:</td>
               <td>{evntLevel}</td>
               </tr>
               <tr class="item">
               <td>Organizing Institute:</td>
               <td>{orgInst}</td>
               </tr>
               <tr class="item">
               <td>Department Name:</td>
               <td>{deptName}</td>
               </tr>
               <tr class="pdfHeading">
               <td>Coordinator Details:</td>
               <td></td>
               </tr>

               {
                  inputList.map((x, i) => {
                     return (
                        <>
                           <tr style={{textAlign: 'center'}}>
                              <td style={{textAlign: 'center'}} colSpan='2'><b>Coordinator No: {i + 1}</b></td>
                           </tr>
                           <tr class="item">
                              <td>Coordinator Name:</td>
                              <td>{x.cordName}</td>
                           </tr>
                           <tr class="item">
                              <td>Coordinator Email:</td>
                              <td>{x.cordEmail}</td>
                           </tr>
                           <tr class="item">
                              <td>Coordinator Contact Number:</td>
                              <td>{x.cordNumber}</td>
                           </tr>
                        </>
                     )
                  })
               }
               <tr class="information">
                  <td colspan="2">
                    <h1 style={{textAlign: 'center'}}>Post Event</h1>
                  </td>
               </tr>
               <tr class="pdfHeading">
                  <td>Event Information</td>
                  <td></td>
               </tr>
               <tr class="item">
                    <td>Actual Date From:</td>
                    <td>{actDate}</td>
               </tr>
               <tr class="item">
                    <td>Actual Date To:</td>
                    <td>{actDateTo}</td>
               </tr>
               <tr class="item">
                    <td>Event Description:</td>
                    <td>{evntDesc}</td>
               </tr>
               <tr class="item">
                    <td>Number Of Students:</td>
                    <td>{noOfStud}</td>
               </tr>
               <tr class="item">
                    <td>Student List:</td>
                    <td>{studSheet}</td>
               </tr>

               <tr class="pdfHeading">
               <td>Speaker Details:</td>
               <td></td>
               </tr>

               {
                  inputList1.map((x, i) => {
                     return (
                        <>
                           <tr style={{textAlign: 'center'}}>
                              <td style={{textAlign: 'center'}} colSpan='2'><b>Speaker No: {i + 1}</b></td>
                           </tr>
                           <tr class="item">
                              <td>Speaker Name:</td>
                              <td>{x.spkName}</td>
                           </tr>
                           <tr class="item">
                              <td>Speaker Email:</td>
                              <td>{x.spkEmail}</td>
                           </tr>
                           <tr class="item">
                              <td>Speaker CV:</td>
                              <td></td>
                           </tr>
                           <tr>
                               <td colSpan='2'><img width="100%" src={x.spkCV} alt="CV"/></td>
                           </tr>
                           <tr class="item">
                              <td>Speaker Photo:</td>
                              <td></td>
                           </tr>
                           <tr>
                               <td colSpan='2'><img width="100%" src={x.spkPhoto} alt="Photo"/></td>
                           </tr>
                        </>
                     )
                  })
               }

               
                <tr class="pdfHeading">
                    <td>Event Photographs:</td>
                    <td></td>
               </tr>
               <tr class="item">
                    <td><img width="100%" src={evntCertiUrl} alt="Certificate"/></td>
                    <td><img width="100%" src={evntPstrUrl} alt="Poster"/></td>
               </tr>
               <tr class="item">
                    <td><img width="100%" src={evntPic1Url} alt="Pic 1"/></td>
                    <td><img width="100%" src={evntPic2Url} alt="Pic 2"/></td>
               </tr>
               <tr class="item">
                    <td><img width="100%" src={evntPic3Url} alt="Pic 3"/></td>
                    <td><img width="100%" src={evntPic4Url} alt="Pic 4"/></td>
               </tr>

            </table>
            <br />
            <h1 class="justify-center"></h1>
         </div>
      {/* <Pdf targetRef={ref} filename="pre.pdf">
            {({toPdf}) => <button className='submit' onClick={toPdf}>Generate PDF</button>}
      </Pdf> */}
      <div style={{textAlign: 'center', padding: '2% 0'}}>
         <button className="submit" onClick = { createAndDownloasPdf } >Download PDF</button>
      </div>
      </>
    )
};

export default EventPdf;