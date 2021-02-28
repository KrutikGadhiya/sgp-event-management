import './css/CreateEvent.css';
import CordinatorFields from './CordinatorFields';
import SpeakerFields from './SpeakerFields';
import { Link } from 'react-router-dom';

function CreateEvent(){
    return(
        <div>
        <h1 className="eventLabel">Pre Event</h1>
        <div class="grid-container">
            <div class="col-25" id="card">
                    <div class="container">
                        <form action="/action_page.php">
                            <div className="eventLabel">
                                <h3>Event Information</h3>
                            </div>
                            <div className="row">
                                <div class="col-25"> 
                                    <label for="eventId">Event ID</label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="eId" name="eventID" placeholder="YYYY/DEPARTMENT/COUNT" />
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-25"> 
                                    <label for="eventId">Event Name</label>
                                </div>
                                <div class="col-75">
                                    <input type="text" id="ename" name="eventName" placeholder="Code With Fun" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                <label for="event">Type Of Event</label>
                                </div>
                                <div class="col-75">
                                <select id="event" name="eventtype">
                                    <option value="Webinar">Webinar</option>
                                    <option value="Seminar">Seminar</option>
                                    <option value="Confrence">Confrence</option>
                                </select>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-25">
                                    <label for="date">Proposed Date From</label>
                                </div>
                                <div class="col-75">
                                    <input type="date" id="sdate" name="eventstartdate" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="date">To</label>
                                </div>
                                <div class="col-75">
                                    <input type="date" id="edate" name="eventenddate" />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                    <label for="date">Duration Of Event</label>
                                </div>
                                <div class="col-75">
                                    <input type="number" id="duration" name="duration" />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                <label for="event">Level Of Event</label>
                                </div>
                                <div class="col-75">
                                <select id="event" name="eventtype">
                                    <option value="Webinar">Institute</option>
                                    <option value="Seminar">University</option>
                                    <option value="Confrence">International</option>
                                    <option value="Confrence">National</option>
                                    <option value="Confrence">State</option>
                                </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                    <label for="organise">Organising Institute</label>
                                </div>
                                <div class="col-75">
                                <select class="form-control">
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
                            <input type="text" id="dname" name="departname" placeholder="KDPIT" />
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
                        

                        <div className="row">
                            <input type="submit" value="Submit" />
                        </div>
                        </form>
                    </div>
                </div>
                <div className="col-25" id="card">
                    <div className="container">
                        <form action="/action_page.php">
                            <div className="eventLabel">
                                <h3>Speaker's Details</h3>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="adate">Actual Date</label>
                                </div>
                                <div class="col-75">
                                    <input type="date" id="adate" name="actualdate" />
                                </div>
                            </div>
                        {/* <div class="row">
                            <div class="col-25">
                                <label for="dname">Speaker's Name</label>
                            </div>
                            <div class="col-75">
                                <input type="text" id="dname" name="spkname" placeholder="Sundar Pichai" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="ecord">Speaker's Photograph</label>
                            </div>
                            <div class="col-75">
                                <input type="file" id="ecord" name="spkphoto" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                            <   label for="event">Speaker's CV</label>
                            </div>
                            <div class="col-75">
                                <input type="file" id="ecord" name="spkphoto" />
                            </div>
                        </div>                        
                
                        <div class="row">
                            <div class="col-25">
                                <label for="email">Cordinator's E-mail</label>
                            </div>
                            <div class="col-75">
                                <input type="email" id="email" name="cordemail" />
                            </div>
                        </div> */}
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
                                    <textarea id="edesc" name="eventdesc" />
                                </div>
                        </div>

                        <div class="row">
                                <div class="col-25">
                                    <label for="studno">Number of Student's Attended the Event</label>
                                </div>
                                <div class="col-75">
                                    <input type="number" id="studno" name="studentno" />
                                </div>
                        </div>

                        <div class="row">
                                <div class="col-25">
                                    <label for="ephoto">Photograph's Of Event</label>
                                </div>
                                <div class="col-75">
                                    <input type="file" id="ephoto" name="eventPhoto1" />
                                    <input type="file" id="ephoto" name="eventPhoto2" />
                                    <input type="file" id="ephoto" name="eventPhoto3" />
                                    <input type="file" id="ephoto" name="eventPhoto4" />
                                </div>
                        </div>

                        <div class="row">
                                <div class="col-25">
                                    <label for="cert">Certificate</label>
                                </div>
                                <div class="col-75">
                                    <input type="file" id="cert" name="certificate" />
                                </div>
                        </div>
                        <div class="row">
                                <div class="col-25">
                                    <label for="poster">Event Poster</label>
                                </div>
                                <div class="col-75">
                                    <input type="file" id="poster" name="poster" />
                                </div>
                        </div>
                        <div class="row">
                                <div class="col-25">
                                    <label for="cert">Sheet Of Registered Student's</label>
                                </div>
                                <div class="col-75">
                                    <input type="url" id="cert" name="sheeturl" placeholder="https://www.google.com"/>
                                </div>
                        </div>

                        <div class="row">
                            <input type="submit" value="Submit" />
                        </div>
                        </form>
                    </div>
            </div>
        </div>
        </div>
    )
}

export default CreateEvent;