module.exports = ({ eventId, eventName, evntType, propDate, propDateTo, durEvnt, evntLevel, orgInst, deptName, inputList}) => {
    const today = new Date();
    var cordinatorFields = ``
    for (let i = 0; i < inputList.length; i++) {
       //console.log(cordinatorFields);
       cordinatorFields += `<tr class="item">
                              <td>Coordinator Name:</td>
                              <td>${inputList[i].cordName}</td>
                           </tr>
                           <tr class="item">
                              <td>Coordinator Email:</td>
                              <td>${inputList[i].cordEmail}</td>
                           </tr>
                           <tr class="item">
                              <td>Coordinator Contact Number:</td>
                              <td>${inputList[i].cordNumber}</td>
                           </tr>`
    }
return `
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>PDF Result Template</title>
      <style>
         .invoice-box {
         max-width: 800px;
         margin: auto;
         padding: 30px;
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 0, .15);
         font-size: 16px;
         line-height: 24px;
         font-family: 'Helvetica Neue', 'Helvetica',
         color: #555;
         }
         .margin-top {
         margin-top: 50px;
         }
         .justify-center {
         text-align: center;
         }
         .invoice-box table {
         width: 100%;
         line-height: inherit;
         text-align: left;
         }
         .invoice-box table td {
         padding: 5px;
         vertical-align: top;
         }
         .invoice-box table tr td:nth-child(2) {
         text-align: right;
         }
         .invoice-box table tr.top table td {
         padding-bottom: 20px;
         }
         .invoice-box table tr.top table td.title {
         font-size: 45px;
         line-height: 45px;
         color: #333;
         }
         .invoice-box table tr.information table td {
         padding-bottom: 40px;
         }
         .invoice-box table tr.heading td {
         background: #eee;
         border-bottom: 1px solid #ddd;
         font-weight: bold;
         }
         .invoice-box table tr.details td {
         padding-bottom: 20px;
         }
         .invoice-box table tr.item td {
         border-bottom: 1px solid #eee;
         }
         .invoice-box table tr.item.last td {
         border-bottom: none;
         }
         .invoice-box table tr.total td:nth-child(2) {
         border-top: 2px solid #eee;
         font-weight: bold;
         }
         @media only screen and (max-width: 600px) {
         .invoice-box table tr.top table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         .invoice-box table tr.information table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         }
      </style>
   </head>
   <body>
      <div class="invoice-box">
         <table cellpadding="0" cellspacing="0">
            <tr class="top">
               <td colspan="2">
                  <table>
                     <tr>
                        <td class="title"><img  src="https://yt3.ggpht.com/a/AATXAJybtd3y_fW-_MgaRsbLpldlKK-02_AMYxU6ZEgKnQ=s900-c-k-c0xffffffff-no-rj-mo"
                           style="width:100%; max-width:156px;"></td>
                        <td>
                           Datum: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
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
                           Event name: ${eventName}
                        </td>
                        <td>
                           Event ID: ${eventId}
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr class="heading">
               <td>Event Information</td>
               <td></td>
            </tr>
            <tr class="item">
               <td>Event ID:</td>
               <td>${eventId}</td>
            </tr>
            <tr class="item">
              <td>Event Name:</td>
              <td>${eventName}</td>
            </tr>
            <tr class="item">
              <td>Event Type:</td>
              <td>${evntType}</td>
            </tr>
            <tr class="item">
              <td>Proposed Date From:</td>
              <td>${propDate}</td>
            </tr>
            <tr class="item">
              <td>Proposed Date To:</td>
              <td>${propDateTo}</td>
            </tr>
            <tr class="item">
              <td>Event Duration:</td>
              <td>${durEvnt}</td>
            </tr>
            <tr class="item">
              <td>Event Level:</td>
              <td>${evntLevel}</td>
            </tr>
            <tr class="item">
              <td>Organizing Institute:</td>
              <td>${orgInst}</td>
            </tr>
            <tr class="item">
              <td>Department Name:</td>
              <td>${deptName}</td>
            </tr>
            <tr class="heading">
              <td>Coordinator Details:</td>
              <td></td>
            </tr>
            ${cordinatorFields}
         </table>
         <br />
         <h1 class="justify-center"></h1>
      </div>
   </body>
</html>

    `;
};

{/* <tr class="item">
              <td>Coordinator Name:</td>
              <td>${inputList[0].cordName}$</td>
            </tr>
            <tr class="item">
              <td>Coordinator Email:</td>
              <td>${inputList[0].cordEmail}$</td>
            </tr>
            <tr class="item">
              <td>Coordinator Contact Number:</td>
              <td>${inputList[0].cordNumber}$</td>
            </tr> */}