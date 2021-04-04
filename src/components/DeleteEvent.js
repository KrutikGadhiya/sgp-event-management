import './css/CreateEvent.css';
import { useState } from 'react';
import axios from 'axios';
import CordinatorFields from './CordinatorFields';
import SpeakerFields from './SpeakerFields';
//import { Link } from 'react-router-dom';

function onSuccessSubmit(){
    window.confirm( " Success! " );
}

function DeleteEvent(){

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



    const getData = async () => {
        await axios.post('/getdetails', { eventId })
       .then((response) => { 
           console.log(response.data)
           setevntName(response.data.eventName)
           setevntType(response.data.evntType)
           setPropDate(response.data.propDate)
           setPropDateTo(response.data.propDateTo)
           setdurEvnt(response.data.durEvnt)
           setevntLevel(response.data.evntLevel)
           setorgInst(response.data.orgInst)
           setdeptName(response.data.deptName)
           setInputList(response.data.inputList)
       })
    }

    return(
        <div>
            <h1 className="eventLabel">Delete Event</h1>
            <div id="card1">
                <div className="container">
                    <div className="row">
                        <div class="col-25"> 
                            <label for="eventId">Event ID</label>
                        </div>
                        <div class="col-75">
                            <input className="input" type="text" id="eId" name="eventID" placeholder="YYYY / INSTITUTE / DEPARTMENT / COUNT" 
                            value={eventId} onChange={(e)=>setevntId(e.target.value)}
                            />
                            <div style={{padding: '2%', textAlign: 'center'}}>
                                <button onClick={ getData } className='submit'>Go</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="grid-container">
            <div class="col-25" id="card">
            <div class="container">
                        <form onSubmit={ e => e.preventDefault() }>
                            <div className="eventLabel">
                                <h3>Pre Event Information</h3>
                            </div>
                            
                            <div className="row">
                                <div class="col-25"> 
                                    <label for="eventId">Event Name</label>
                                </div>
                                <div class="col-75">
                                    <input disabled  className="input" type="text" id="ename" name="eventName" placeholder="Code With Fun" 
                                        value={eventName} onChange={(e)=>setevntName(e.target.value)}
                                    />                                
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                <label for="event">Type Of Event</label>
                                </div>
                                <div class="col-75">
                                <select disabled  className="input" id="event" name="eventtype"
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
                                    <label for="date">Proposed Date From</label>
                                </div>
                                <div class="col-75">
                                    <input disabled  className="input" type="date" id="sdate"  name="eventstartdate" 
                                    value={propDate} onChange={(e)=>setPropDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="date">To</label>
                                </div>
                                <div class="col-75">
                                    <input disabled className="input" type="date" id="edate"  name="eventenddate" 
                                    value={propDateTo} onChange={(e)=>setPropDateTo(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                    <label for="date">Duration Of Event</label>
                                </div>
                                <div class="col-75">
                                    <input disabled className="input" type="number" id="duration" name="duration" 
                                    value={durEvnt} onChange={(e)=>setdurEvnt(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                <label for="event">Level Of Event</label>
                                </div>
                                <div class="col-75">
                                <select disabled className="input" id="event" name="eventtype"
                                    value={evntLevel} onChange={(e)=>setevntLevel(e.target.value)}
                                >
                                    <option value="Institute">Institute</option>
                                    <option value="University">University</option>
                                    <option value="International">International</option>
                                    <option value="National">National</option>
                                    <option value="State">State</option>
                                </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                    <label for="organise">Organising Institute</label>
                                </div>
                                <div class="col-75">
                                <select disabled className="input"
                                value={orgInst} onChange={ (e)=> {
                                    setorgInst(e.target.value) }}
                                >
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
                            <label for="dname">Department Name</label>
                            </div>
                            <div class="col-75">
                                <input disabled autoComplete='off' className="input" type="text" id="dname" name="departname" placeholder="KDPIT" 
                                value={deptName} onChange={(e)=>{
                                    setdeptName(e.target.value)
                                }}
                                />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-25">
                                <label for="cordinator">Cordinator's Details</label>
                            </div>
                            <div class="col-75">
                                {/* {inputList.map(cordFields => ( */}
                                    <CordinatorFields 
                                    input = { inputList }
                                    disabled = {true}
                                    ///key={cordFields.cordNumber}
                                    //name = { cordFields.cordName }
                                    //email = { cordFields.cordEmail }
                                    //number = { cordFields.cordNumber }
                                    />
                                {/* ))} */}
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
                <div className="col-25" id="card">
                    <div className="container">
                        <form action='#'>
                            <div className="eventLabel">
                                <h3>Post Event Information</h3>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="adate">Actual Date</label>
                                </div>
                                <div class="col-75">
                                    <input className="input" disabled type="date" id="adate" name="actualdate" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="atdate">To</label>
                                </div>
                                <div class="col-75">
                                    <input className="input" disabled type="date" id="atdate" name="eventenddate" />
                                </div>
                            </div>
                        
                            <div class="row">
                                    <div class="col-25">
                                        <label for="date">Speaker's Details</label>
                                    </div>
                                    <div class="col-75">
                                        <SpeakerFields value="disabled"/>
                                    </div>
                            </div>
                            
                            <div class="row">
                                    <div class="col-25">
                                        <label for="edesc">Event Description</label>
                                    </div>
                                    <div class="col-75">
                                        <textarea className="input" disabled id="edesc" name="eventdesc" />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="studno">Number of Student's Attended the Event</label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" disabled type="number" id="studno" name="studentno" />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="ephoto">Photograph's Of Event</label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" disabled type="file" id="ephoto" name="eventPhoto1" />
                                        <input className="input" disabled type="file" id="ephoto" name="eventPhoto2" />
                                        <input className="input" disabled type="file" id="ephoto" name="eventPhoto3" />
                                        <input className="input" disabled type="file" id="ephoto" name="eventPhoto4" />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="cert">Certificate</label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" disabled type="file" id="cert" name="certificate" />
                                    </div>
                            </div>
                            <div class="row">
                                    <div class="col-25">
                                        <label for="poster">Event Poster</label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" disabled type="file" id="poster" name="poster" />
                                    </div>
                            </div>
                            <div class="row">
                                    <div class="col-25">
                                        <label for="cert">Sheet Of Registered Student's</label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" disabled type="url" id="cert" name="sheeturl" placeholder="https://www.google.com"/>
                                    </div>
                            </div>
{/* 
<div class="row">
    <input onClick = { onSuccessSubmit } type="submit" value="Submit" />
</div> */}
                        </form>
                    </div>
            </div>
        </div>
            <div>
                <div className="sub-btn">
                    <div class="row">
                        <input style={{backgroundColor:"#E74C3C"}} className="submit" onClick = { onSuccessSubmit } type="submit" value="Submit" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteEvent;