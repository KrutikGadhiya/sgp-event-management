import {  Radar } from 'react-chartjs-2';
import axios from 'axios'
import { useState, useEffect } from 'react';

const RadarChart = () => {
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
    useEffect(() => {
        axios.post('/getcount', {
        }).then((countRes) => {
            //console.log(countRes)
            setCount(countRes.data)
            //console.log(count)
        })
    }, [])
    return (
        <div>
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
        </div>
    )
}

export default RadarChart;