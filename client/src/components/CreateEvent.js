import './css/CreateEvent.css';
import PrePdf from './PrePdf';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver'
import Swal from 'sweetalert2'
//import { Link } from 'react-router-dom';

const fireOnSuccess = () => {
    Swal.fire({
        title: 'Sending Data',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        }
    }).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'SuccessFull',
            text: 'SuccessFully Submitted',
            //timer: 3000,
            //timerProgressBar: true,
            // didOpen: () => {
            //     Swal.showLoading()
            // }
        })
    }
    )
}
const fireOnFailure = () => {
    Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Please Enter the Fields',
    })
}

const today = new Date();

var yyyy = today.getFullYear()
var mm = String(today.getMonth() + 1).padStart(2, '0')
var dd = String(today.getDate() + 1).padStart(2, '0')
var dd1 = String(today.getDate() + 2).padStart(2, '0')
var minDate = yyyy + '-' + mm + '-' + dd
var minDate2 = yyyy + '-' + mm + '-' + dd1


function CreateEvent(props) {
    //console.log(typeof(minDate))
    const [depCount, setDepCount] = useState('0');
    const [dep, setDep] = useState('');
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
    const [count, setCount] = useState({
        aripCount: "0",
        cipsCount: "0",
        cmpicaCount: "0",
        cspitCount: "0",
        depstarCount: "0",
        i2imCount: "0",
        mtinCount: "0",
        pdpiasCount: "0",
        rpcpCount: "0"
    })
    const setEvntIdCount = (dep) => {
        if (dep === 'CSPIT'){
            setDepCount(count.cspitCount)
            return String(Number(count.cspitCount) + 1)
        }
        if (dep === 'DEPSTAR'){
            setDepCount(count.depstarCount)
            return String(Number(count.depstarCount) + 1)
        }
        if (dep === 'PDPIAS'){
            setDepCount(count.pdpiasCount)
            return String(Number(count.pdpiasCount) + 1)
        }
        if (dep === 'CMPICA'){
            setDepCount(count.cmpicaCount)
            return String(Number(count.cmpicaCount) + 1)
        }
        if (dep === 'RPCP'){
            setDepCount(count.rpcpCount)
            return String(Number(count.rpcpCount) + 1)
        }
        if (dep === 'I2IM'){
            setDepCount(count.i2imCount)
            return String(Number(count.i2imCount) + 1)
        }
        if (dep === 'ARIP'){
            setDepCount(count.aripCount)
            return String(Number(count.aripCount) + 1)
        }
        if (dep === 'MTIN'){
            setDepCount(count.mtinCount)
            return String(Number(count.mtinCount) + 1)
        }
        if (dep === 'CIPS'){
            setDepCount(count.cipsCount)
            return String(Number(count.cipsCount) + 1)
        }

        console.log(depCount)
        console.log(count)
        return depCount
    }

    const getCount = () => {
        axios.post('/getcount', {
        }).then((countRes) => {
            console.log(countRes)
            setCount(countRes.data)
        })
    }
    useEffect(async () => {
        await getCount()
    }, [props.email])

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

    const create = () => {
        setCheck(true)
    }

    const submitForm = async () => {
        if (eventName === "" || evntType === "" || propDate === "" || propDateTo === "" || durEvnt === "" || evntLevel === "" || orgInst === "" || deptName === "" || inputList === "") {
            fireOnFailure()
        } else {
            await axios.post('/preevent', {
                userEmail: props.email,
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
            })
            .then((response) => {
                console.log(response)
                console.log(response.status)
                if(response.status === 200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfull',
                        text: 'Successfully Submited',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Failed to Submit',
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
            //fireOnSuccess()
        }
    }


    return (
        <>{!checkState ?
            (<div>
                <h1 className="eventLabel">Pre Event</h1>
                <form id='form'>
                    <div class="grid-container">
                        <div class="col-25" id="card">
                            <div class="container">
                                <div className="row">
                                    <div class="col-25">
                                        <label for="eventId"><b>Event ID</b></label>
                                    </div>
                                    <div class="col-75">
                                        <input disabled className="input" type="text" id="eId" name="eventID" placeholder="YYYY - INSTITUTE - DEPARTMENT - COUNT"
                                            value={eventId} onChange={(e) => setevntId(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="col-25">
                                        <label for="eventId"><b>Event Name</b></label>
                                    </div>
                                    <div class="col-75">
                                        <input required className="input" type="text" id="ename" name="eventName" placeholder="Code With Fun"
                                            value={eventName} onChange={(e) => setevntName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-25">
                                        <label for="event"><b>Type Of Event</b></label>
                                    </div>
                                    <div class="col-75">
                                        <select required className="input" id="event" name="eventtype"
                                            value={evntType} onChange={(e) => setevntType(e.target.value)}
                                        >
                                            <option>Select Event Type</option>
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
                                        <input required className="input" type="date" id="sdate" min={minDate} name="eventstartdate"
                                            value={propDate} onChange={(e) => setPropDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-25">
                                        <label for="date"><b>To</b></label>
                                    </div>
                                    <div class="col-75">
                                        <input required className="input" type="date" id="edate" min={minDate2} name="eventenddate"
                                            value={propDateTo} onChange={(e) => setPropDateTo(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-25">
                                        <label for="date"><b>Duration Of Event</b></label>
                                    </div>
                                    <div class="col-75">
                                        <input required className="input" type="number" id="duration" name="duration"
                                            value={durEvnt} onChange={(e) => setdurEvnt(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-25">
                                        <label for="event"><b>Level Of Event</b></label>
                                    </div>
                                    <div class="col-75">
                                        <select required className="input" id="event" name="eventtype"
                                            value={evntLevel} onChange={(e) => setevntLevel(e.target.value)}
                                        >
                                            <option >Select Level Of Event</option>
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
                                        <label for="organise"><b>Organising Institute</b></label>
                                    </div>
                                    <div class="col-75">
                                        <select required className="input"
                                            value={orgInst} onChange={(e) => {
                                                setorgInst(e.target.value)
                                                setDepCount(setEvntIdCount(e.target.value))
                                                setevntId(String(yyyy) + '-' + e.target.value + '-' + dep + '-' + setEvntIdCount(e.target.value))
                                            }}
                                        >
                                            <option >Select Organizing Institute</option>
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
                                        <input required autoComplete='off' className="input" type="text" id="dname" name="departname" placeholder="KDPIT"
                                            value={deptName} onChange={(e) => {
                                                setdeptName(e.target.value)
                                                setDep(e.target.value)
                                                setevntId(String(yyyy) + '-' + orgInst + '-' + e.target.value + '-' + String(Number(depCount) + 1))
                                            }}
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
                                                        required
                                                        className="input"
                                                        type="text"
                                                        name="cordName"
                                                        placeholder="Cordinator Name"
                                                        value={x.cordName}
                                                        onChange={e => handleInputChange(e, i)}
                                                    />
                                                    <input
                                                        required
                                                        type="email"
                                                        className="input"
                                                        name="cordEmail"
                                                        placeholder="Cordinator Email"
                                                        value={x.cordEmail}
                                                        onChange={e => handleInputChange(e, i)}
                                                    />
                                                    <input
                                                        required
                                                        type="number"
                                                        className="input"
                                                        name="cordNumber"
                                                        placeholder="Contact Number"
                                                        value={x.cordNumber}
                                                        onChange={e => handleInputChange(e, i)}
                                                    />
                                                    <div className="btn-box">
                                                        {inputList.length !== 1 && <button
                                                            id='removefield'
                                                            className="rem-btn"
                                                            onClick={(e) => { handleRemoveClick(i); e.preventDefault() }}>-</button>}
                                                        {inputList.length - 1 === i && <button id='addfield' className="add-btn" onClick={handleAddClick}>+</button>}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="sub-btn">
                            <div id="submit-btns" class="row">
                                <input className="submit" onClick={submitForm} type="submit" value="Submit" />
                                {/* <button className="submit" onClick = { createAndDownloasPdf } >Create HTML PDF</button> */}
                                <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
                                <button className='submit' onClick={create}>Create PDF</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>) : (
                <PrePdf
                    changeState={checkState => setCheck(checkState)}
                    eventId={eventId}
                    eventName={eventName}
                    evntType={evntType}
                    propDate={propDate}
                    propDateTo={propDateTo}
                    durEvnt={durEvnt}
                    evntLevel={evntLevel}
                    orgInst={orgInst}
                    deptName={deptName}
                    inputList={inputList}
                />
            )
        }
        </>
    )
}

export default CreateEvent;