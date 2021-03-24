import './css/CreateEvent.css';
import SpeakerFields from './SpeakerFields';
import { useState } from 'react';
//import { Link } from 'react-router-dom';

function onSuccessSubmit(){
    window.confirm( " Success! " );
}

function PostEvent(){
    const [inputList, setInputList] = useState([{ spkName: "", spkEmail: "", spkCV: "", spkPhoto: "" }]);

    const [actDate, setactDate] = useState('');
    const [actDateTo, setactDateTo] = useState('');
    const [evntDesc, setevntDesc] = useState('');
    const [noOfStud, setnoOfStud] = useState('');
    const [evntPic1, setevntPic1] = useState('');
    const [evntPic2, setevntPic2] = useState('');
    const [evntPic3, setevntPic3] = useState('');
    const [evntPic4, setevntPic4] = useState('');
    const [evntCerti, setevntCerti] = useState('');
    const [evntPstr, setevntPstr] = useState('');
    const [studSheet, setstudSheet] = useState('');

    function fields(){
        var postfields = {
            actDate:actDate,
            actDateTo:actDateTo,
            inputList: inputList,
            evntDesc: evntDesc,
            noOfStud: noOfStud,
            evntPic1: evntPic1,
            evntPic2: evntPic2,
            evntPic3: evntPic3,
            evntPic4, evntPic4,
            evntCerti: evntCerti,
            evntPstr: evntPstr,
            studSheet: studSheet
        }
        console.log(postfields)
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      };
      const handleInputChange1 = (e, index) => {
        const { name, files } = e.target;
        const list = [...inputList];
        list[index][name] = files;
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
        setInputList([...inputList, { spkName: "", spkEmail: "", spkCV: "", spkPhoto: "" }]);
      };

    return(
        <div>
        <h1 className="eventLabel">Post Event</h1>
        <div class="grid-container">
                <div className="col-25" id="card">
                    <div className="container">
                        <form action='#'>
                            <div class="row">
                                <div class="col-25">
                                    <label for="adate"><b>Actual Date</b></label>
                                </div>
                                <div class="col-75">
                                    <input className="input" type="date" id="adate" name="actualdate" 
                                     value={actDate} onChange={(e)=>setactDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="atdate"><b>To</b></label>
                                </div>
                                <div class="col-75">
                                    <input className="input" type="date" id="atdate" name="eventenddate" 
                                    value={actDateTo} onChange={(e)=>setactDateTo(e.target.value)}
                                    />
                                </div>
                            </div>
                        
                            <div class="row">
                                    <div class="col-25">
                                        <label for="date"><b>Speaker's Details</b></label>
                                    </div>
                                    <div class="col-75">
                                        {/* <SpeakerFields /> */}
                                        {inputList.map((x, i) => {
                                            return (
                                            <div>
                                                <div className="row">
                                                    <div class="col-25">
                                                        <label for="date">Speaker's Name</label>
                                                    </div>
                                                    <div className="col-75">
                                                        <input
                                                        className="input"
                                                        type="text"
                                                        name="spkName"
                                                        placeholder="Speaker Name"
                                                        value={x.spkName}
                                                        onChange={e => handleInputChange(e, i)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div class="col-25">
                                                        <label for="date">Speaker's Email</label>
                                                    </div>
                                                    <div className="col-75">
                                                        <input
                                                        type="email"
                                                        className="input"
                                                        name="spkEmail"
                                                        placeholder="Speaker Email"
                                                        value={x.spkEmail}
                                                        onChange={e => handleInputChange(e, i)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div class="col-25">
                                                        <label for="date">Speaker's CV</label>
                                                    </div>
                                                    <div className="col-75">
                                                        <input
                                                        type="file"
                                                        className="input"
                                                        name="spkCV"
                                                        placeholder="Speaker CV"
                                                        // value={x.spkCV}
                                                        onChange={(e) => handleInputChange1(e, i)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div class="col-25">
                                                        <label for="date">Speaker's Photo</label>
                                                    </div>
                                                    <div className="col-75">
                                                        <input
                                                        type="file"
                                                        className="input"
                                                        name="spkPhoto"
                                                        placeholder="Speaker Photo"
                                                        // value={x.spkCV}
                                                        onChange={e => handleInputChange1(e, i)}
                                                        />
                                                    </div>
                                                </div>
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
                            
                            <div class="row">
                                    <div class="col-25">
                                        <label for="edesc"><b>Event Description</b></label>
                                    </div>
                                    <div class="col-75">
                                        <textarea className="input" id="edesc" name="eventdesc" rows="10"
                                        value={evntDesc} onChange={(e)=>setevntDesc(e.target.value)}
                                        />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="studno"><b>Number of Student's Attended the Event</b></label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" type="number" id="studno" name="studentno" 
                                        value={noOfStud} onChange={(e)=>setnoOfStud(e.target.value)}
                                        />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="ephoto"><b>Photograph's Of Event</b></label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" type="file" id="ephoto" name="eventPhoto1" 
                                         onChange={(e)=>setevntPic1(e.target.files)}
                                        />
                                        <input className="input" type="file" id="ephoto" name="eventPhoto2" 
                                        onChange={(e)=>setevntPic2(e.target.files)}
                                        />
                                        <input className="input" type="file" id="ephoto" name="eventPhoto3" 
                                        onChange={(e)=>setevntPic3(e.target.files)}
                                        />
                                        <input className="input" type="file" id="ephoto" name="eventPhoto4" 
                                        onChange={(e)=>setevntPic4(e.target.files)}
                                        />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="cert"><b>Certificate</b></label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" type="file" id="cert" name="certificate" 
                                        onChange={(e)=>setevntCerti(e.target.files)}
                                        />
                                    </div>
                            </div>
                            <div class="row">
                                    <div class="col-25">
                                        <label for="poster"><b>Event Poster</b></label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" type="file" id="poster" name="poster" 
                                        onChange={(e)=>setevntPstr(e.target.files)}
                                        />
                                    </div>
                            </div>
                            <div class="row">
                                    <div class="col-25">
                                        <label for="cert"><b>Sheet Of Registered Student's</b></label>
                                    </div>
                                    <div class="col-75">
                                        <input className="input" type="url" id="cert" name="sheeturl" placeholder="https://www.google.com"
                                        value={studSheet} onChange={(e)=>setstudSheet(e.target.value)}
                                        />
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostEvent;