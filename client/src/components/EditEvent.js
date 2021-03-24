import './css/CreateEvent.css';
import { useState } from 'react'
import CordinatorFields from './CordinatorFields';
import SpeakerFields from './SpeakerFields';
import axios from 'axios'
//import { Link } from 'react-router-dom';

function onSuccessSubmit(){
    window.confirm( " Success! " );
}

function EditEvent(){
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
           console.log(response)
           
       })
    }
    return(
        <div>
            <h1 className="eventLabel">Edit Event</h1>
            <div id="card1">
                <div  className="container">
                    <div  className="row">
                        <div class="col-25"> 
                            <label for="eventId">Event ID</label>
                        </div>
                        <div class="col-75">
                                <input className="input" type="text" id="eId" name="eventID" placeholder="YYYY/DEPARTMENT/COUNT" 
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
                        <form action='#'>
                            <div className="eventLabel">
                                <h3>Pre Event Information</h3>
                            </div>
                            
                            <div className="row">
                                <div class="col-25"> 
                                    <label for="eventId">Event Name</label>
                                </div>
                                <div class="col-75">
                                    <input required className="input" type="text" id="ename" name="eventName" placeholder="Code With Fun" 
                                        value={eventName} onChange={(e)=>setevntName(e.target.value)}
                                    />                                
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                <label for="event">Type Of Event</label>
                                </div>
                                <div class="col-75">
                                <select required className="input" id="event" name="eventtype"
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
                                    <input required className="input" type="date" id="sdate"  name="eventstartdate" 
                                    value={propDate} onChange={(e)=>setPropDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="date">To</label>
                                </div>
                                <div class="col-75">
                                    <input required className="input" type="date" id="edate"  name="eventenddate" 
                                    value={propDateTo} onChange={(e)=>setPropDateTo(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                    <label for="date">Duration Of Event</label>
                                </div>
                                <div class="col-75">
                                    <input required className="input" type="number" id="duration" name="duration" 
                                    value={durEvnt} onChange={(e)=>setdurEvnt(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                <label for="event">Level Of Event</label>
                                </div>
                                <div class="col-75">
                                <select required className="input" id="event" name="eventtype"
                                    value={evntLevel} onChange={(e)=>setevntLevel(e.target.value)}
                                >
                                    <option value="Webinar">Institute</option>
                                    <option value="Seminar">University</option>
                                    <option value="Confrence">International</option>
                                    <option value="technical">Technical</option>
                                    <option value="nontechnical">Non-Technical</option>
                                    <option value="cultural">Cultural</option>
                                </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                    <label for="organise">Organising Institute</label>
                                </div>
                                <div class="col-75">
                                <select required className="input"
                                value={orgInst} onChange={ (e)=> {
                                    setorgInst(e.target.value)
                                }}
                                >
                                    <option selected="selected">Select Institute</option>
                                    <option value="1">CSPIT</option>
                                    <option value="2">DEPSTAR</option>
                                    <option value="3">PDPIAS</option>
                                    <option value="4">CMPICA</option>
                                    <option value="5">I2IM</option>
                                    <option value="6">RPCP</option>
                                    <option value="7">ARIP</option>
                                    <option value="8">MTIN</option>
                                    <option value="9">CIPS</option>
                                </select>
                                </div>
                            </div>
                        <div class="row">
                            <div class="col-25">
                            <label for="dname">Department Name</label>
                            </div>
                            <div class="col-75">
                                <input required autoComplete='off' className="input" type="text" id="dname" name="departname" placeholder="KDPIT" 
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
                                <CordinatorFields />
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
                                    <input className="input" type="date" id="adate" name="actualdate" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="atdate">To</label>
                                </div>
                                <div class="col-75">
                                    <input className="input" type="date" id="atdate" name="eventenddate" />
                                </div>
                            </div>
                        
                            <div class="row">
                                    <div class="col-25">
                                        <label for="date">Speaker's Details</label>
                                    </div>
                                    <div class="col-75">
                                        <SpeakerFields />
                                    </div>
                            </div>
                            
                            <div class="row">
                                    <div class="col-25">
                                        <label for="edesc">Event Description</label>
                                    </div>
                                    <div class="col-75">
                                        <textarea className="input" id="edesc" name="eventdesc" />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="studno">Number of Student's Attended the Event</label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" type="number" id="studno" name="studentno" />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="ephoto">Photograph's Of Event</label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" type="file" id="ephoto" name="eventPhoto1" />
                                        <input className="input" type="file" id="ephoto" name="eventPhoto2" />
                                        <input className="input" type="file" id="ephoto" name="eventPhoto3" />
                                        <input className="input" type="file" id="ephoto" name="eventPhoto4" />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="cert">Certificate</label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" type="file" id="cert" name="certificate" />
                                    </div>
                            </div>
                            <div class="row">
                                    <div class="col-25">
                                        <label for="poster">Event Poster</label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" type="file" id="poster" name="poster" />
                                    </div>
                            </div>
                            <div class="row">
                                    <div class="col-25">
                                        <label for="cert">Sheet Of Registered Student's</label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" type="url" id="cert" name="sheeturl" placeholder="https://www.google.com"/>
                                    </div>
                            </div>


                        </form>
                    </div>
            </div>
        </div>
            <div>
                <div className="sub-btn">
                    <div class="row">
                        <input className="submit" onClick = { onSuccessSubmit } type="submit" value="Submit" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEvent;