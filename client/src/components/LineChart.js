import {  Line } from 'react-chartjs-2';

const LineChart = () => {
    return (
        <div>
            <Line 
                data={{
                    labels: ["Webinar", "Confrence", "Seminar", "FTP", "HTTP"],
                    datasets: [
                        {
                          label: 'No Of Event Type',
                          data: [12, 19, 3, 5, 2, 3],
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
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

export default LineChart;