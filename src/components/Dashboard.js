import './css/Dashboard.css';
import { useState } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';
import RadarChart from './RadarChart';

function Dashboard(){
    const [propDate, setPropDate] = useState('');
    const [propDateTo, setPropDateTo] = useState('');

    return(
        <div>
            <div id="card">
                <div className='container'>
                    <div class="row">
                        <div class="col-25">
                            <label for="date"><b>Proposed Date From</b></label>
                        </div>
                        <div class="col-75">
                            <input required className="input" type="date" id="sdate" name="eventstartdate"
                                value={propDate} onChange={(e) => setPropDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label for="date"><b>To</b></label>
                        </div>
                        <div class="col-75">
                            <input required className="input" type="date" id="edate" name="eventenddate"
                                value={propDateTo} onChange={(e) => setPropDateTo(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="sub-btn">
                        <div class="row">
                            <input className="submit" type="submit" value="GO!" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mainContainer">
                <div id="card" className="chart">
                    <div className="chart1">
                        <BarChart />
                        <p>Number Of Events</p>
                    </div>
                </div>
                <div id="card" className="chart">
                    <div className="chart1">
                        <PieChart />
                        <p>Number Of Students</p>
                    </div>
                </div>
            </div>
            <div className="mainContainer">
                <div id="card" className="chart">
                    <div className="chart1">
                        <LineChart />
                        <p>No Of Event Type</p>
                    </div>
                </div>
                <div id="card" className="chart">
                    <div className="chart1">
                        <RadarChart />
                        <p>Events In Institutes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;