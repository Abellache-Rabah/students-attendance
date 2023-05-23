import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { useSelector } from 'react-redux';
const MyCharts = () => {
    const seassions = useSelector(state => state.seassions)
    const [statistic, setStatistic] = useState([])
    const rooms = useSelector(state => state.rooms)
    useEffect(() => {
        const data = []
        if (seassions.seassions) {
            seassions.seassions.forEach(seassion => {
                data.push(seassion.attendence.length)
            })
            setStatistic(data)
        }
    }, [rooms.rooms, seassions.seassions]);
    return (
        <div className='w-5/6'>
            <Chart
                options={{
                    chart: { id: 'bar-chart' },
                    xaxis: {
                        type: 'category',
                        labels: {
                            formatter: function (val) {
                                return val
                            },
                        },

                    },
                    title: {
                        text: 'Stastistics',
                    },
                }}
                series={[{ name: 'attendence', data: statistic }]}
                type="bar"

                height={300}
            />
        </div>
    )
}

export default MyCharts;