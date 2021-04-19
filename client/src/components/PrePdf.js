import React from 'react'
// import React, { useState, Component } from 'react';
// import Pdf from 'react-to-pdf'
import axios from 'axios';
import { saveAs } from 'file-saver'
import './css/PrePdf.css';
import Swal from 'sweetalert2'

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


const PrePdf = (props) => {

      const createAndDownloasPdf = () => {
         downloadingProgress();
         axios.post('/create-pdf', {
            eventId: props.eventId,
            eventName: props.eventName,
            evntType: props.evntType,
            propDate: props.propDate,
            propDateTo: props.propDateTo,
            durEvnt: props.durEvnt,
            evntLevel: props.evntLevel,
            orgInst: props.orgInst,
            deptName: props.deptName,
            inputList: props.inputList,
            createdBy: props.createdBy
         })
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
         const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
         saveAs(pdfBlob, `${props.eventId}.pdf`);
      })
   }

    return(
       <>
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
                              Created By: <b>{props.createdBy}</b>
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
                              Event name: {props.eventName}
                           </td>
                           <td>
                              Event ID: <b>{props.eventId}</b>
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
                  <td>{props.eventId}</td>
               </tr>
               <tr class="item">
               <td>Event Name:</td>
               <td>{props.eventName}</td>
               </tr>
               <tr class="item">
               <td>Event Type:</td>
               <td>{props.evntType}</td>
               </tr>
               <tr class="item">
               <td>Proposed Date From:</td>
               <td>{props.propDate}</td>
               </tr>
               <tr class="item">
               <td>Proposed Date To:</td>
               <td>{props.propDateTo}</td>
               </tr>
               <tr class="item">
               <td>Event Duration:</td>
               <td>{props.durEvnt}</td>
               </tr>
               <tr class="item">
               <td>Event Level:</td>
               <td>{props.evntLevel}</td>
               </tr>
               <tr class="item">
               <td>Organizing Institute:</td>
               <td>{props.orgInst}</td>
               </tr>
               <tr class="item">
               <td>Department Name:</td>
               <td>{props.deptName}</td>
               </tr>
               <tr class="pdfHeading">
               <td>Coordinator Details:</td>
               <td></td>
               </tr>

               {
                  props.inputList.map((x, i) => {
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
            </table>
            <br />
            <h1 class="justify-center"></h1>
         </div>
      {/* <Pdf targetRef={ref} filename="pre.pdf">
            {({toPdf}) => <button className='submit' onClick={toPdf}>Generate PDF</button>}
      </Pdf> */}
      <div style={{textAlign: 'center', padding: '2% 0'}}>
         <button className='submit' onClick={() => { props.changeState(false)}}>GO Back</button>
         <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
         <button className="submit" onClick = { createAndDownloasPdf } >Download PDF</button>
      </div>
      </>
    )
};

export default PrePdf;