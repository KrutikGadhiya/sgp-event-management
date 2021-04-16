import './css/CreateEvent.css';
// import SpeakerFields from './SpeakerFields';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router';

toast.configure()
//import { Link } from 'react-router-dom';

// function onSuccessSubmit(){
//     window.confirm( " Success! " );
// }

function PostEvent(){
    const history = useHistory()
    const [inputList, setInputList] = useState([{ spkName: "", spkEmail: "", spkCV: "", spkPhoto: "" }]);

    const [eventId, setevntId] = useState('')
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
    const [inputListUrl, setInputListUrl] = useState([])
    const [loading, setLoading] = useState(false)

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

      const submitForm = async () => {
        // if (eventName === "" || evntType === "" || propDate === "" || propDateTo === "" || durEvnt === "" || evntLevel === "" || orgInst === "" || deptName === "" || inputList === "") {
        //     //fireOnFailure()
        //     console.log('hello');
        // } else {
            await axios.post('/postEvent', {
                eventId: eventId,
                actDate:actDate,
                actDateTo:actDateTo,
                inputList: inputList,
                evntDesc: evntDesc,
                noOfStud: noOfStud,
                evntCerti: evntCertiUrl,
                evntPic1: evntPic1Url,
                evntPic2: evntPic2Url,
                evntPic3: evntPic3Url,
                evntPic4: evntPic4Url,
                evntCerti: evntCertiUrl,
                evntPstr: evntPstrUrl,
                studSheet: studSheet
            },
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then((response) => {
                console.log(response)
                toast.success(response.data.message, {
                    autoClose: 5000
                })
                history.push('/dashboard')
            })
            .catch((err) => {
                console.log(err)
            })
            //fireOnSuccess()
        // }
    }
    function fields(){
        let postfields = {
            eventId: eventId,
            actDate:actDate,
            actDateTo:actDateTo,
            inputList: inputList,
            evntDesc: evntDesc,
            noOfStud: noOfStud,
            evntPic1: evntPic1Url,
            evntPic2: evntPic2Url,
            evntPic3: evntPic3Url,
            evntPic4: evntPic4Url,
            evntCerti: evntCertiUrl,
            evntPstr: evntPstrUrl,
            studSheet: studSheet
        }
        console.log(postfields)
    }


    return(
        <div>
        <h1 className="eventLabel">Post Event</h1>
        <div class="grid-container">
                <div className="col-25" id="card">
                    <div className="container">
                        <div>
                            <div className="row">
                                <div class="col-25">
                                    <label htmlFor="eventId"><b>Event ID</b></label>
                                </div>
                                <div class="col-75">
                                    <input required className="input" type="text" id="eId" name="eventID" placeholder="YYYY - INSTITUTE - DEPARTMENT - COUNT"
                                        value={eventId} onChange={(e) => setevntId(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="adate"><b>Actual Date</b></label>
                                </div>
                                <div class="col-75">
                                    <input required className="input" type="date" id="adate" name="actualdate" 
                                     value={actDate} onChange={(e)=>setactDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-25">
                                    <label for="atdate"><b>To</b></label>
                                </div>
                                <div class="col-75">
                                    <input required className="input" type="date" id="atdate" name="eventenddate" 
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
                                                        <input required
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
                                                        <input required
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
                                                        <input required
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
                                                        <label for="date">Speaker's Photo<br/><i>(file format: jpg, jpeg, png) Under 500KB</i></label>
                                                    </div>
                                                    <div className="col-75">
                                                        <input required
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
                                        <textarea required className="input" id="edesc" name="eventdesc" rows="10"
                                        value={evntDesc} onChange={(e)=>setevntDesc(e.target.value)}
                                        />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="studno"><b>Number of Student's Attended the Event</b></label>
                                    </div>
                                    <div class="col-75">
                                        <input required className="input" type="number" id="studno" name="studentno" 
                                        value={noOfStud} onChange={(e)=>setnoOfStud(e.target.value)}
                                        />
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-25">
                                        <label for="ephoto"><b>Photograph's Of Event</b>t<br/>(upload 4 photographs)<br/><i>(file format: jpg, jpeg, png) Under 500KB</i></label>
                                    </div>
                                    <div class="col-75">
                                        <input required className="input" type="file" id="ephoto" name="eventPhoto1" 
                                         onChange={(e)=>{
                                             setevntPic1(e.target.files)
                                             setLoading(true)
                                             const data = new FormData()
                                             data.append("file", e.target.files[0])
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
                                                 setLoading(false)
                                             })
                                            }
                                        }
                                        />
                                        <input required className="input" type="file" id="ephoto" name="eventPhoto2" 
                                        onChange={(e)=>{
                                            setevntPic2(e.target.files)
                                            setLoading(true)
                                            const data = new FormData()
                                            data.append("file", e.target.files[0])
                                            data.append("upload_preset", "sgp-post")
                                            data.append("cloud_name", "dkoj7svtw")
                                            fetch("https://api.cloudinary.com/v1_1/dkoj7svtw/image/upload", {
                                                method: "post",
                                                body: data
                                            })
                                            .then( res => res.json())
                                            .then(data1 => {
                                                console.log(data1.url)
                                                setevntPic2Url(data1.url)
                                                setLoading(false)
                                            })
                                           }}
                                        />
                                        <input required className="input" type="file" id="ephoto" name="eventPhoto3" 
                                        onChange={(e)=>{
                                            setevntPic3(e.target.files)
                                            setLoading(true)
                                            const data = new FormData()
                                            data.append("file", e.target.files[0])
                                            data.append("upload_preset", "sgp-post")
                                            data.append("cloud_name", "dkoj7svtw")
                                            fetch("https://api.cloudinary.com/v1_1/dkoj7svtw/image/upload", {
                                                method: "post",
                                                body: data
                                            })
                                            .then( res => res.json())
                                            .then(data1 => {
                                                console.log(data1.url)
                                                setevntPic3Url(data1.url)
                                                setLoading(false)
                                            })
                                           }}
                                        />
                                        <input required className="input" type="file" id="ephoto" name="eventPhoto4" 
                                        onChange={(e)=>{
                                            setevntPic4(e.target.files)
                                            setLoading(true)
                                            const data = new FormData()
                                            data.append("file", e.target.files[0])
                                            data.append("upload_preset", "sgp-post")
                                            data.append("cloud_name", "dkoj7svtw")
                                            fetch("https://api.cloudinary.com/v1_1/dkoj7svtw/image/upload", {
                                                method: "post",
                                                body: data
                                            })
                                            .then( res => res.json())
                                            .then(data1 => {
                                                console.log(data1.url)
                                                setevntPic4Url(data1.url)
                                                setLoading(false)
                                            })
                                        }}
                                        />
                                    </div>
                            </div>
                            <br />
                            <div class="row">
                                    <div class="col-25">
                                        <label for="cert"><b>Certificate</b><br/><i>(file format: jpg, jpeg, png) Under 500KB</i></label>
                                    </div>
                                    <div class="col-75">
                                        <input required className="input" type="file" id="cert" name="certificate" 
                                        onChange={(e)=>{
                                            setevntCerti(e.target.files)
                                            setLoading(true)
                                            const data = new FormData()
                                            data.append("file", e.target.files[0])
                                            data.append("upload_preset", "sgp-post")
                                            data.append("cloud_name", "dkoj7svtw")
                                            fetch("https://api.cloudinary.com/v1_1/dkoj7svtw/image/upload", {
                                                method: "post",
                                                body: data
                                            })
                                            .then( res => res.json())
                                            .then(data1 => {
                                                console.log(data1.url)
                                                setevntCertiUrl(data1.url)
                                                setLoading(false)
                                            })
                                        }}
                                        />
                                    </div>
                            </div>
                            <div class="row">
                                    <div class="col-25">
                                        <label for="poster"><b>Event Poster</b><br/><i>(file format: jpg, jpeg, png) Under 500KB</i></label>
                                    </div>
                                    <div class="col-75">
                                        <input required className="input" type="file" id="poster" name="poster" 
                                        onChange={(e)=>{
                                            setLoading(true)
                                            setevntPstr(e.target.files)
                                            const data = new FormData()
                                            data.append("file", e.target.files[0])
                                            data.append("upload_preset", "sgp-post")
                                            data.append("cloud_name", "dkoj7svtw")
                                            fetch("https://api.cloudinary.com/v1_1/dkoj7svtw/image/upload", {
                                                method: "post",
                                                body: data
                                            })
                                            .then( res => res.json())
                                            .then(data1 => {
                                                console.log(data1.url)
                                                setevntPstrUrl(data1.url)
                                                setLoading(false)
                                            })
                                           }}
                                        />
                                    </div>
                            </div>
                            <div class="row">
                                    <div class="col-25">
                                        <label for="cert"><b>Sheet Of Registered Student's</b></label>
                                    </div>
                                    <div class="col-75">
                                        <input required className="input" type="url" id="cert" name="sheeturl" placeholder="https://www.google.com"
                                        value={studSheet} onChange={(e)=>setstudSheet(e.target.value)}
                                        />
                                    </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
            <div>
                <div className="sub-btn">
                    <div class="row">
                        { !loading && 
                            <input className="submit" onClick={ submitForm } type="submit" value="Submit" />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostEvent;