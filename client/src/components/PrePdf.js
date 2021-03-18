import React, { useState, Component } from 'react';
import Pdf from 'react-to-pdf'
// import './css/PrePdf.css';

const ref = React.createRef();
var today = new Date();

const PrePdf = (props) => {
    return(
       <>
        <div class="invoice-box" ref={ref}>
            <table cellpadding="0" cellspacing="0">
               <tr class="top">
                  <td colspan="2">
                     <table>
                        <tr>
                           <td class="title"><img  src="https://yt3.ggpht.com/a/AATXAJybtd3y_fW-_MgaRsbLpldlKK-02_AMYxU6ZEgKnQ=s900-c-k-c0xffffffff-no-rj-mo"
                              style={{width: '100%',maxWidth: '156px'}} /></td>
                           <td>
                              Datum: {`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
               <tr class="information">
                  <td colspan="2">
                     <table>
                        <tr>
                           <td>
                              Event name: {props.eventName}
                           </td>
                           <td>
                              Event ID: {props.eventId}
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
               {/* <tr class="item">
               <td>Coordinator Name:</td>
               <td>{props.inputList[0].cordName}</td>
               </tr>
               <tr class="item">
               <td>Coordinator Email:</td>
               <td>{props.inputList[0].cordEmail}</td>
               </tr>
               <tr class="item">
               <td>Coordinator Contact Number:</td>
               <td>{props.inputList[0].cordNumber}</td>
               </tr> */}
            </table>
            <br />
            <h1 class="justify-center"></h1>
         </div>
      <Pdf targetRef={ref} filename="pre.pdf">
            {({toPdf}) => <button className='submit' onClick={toPdf}>Generate PDF</button>}
        </Pdf>
      </>
    )
};

export default PrePdf;