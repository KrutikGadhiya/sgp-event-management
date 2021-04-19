import './css/Dashboard.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
// import BarChart from './BarChart';
// import PieChart from './PieChart';
// import LineChart from './LineChart';
// import RadarChart from './RadarChart';
import { Radar, Bar, Line, Pie} from 'react-chartjs-2';

let yearList = [2016, 2017, 2018, 2019, 2020, 2021]

const years = (from, to) => {
    yearList = []
    for(let i = from; i <= to; i++){
        yearList.push(i)
    }
}

function Dashboard(){
    const [from, setFrom] = useState('2015');
    const [to, setTo] = useState('2021');
    const [checkState, setState] = useState(false);
    const [allEvents, setAllEvents] = useState([{_id:'NA', eventName: 'NA', eventId:'NA', createdBy: {email:'NA', userName:'NA'}}]);
    const [yearCount, setYearCount] = useState([12, 10, 2, 3, 5, 15])
    const [stdCount, setStdCount] = useState([502, 419, 650, 780, 789, 803])
    const [evntTypeCount, setevntTypeCount] = useState([12, 19, 3, 5, 2, 3, 10, 5])

    years(parseInt(from.slice(0, 4)), parseInt(to.slice(0, 4)))

    const [count, setCount] = useState({
        aripCount: 0,
        cipsCount: 0,
        cmpicaCount: 0,
        cspitCount: 0,
        depstarCount: 0,
        i2imCount: 0,
        mtinCount: 0,
        pdpiasCount: 0,
        rpcpCount: 0
    })
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

    const updateCharts = async () => {
        getAllEvents()
        await axios.post('/getDepcount', {
            yearList
        }).then((countRes) => {
            setCount(countRes.data)
        })

        await axios.post('/getYearCount', { yearList }, {
            yearList
        }).then((countRes) => {
            //console.log(countRes)
            setYearCount(countRes.data.yearCnt)
            setStdCount(countRes.data.stdCount)
            //console.log(count)
        }) 

        await axios.post('/getEvntTypeCount', { yearList }, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then( response => {
            console.log(response)
            setevntTypeCount(response.data)
        })
        .catch( err => {
            console.log(err);
        })

    }

    useEffect(async () => {
        getAllEvents()
        await axios.post('/getDepcount', {
            yearList
        }).then((countRes) => {
            //console.log(countRes)
            setCount(countRes.data)
            //console.log(count)
        })
        await axios.post('/getYearCount', {
            yearList
        }).then((countRes) => {
            //console.log(countRes)
            setYearCount(countRes.data.yearCnt)
            setStdCount(countRes.data.stdCount)
            //console.log(count)
        })
        await axios.post('/getEvntTypeCount', { yearList }, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then( response => {
            console.log(response)
            setevntTypeCount(response.data)
        })
        .catch( err => {
            console.log(err);
        })
    }, [])

    return(
        <div>
            <div style={{textAlign: 'center', margin: '3% 3%'}}>
                <button className='submit' onClick={ () => setState(false) } >My Events</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className='submit' onClick={ () => setState(true) } >Charts</button>
            </div>
            <> {checkState?
                <div>
                    <div style={{paddingBottom: "2%"}} className="card">
                        <div className='container'>
                            <div className="row">
                                <div className="col-25">
                                    <label for="date"><b>From</b></label>
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
                                    <input onClick={ updateCharts } className="submit" type="submit" value="GO!" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainContainer">
                        <div className="chart card">
                            <div className="chart1">
                                {/* <BarChart
                                from = {from}
                                to = {to}
                                /> */}
                                <Bar 
                                    data={{
                                        // labels: [2016, 2017, 2018, 2019, 2020, 2021],
                                        labels: yearList,
                                        datasets: [
                                            {
                                            label: 'No of Events',
                                            //   data: [12, 10, 2, 3, 5, 15],
                                            data: yearCount,
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.5)',
                                                'rgba(54, 162, 235, 0.5)',
                                                'rgba(255, 206, 86, 0.5)',
                                                'rgba(75, 192, 192, 0.5)',
                                                'rgba(153, 102, 255, 0.5)',
                                                'rgba(255, 159, 64, 0.5)',
                                                'rgba(23, 165, 137, 0.5)',
                                                'rgba(40, 55, 71, 0.5)',
                                                'rgba(146, 43, 33, 0.5)',
                                                'rgba(255, 99, 132, 0.5)',
                                                'rgba(54, 162, 235, 0.5)',
                                                'rgba(255, 206, 86, 0.5)',
                                                'rgba(75, 192, 192, 0.5)',
                                                'rgba(153, 102, 255, 0.5)',
                                                'rgba(255, 159, 64, 0.5)',
                                                'rgba(23, 165, 137, 0.5)',
                                                'rgba(40, 55, 71, 0.5)',
                                                'rgba(146, 43, 33, 0.5)'
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)',
                                                'rgba(23, 165, 137, 1)',
                                                'rgba(40, 55, 71, 1)',
                                                'rgba(146, 43, 33, 1)',
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)',
                                                'rgba(23, 165, 137, 1)',
                                                'rgba(40, 55, 71, 1)',
                                                'rgba(146, 43, 33, 1)'
                                            ],
                                            borderWidth: 1,
                                            },
                                        ],
                                        }
                                    }
                                    height={400}
                                    width={600}
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true,
                                                },
                                            },],
                                        },
                                    }}
                                />
                                <p>Number Of Events</p>
                            </div>
                        </div>
                        <div className="chart card">
                            <div className="chart1">
                                {/* <PieChart /> */}
                                <Pie 
                                    data={{
                                        labels: yearList,
                                        datasets: [
                                            {
                                            label: 'No of Student',
                                            data: stdCount,
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.5)',
                                                'rgba(54, 162, 235, 0.5)',
                                                'rgba(255, 206, 86, 0.5)',
                                                'rgba(75, 192, 192, 0.5)',
                                                'rgba(153, 102, 255, 0.5)',
                                                'rgba(255, 159, 64, 0.5)',
                                                'rgba(23, 165, 137, 0.5)',
                                                'rgba(40, 55, 71, 0.5)',
                                                'rgba(146, 43, 33, 0.5)',
                                                'rgba(255, 99, 132, 0.5)',
                                                'rgba(54, 162, 235, 0.5)',
                                                'rgba(255, 206, 86, 0.5)',
                                                'rgba(75, 192, 192, 0.5)',
                                                'rgba(153, 102, 255, 0.5)',
                                                'rgba(255, 159, 64, 0.5)',
                                                'rgba(23, 165, 137, 0.5)',
                                                'rgba(40, 55, 71, 0.5)',
                                                'rgba(146, 43, 33, 0.5)'
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)',
                                                'rgba(23, 165, 137, 1)',
                                                'rgba(40, 55, 71, 1)',
                                                'rgba(146, 43, 33, 1)',
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)',
                                                'rgba(23, 165, 137, 1)',
                                                'rgba(40, 55, 71, 1)',
                                                'rgba(146, 43, 33, 1)'
                                            ],
                                            borderWidth: 1,
                                            },
                                        ],
                                        }
                                    }
                                    height={400}
                                    width={600}
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true,
                                                },
                                            },],
                                        },
                                    }}
                                />
                                <p>Number Of Students</p>
                            </div>
                        </div>
                    </div>
                    <div className="mainContainer">
                        <div className="chart card">
                            <div className="chart1">
                                {/* <LineChart /> */}
                                <Line 
                                    data={{
                                        labels: [ "Webinar", "Seminar", "Confrence", "Technical", "Nontechnical", "Cultural", "FTP", "HTTP"],
                                        datasets: [
                                            {
                                            label: 'No Of Event Type',
                                            data: evntTypeCount,
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.5)',
                                                'rgba(54, 162, 235, 0.5)',
                                                'rgba(255, 206, 86, 0.5)',
                                                'rgba(75, 192, 192, 0.5)',
                                                'rgba(153, 102, 255, 0.5)',
                                                'rgba(54, 162, 235, 0.5)',
                                                'rgba(255, 206, 86, 0.5)',
                                                'rgba(75, 192, 192, 0.5)',
                                                'rgba(153, 102, 255, 0.5)'
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)'
                                            ],
                                            borderWidth: 1,
                                            },
                                        ],
                                        }
                                    }
                                    height={400}
                                    width={600}
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true,
                                                },
                                            },],
                                        },
                                    }}
                                />
                                <p>No Of Event Type</p>
                            </div>
                        </div>
                        <div className="chart card">
                            <div className="chart1">
                                {/* <RadarChart 
                                    from = { from }
                                    to = { to }
                                /> */}
                                <Radar 
                                    data={{
                                        labels: ["CSPIT", "DEPSTAR", "PDPIAS", "RPCP", "CMPICA", "I2IM", "ARIP", "CIPS", "MTIN"],
                                        datasets: [
                                            {
                                            label: 'Events In Institutes',
                                            hoverBackgroundColor: 'white',
                                            pointHoverBorderWidth: '5',
                                            data: [count.cspitCount,
                                                    count.depstarCount,
                                                    count.pdpiasCount,
                                                    count.rpcpCount,
                                                    count.cmpicaCount,
                                                    count.i2imCount,
                                                    count.aripCount,
                                                    count.cipsCount,
                                                    count.mtinCount
                                                ],
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.5)',
                                                'rgba(54, 162, 235, 0.5)',
                                                'rgba(255, 206, 86, 0.5)',
                                                'rgba(75, 192, 192, 0.5)',
                                                'rgba(153, 102, 255, 0.5)',
                                                'rgba(255, 159, 64, 0.5)',
                                                'rgba(23, 165, 137, 0.5)',
                                                'rgba(40, 55, 71, 0.5)',
                                                'rgba(146, 43, 33, 0.5)'
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)',
                                                'rgba(23, 165, 137, 1)',
                                                'rgba(40, 55, 71, 1)',
                                                'rgba(146, 43, 33, 1)'
                                            ],
                                            borderWidth: 1,
                                            },
                                        ],
                                        }
                                    }
                                    height={400}
                                    width={600}
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true,
                                                },
                                            },],
                                        },
                                    }}
                                />
                                <p>Events In Institutes</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div style={{paddingBottom: "2%"}} className='card tableDiv'>
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