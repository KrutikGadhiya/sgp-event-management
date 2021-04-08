import {  Radar } from 'react-chartjs-2';

const RadarChart = () => {
    return (
        <div>
            <Radar 
                data={{
                    labels: ["CSPIT", "DEPSTAR", "PDPIAS", "RPCP", "CMPICA", "I2IM"],
                    datasets: [
                        {
                          label: 'Events In Institutes',
                          data: [6, 10, 2, 13, 5, 15],
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
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