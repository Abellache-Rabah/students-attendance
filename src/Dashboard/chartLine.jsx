import React, { useEffect, useLayoutEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { useSelector } from 'react-redux';
const MyCharts = () => {
    const seassions = useSelector(state => state.seassions)
    const [statistic, setStatistic] = useState([])
    const rooms = useSelector(state => state.rooms)
    const [date,setDate]=useState([])
    const [currentDate,setCurrentDate]=useState(0)
    useLayoutEffect(() => {
        const data = []
        if (seassions.seassions) {
            seassions.seassions.forEach(seassion => {
                data.push(seassion.attendence.length)
            })
            setStatistic(data)
        }
        rooms?.rooms&&setDate(()=>rooms.rooms.map(e=>e.createAt.split("T")[0]))
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
                                let d=currentDate
                                setCurrentDate((prev)=>prev++)
                                return date[d]
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