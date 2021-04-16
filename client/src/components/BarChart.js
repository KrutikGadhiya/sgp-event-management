import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react'
import axios from 'axios'

let yearList = [2016, 2017, 2018, 2019, 2020, 2021]

const years = (from, to) => {
    yearList = []
    for(let i = from; i <= to; i++){
        yearList.push(i)
    }
}

const BarChart = (props) => {
    const [yearCount, setYearCount] = useState([12, 10, 2, 3, 5, 15])
    const { from, to } = props
    // console.log(from.slice(0, 4), to.slice(0, 4))
    years(parseInt(from.slice(0, 4)), parseInt(to.slice(0, 4)))
    // console.log(yearList)

    useEffect(() => {
        axios.post('/getYearCount', {
            yearList
        }).then((countRes) => {
            console.log(countRes)
            setYearCount(countRes.data)
            //console.log(count)
        })
    }, [])

    return (
        <div>
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
        </div>
    )
}

export default BarChart;