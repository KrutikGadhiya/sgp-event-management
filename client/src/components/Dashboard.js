import './css/Dashboard.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';
import RadarChart from './RadarChart';

function Dashboard(){
    const [from, setFrom] = useState('2015');
    const [to, setTo] = useState('2020');
    const [checkState, setState] = useState(false);
    const [allEvents, setAllEvents] = useState([{_id:'NA', eventName: 'NA', eventId:'NA', createdBy: {email:'NA', userName:'NA'}}]);

    
    const getAllEvents = () => {
        axios.get('/myEvents', {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then((res) => {
            //console.log(res)
            setAllEvents(res.data.evnts)
        })
        .catch( err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllEvents()
    }, [])

    return(
        <div>
            <div style={{textAlign: 'center', margin: '3% 3%'}}>
                <button className='submit' onClick={ () => setState(false) } >All Events</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className='submit' onClick={ () => setState(true) } >Charts</button>
            </div>
            <> {checkState?
                <div>
                    <div className="card">
                        <div className='container'>
                            <div className="row">
                                <div className="col-25">
                                    <label for="date"><b>Proposed Date From</b></label>
                                </div>
                                <div className="col-75">
                                    <input required className="input" type="text" id="sdate" name="eventstartdate" placeholder="2015"
                                        value={from} onChange={(e) => setFrom(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div className="col-25">
                                    <label for="date"><b>To</b></label>
                                </div>
                                <div class="col-75">
                                    <input required className="input" type="text" id="edate" name="eventenddate" placeholder="2021"
                                        value={to} onChange={(e) => setTo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="sub-btn">
                                <div className="row">
                                    <input className="submit" type="submit" value="GO!" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainContainer">
                        <div className="chart card">
                            <div className="chart1">
                                <BarChart
                                from = {from}
                                to = {to}
                                />
                                <p>Number Of Events</p>
                            </div>
                        </div>
                        <div className="chart card">
                            <div className="chart1">
                                <PieChart />
                                <p>Number Of Students</p>
                            </div>
                        </div>
                    </div>
                    <div className="mainContainer">
                        <div className="chart card">
                            <div className="chart1">
                                <LineChart />
                                <p>No Of Event Type</p>
                            </div>
                        </div>
                        <div className="chart card">
                            <div className="chart1">
                                <RadarChart />
                                <p>Events In Institutes</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='card tableDiv'>
                    <table class='allEventTable'>
                        <tr>
                            <th>Event Name</th>
                            <th>Event ID</th>
                            <th>Created By</th>
                            <th>Email</th>
                        </tr>
                        { allEvents.map( (event, i) => {
                            return (
                                <tr key={event._id}>
                                    <td>{event.eventName}</td>
                                    <td>{event.eventId}</td>
                                    <td>{event.createdBy.userName}</td>
                                    <td>{event.createdBy.email}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            }</>
        </div>
    )
}

export default Dashboard;