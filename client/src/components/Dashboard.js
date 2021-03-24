import './css/Dashboard.css';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';
import RadarChart from './RadarChart';

function Dashboard(){
    return(
        <div>
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