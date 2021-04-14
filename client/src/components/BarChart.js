import { Bar } from 'react-chartjs-2';

let yearList = [2016, 2017, 2018, 2019, 2020, 2021]

const years = (from, to) => {
    yearList = []
    for(let i = from; i <= to; i++){
        yearList.push(i)
    }
}

const BarChart = (props) => {
    const { from, to } = props
    // console.log(from.slice(0, 4), to.slice(0, 4))
    years(parseInt(from.slice(0, 4)), parseInt(to.slice(0, 4)))
    console.log(yearList)
    return (
        <div>
            <Bar 
                data={{
                    labels: [2016, 2017, 2018, 2019, 2020, 2021],
                    datasets: [
                        {
                          label: 'No of Events',
                          data: [12, 10, 2, 3, 5, 15],
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

export default BarChart;