import './css/CreateEvent.css';
import { useState } from 'react'
import CordinatorFields from './CordinatorFields';
import axios from 'axios'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css'
//import { Link } from 'react-router-dom';

toast.configure()
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

    const [inputList1, setInputList1] = useState([{ spkName: "", spkEmail: "", spkCV: "", spkPhoto: "" }]);

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

    const [uId, setUId] = useState("")
    const [preId, setPreId] = useState("")
    const [postId, setPostId] = useState("")



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

           setPostId(response.data.postDetails._id)
           setPreId(response.data.postDetails.eventId._id)
           setUId(response.data.user._id)
           console.log(response.data.postDetails.inputList);
           
           setHaveLst(true)

       })
       .catch( (err) => {
           console.log(err);
       })
    }

    const deleteEvent = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You Are About To Delete The Event!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Delete!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.post("/deleteEvent", { uId, preId, postId },
                {
                    // params: { uId, preId, postId },
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }   
                })
                .then((response) => {
                    console.log(response)
                    toast.success(response.data.message, {
                        autoClose: 5000
                    })
                })
                .catch( err => {
                    console.log(err);
                    toast.error(err, {
                        autoClose: 5000
                    })
                })
            }
            else {
                Swal.fire(
                {
                    title: 'Delete Event Was Cancelled',
                    icon: 'info',
                }
                )
            }
          })
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      };

    const handleInputChange1 = (e, index) => {
        setLoading(true)
        const { name, files } = e.target;
        const list = [...inputList];

        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "sgp-post")
        data.append("cloud_name", "dkoj7svtw")
        fetch("https://api.cloudinary.com/v1_1/dkoj7svtw/image/upload", {
            method: "post",
            body: data
        })
        .then( res => res.json())
        .then(data1 => {
            console.log(data1.url)
            setevntPic1Url(data1.url)
            list[index][name] = data1.url;
            setInputList(list);
            setLoading(false)
        })
        .catch( err => {
            console.log(err);
        })
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
            <h1 className="eventLabel">Delete Event</h1>
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
                                    <input disabled required className="input" type="text" id="ename" name="eventName" placeholder="Code With Fun" 
                                        value={eventName} onChange={(e)=>setevntName(e.target.value)}
                                    />                                
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                <label for="event">Type Of Event</label>
                                </div>
                                <div class="col-75">
                                <select disabled required className="input" id="event" name="eventtype"
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
                                    <input disabled required className="input" type="date" id="sdate"  name="eventstartdate" 
                                    value={propDate} onChange={(e)=>setPropDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="date">To</label>
                                </div>
                                <div class="col-75">
                                    <input disabled required className="input" type="date" id="edate"  name="eventenddate" 
                                    value={propDateTo} onChange={(e)=>setPropDateTo(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                    <label for="date">Duration Of Event</label>
                                </div>
                                <div class="col-75">
                                    <input disabled required className="input" type="number" id="duration" name="duration" 
                                    value={durEvnt} onChange={(e)=>setdurEvnt(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-25">
                                <label for="event">Level Of Event</label>
                                </div>
                                <div class="col-75">
                                <select disabled required className="input" id="event" name="eventtype"
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
                                <select disabled required className="input"
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
                                <input disabled required autoComplete='off' className="input" type="text" id="dname" name="departname" placeholder="KDPIT" 
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
                                    <input disabled className="input" type="date" id="adate" name="actualdate" 
                                        value={actDate} onChange = {(e) => setactDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="atdate">To</label>
                                </div>
                                <div class="col-75">
                                    <input disabled className="input" type="date" id="atdate" name="eventenddate" 
                                    value={actDateTo} onChange = {(e) => setactDateTo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                    <div class="col-25">
                                        <label for="date">Speaker's Details</label>
                                    </div>
                                    {/* <div class="col-75">
                                        <SpeakerFields input = { inputList1 }/>
                                    </div> */}
                                    <div class="col-75">
                                        {/* <SpeakerFields /> */}
                                        {inputList1.map((x, i) => {
                                            return (
                                            <div key={i}>
                                                <div className="row">
                                                    <div class="col-25">
                                                        <label for="date">Speaker's Name</label>
                                                    </div>
                                                    <div className="col-75">
                                                        <input disabled required
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
                                                        <input disabled required
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
                                                        <label for="date">Speaker's CV<br/><i>(file format: jpg, jpeg, png) Under 1MB</i></label>
                                                    </div>
                                                    <div className="col-75">
                                                        <input disabled required
                                                        type="file"
                                                        className="input"
                                                        name="spkCV"
                                                        placeholder="Speaker CV"
                                                        // value={x.spkCV}
                                                        onChange={(e) => handleInputChange1(e, i)}
                                                        />
                                                        <img style={{border: "2px solid #000"}} src={ x.spkCV } width="100px" alt="spkcv"/>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div class="col-25">
                                                        <label for="date">Speaker's Photo<br/><i>(file format: jpg, jpeg, png) Under 500KB</i></label>
                                                    </div>
                                                    <div className="col-75">
                                                        <input disabled required
                                                        type="file"
                                                        className="input"
                                                        name="spkPhoto"
                                                        placeholder="Speaker Photo"
                                                        // value={x.spkCV}
                                                        onChange={e => handleInputChange1(e, i)}
                                                        />
                                                        <img style={{border: "2px solid #000"}} src={ x.spkPhoto } width="100px" alt="spkcv"/>
                                                    </div>
                                                </div>
                                                {/* <div className="btn-box">
                                                    {inputList.length !== 1 && <button
                                                        className="rem-btn"
                                                        onClick={() => handleRemoveClick(i)}>-</button>}
                                                    {inputList.length - 1 === i && <button className="add-btn" onClick={handleAddClick}>+</button>}
                                                </div> */}
                                            </div>
                                            );
                                        })}
                                        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
                                    </div>
                            </div>
                            
                            <div class="row">
                                    <div class="col-25">
                                        <label for="edesc">Event Description</label>
                                    </div>
                                    <div class="col-75">
                                        <textarea disabled className="input" id="edesc" name="eventdesc" 
                                        value={evntDesc} onChange = {(e) => setevntDesc(e.target.value)}
                                        />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="studno">Number of Student's Attended the Event</label>
                                    </div>
                                    <div class="col-75">
                                        <input disabled className="input" type="number" id="studno" name="studentno" 
                                        value={noOfStud} onChange = {(e) => setnoOfStud(e.target.value)}
                                        />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="ephoto">Photograph's Of Event</label>
                                    </div>
                                    <div class="col-75">
                                        <input disabled required className="input" type="file" id="ephoto" name="eventPhoto1" 
                                         onChange={(e)=>setevntPic1(e.target.files)}
                                        />
                                        <img style={{border: "2px solid #000"}} src={ evntPic1Url } width="100px" alt="epic1"/>
                                        <input disabled required className="input" type="file" id="ephoto" name="eventPhoto2" 
                                        onChange={(e)=>setevntPic2(e.target.files)}
                                        />
                                        <img style={{border: "2px solid #000"}} src={ evntPic2Url } width="100px" alt="epic2"/>
                                        <input disabled required className="input" type="file" id="ephoto" name="eventPhoto3" 
                                        onChange={(e)=>setevntPic3(e.target.files)}
                                        />
                                        <img style={{border: "2px solid #000"}} src={ evntPic3Url } width="100px" alt="epic3"/>
                                        <input disabled required className="input" type="file" id="ephoto" name="eventPhoto4" 
                                        onChange={(e)=>setevntPic4(e.target.files)}
                                        />
                                        <img style={{border: "2px solid #000"}} src={ evntPic4Url } width="100px" alt="epic4"/>
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="cert">Certificate</label>
                                    </div>
                                    <div class="col-75">
                                        <input disabled required className="input" type="file" id="cert" name="certificate" 
                                        onChange={(e)=>setevntCerti(e.target.files)}
                                        />
                                        <img style={{border: "2px solid #000"}} src={ evntCertiUrl } width="100px" alt="ecerti"/>
                                    </div>
                            </div>
                            <div class="row">
                                    <div class="col-25">
                                        <label for="poster">Event Poster</label>
                                    </div>
                                    <div class="col-75">
                                        <input disabled required className="input" type="file" id="poster" name="poster" 
                                        onChange={(e)=>setevntPstr(e.target.files)}
                                        />
                                        <img style={{border: "2px solid #000"}} src={ evntPstrUrl } width="100px" alt="epstr"/>
                                    </div>
                            </div>
                            <div class="row">
                                    <div class="col-25">
                                        <label for="cert">Sheet Of Registered Student's</label>
                                    </div>
                                    <div class="col-75">
                                        <input disabled className="input" type="url" id="cert" name="sheeturl" placeholder="https://www.google.com"
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
                        <input style={{backgroundColor: "red"}} className="submit" onClick = { deleteEvent } type="submit" value="Submit" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteEvent;