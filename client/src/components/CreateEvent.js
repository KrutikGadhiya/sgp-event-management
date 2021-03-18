import './css/CreateEvent.css';
import PrePdf from './PrePdf';
import { useState, Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver'
//import { Link } from 'react-router-dom';

var prefields = {};
var check = false;

function onSuccessSubmit(){
    window.confirm( " Success! " );
}

function CreateEvent(){
    const [checkState, setCheck] = useState(false);
    const [inputList, setInputList] = useState([{ cordName: "", cordEmail: "", cordNumber: "" }]);

    const [eventId, setevntId] = useState('');
    const [eventName, setevntName] = useState('');
    const [evntType, setevntType] = useState('');
    const [propDate, setPropDate] = useState('');
    const [propDateTo, setPropDateTo] = useState('');
    const [durEvnt, setdurEvnt] = useState('');
    const [evntLevel, setevntLevel] = useState('');
    const [orgInst, setorgInst] = useState('');
    const [deptName, setdeptName] = useState('');
    
    function fields(){
        prefields = {
            eventId: eventId,
            eventName: eventName,
            evntType: evntType,
            propDate: propDate,
            propDateTo: propDateTo,
            durEvnt: durEvnt,
            evntLevel: evntLevel,
            orgInst: orgInst,
            deptName: deptName,
            inputList: inputList
        }
        console.log(prefields)
    }
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { cordName: "", cordEmail: "", cordNumber: "" }]);
    };
    
    const createAndDownloasPdf =() => {
        axios.post('/create-pdf', {
            eventId: eventId,
            eventName: eventName,
            evntType: evntType,
            propDate: propDate,
            propDateTo: propDateTo,
            durEvnt: durEvnt,
            evntLevel: evntLevel,
            orgInst: orgInst,
            deptName: deptName,
            inputList: inputList})
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
    }
    const create = () => {
        setCheck(true)
    }

    return(
        <>{ !checkState?
    (<div>
        <h1 className="eventLabel">Pre Event</h1>
        <div class="grid-container">
            <div class="col-25" id="card">
                    <div class="container">
                        <form method="post">
                            <div className="row">
                                <div class="col-25"> 
                                    <label for="eventId"><b>Event ID</b></label>
                                </div>
                                <div class="col-75">
                                    <input className="input" type="text" id="eId" name="eventID" placeholder="YYYY/DEPARTMENT/COUNT" 
                                    value={eventId} onChange={(e)=>setevntId(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-25"> 
                                    <label for="eventId"><b>Event Name</b></label>
                                </div>
                                <div class="col-75">
                                    <input className="input" type="text" id="ename" name="eventName" placeholder="Code With Fun" 
                                    value={eventName} onChange={(e)=>setevntName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                <label for="event"><b>Type Of Event</b></label>
                                </div>
                                <div class="col-75">
                                <select className="input" id="event" name="eventtype"
                                value={evntType} onChange={(e)=>setevntType(e.target.value)}
                                >
                                    <option value="Webinar">Webinar</option>
                                    <option value="Seminar">Seminar</option>
                                    <option value="Confrence">Confrence</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Nontechnical">Non-Technical</option>
                                    <option value="Cultural">Cultural</option>
                                </select>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-25">
                                    <label for="date"><b>Proposed Date From</b></label>
                                </div>
                                <div class="col-75">
                                    <input className="input" type="date" id="sdate" name="eventstartdate" 
                                    value={propDate} onChange={(e)=>setPropDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="date"><b>To</b></label>
                                </div>
                                <div class="col-75">
                                    <input className="input" type="date" id="edate" name="eventenddate" 
                                    value={propDateTo} onChange={(e)=>setPropDateTo(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                    <label for="date"><b>Duration Of Event</b></label>
                                </div>
                                <div class="col-75">
                                    <input className="input" type="number" id="duration" name="duration" 
                                    value={durEvnt} onChange={(e)=>setdurEvnt(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                <label for="event"><b>Level Of Event</b></label>
                                </div>
                                <div class="col-75">
                                <select className="input" id="event" name="eventtype"
                                value={evntLevel} onChange={(e)=>setevntLevel(e.target.value)}
                                >
                                    <option value="Webinar">Institute</option>
                                    <option value="Seminar">University</option>
                                    <option value="International">International</option>
                                    <option value="National">National</option>
                                    <option value="State">State</option>
                                </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                    <label for="organise"><b>Organising Institute</b></label>
                                </div>
                                <div class="col-75">
                                <select className="input"
                                value={orgInst} onChange={(e)=>setorgInst(e.target.value)}
                                >
                                    <option selected="selected">Select Institute</option>
                                    <option value="CSPIT">CSPIT</option>
                                    <option value="DEPSTAR">DEPSTAR</option>
                                    <option value="PDPIAS">PDPIAS</option>
                                    <option value="CMPICA">CMPICA</option>
                                    <option value="I2IM">I2IM</option>
                                    <option value="RPCP">RPCP</option>
                                    <option value="ARIP">ARIP</option>
                                    <option value="MTIN">MTIN</option>
                                    <option value="CIPS">CIPS</option>
                                </select>
                                </div>
                            </div>
                        <div class="row">
                            <div class="col-25">
                            <label for="dname"><b>Department Name</b></label>
                            </div>
                            <div class="col-75">
                            <input className="input" type="text" id="dname" name="departname" placeholder="KDPIT" 
                            value={deptName} onChange={(e)=>setdeptName(e.target.value)}
                            />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-25">
                                <label for="cordinator"><b>Cordinator's Details</b></label>
                            </div>
                            <div class="col-75">
                                {/* <CordinatorFields /> */}
                                {inputList.map((x, i) => {
                                    return (
                                    <div className="box">
                                        <input
                                        className="input"
                                        type="text"
                                        name="cordName"
                                        placeholder="Cordinator Name"
                                        value={x.cordName}
                                        onChange={e => handleInputChange(e, i)}
                                        />
                                        <input
                                        type="email"
                                        className="input"
                                        name="cordEmail"
                                        placeholder="Cordinator Email"
                                        value={x.cordEmail}
                                        onChange={e => handleInputChange(e, i)}
                                        />
                                        <input
                                        type="number"
                                        className="input"
                                        name="cordNumber"
                                        placeholder="Contact Number"
                                        value={x.cordNumber}
                                        onChange={e => handleInputChange(e, i)}
                                        />
                                        <div className="btn-box">
                                        {inputList.length !== 1 && <button
                                            className="rem-btn"
                                            onClick={() => handleRemoveClick(i)}>-</button>}
                                        {inputList.length - 1 === i && <button className="add-btn" onClick={handleAddClick}>+</button>}
                                        </div>
                                    </div>
                                    );
                                })}
                                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
        </div>
            <div>
                <div className="sub-btn">
                    <div class="row">
                        <input className="submit" onClick = { fields } type="submit" value="Submit" />
                        <button className="submit" onClick = { createAndDownloasPdf } >Create HTML PDF</button>
                        <button className='submit' onClick={ create }>Create PDF</button>
                    </div>
                </div>
            </div>
        </div>):(
             <PrePdf 
             eventId= {eventId}
            eventName= {eventName}
            evntType= {evntType}
            propDate= {propDate}
            propDateTo= {propDateTo}
            durEvnt= {durEvnt}
            evntLevel= {evntLevel}
            orgInst= {orgInst}
            deptName= {deptName}
            inputList= {inputList}
             />
        )
        }
        </>
    )
}

export default CreateEvent;