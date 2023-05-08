import axios from 'axios'
import React, { memo, useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { toast } from 'react-toastify'
import { io } from 'socket.io-client';
import { useSelector,useDispatch } from 'react-redux';
import {fetchSeassions } from '../redux/seassion';
import Qrdiv from './qrdiv';
import ToggleRoom from './toggleRoom';
export default memo(function Room() {
    const dispatch = useDispatch()
    const [studentList, setstudentList] = useState([])
    const [showQr, setShowQr] = useState(false)
    const store = useSelector(state => state.account)
    const [studentListRemove, setstudentListRemove] = useState([])
    const [isVisit, setIsVisit] = useState(false)
    const [isStop, setIsStop] = useState(true)
    const location = useLocation()
    const fetchSession = async () => {
        await axios.get(`https://simpleapi-p29y.onrender.com/student/session/${location.state['_id']}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.res) {
                setstudentList(() => res.data.data)
            } else {
                toast.error(res.data.mes, { closeButton: true })
            }
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchSession()
    }, [])
    useLayoutEffect(() => {
        if (!isVisit) {
            setIsVisit(() => true)
            const socket = io("https://simpleapi-p29y.onrender.com/rooms", {
                transports: ['websocket'],
                autoConnect: false,
                auth: {
                    email: store.email,
                    password: store.password
                }
            });
            socket.connect()
            socket.on("connect", () => {
                console.log("connect");
            })
            socket.emit("join-room", {
                idRoom: location.state["_id"],
                email: store.email
            });
            socket.on("join", (res) => {
                setstudentList((prev) => {
                    prev.push(res)
                    return prev
                })

            })
        }

    }, [])
    const stopRoom = async () => {
        const req = {
            email: store.email,
            password: store.password,
            idroom: location.state["_id"]
        }
        await axios.post("https://simpleapi-p29y.onrender.com/teacher/stoproom", req, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            setIsStop(() => true)
        }).catch(err => {
            console.log(err);
        }
        )
    }
    const startRoom = async () => {
        const req = {
            email: store.email,
            password: store.password,
            idroom: location.state["_id"]
        }
        await axios.post("https://simpleapi-p29y.onrender.com/teacher/startroom", req, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            setIsStop(() => false)
        }).catch(err => {
            console.log(err);
        }
        )
    }
    const toggle = () => {
        setShowQr(prev => !prev)
    }
    const toggler = (e) => {
        if (!isStop) {
            stopRoom()
        } else {
            startRoom()
        }
    }
    //will unmout
    useEffect(() => {
        startRoom()
        return () => {
            dispatch(fetchSeassions(store))
            stopRoom()
        }
    }, [])
    const removeStudent = async (idstudent) => {
        console.log(idstudent);
        const wait = toast.loading("Please wait...")
        const req = {
            email: store.email,
            password: store.password,
            idroom: location.state["_id"],
            idstudent: idstudent
        }
        await axios.delete("https://simpleapi-p29y.onrender.com/teacher/removeStudent", {
            data: req,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.res) {

                setstudentList((prev) => prev.filter((item) => item["_id"] !== idstudent))
                toast.update(wait, { render: "Room deleted", type: "success", isLoading: false, autoClose: true, delay: 2000 })
                console.log("deleted");
            } else {
                console.log(res.data.mes);
            }

        }).catch(err => {
            console.log(err);
            toast.update(wait, { render: "Error", type: "error", isLoading: false, autoClose: true, delay: 2000 })

        })

    }
    const removeStudents = async () => {
        const req = {
            email: store.email,
            password: store.password,
            idroom: location.state["_id"],
            idstudent: studentListRemove
        }
        await axios.delete("https://simpleapi-p29y.onrender.com/teacher/removeStudents", {
            data: req,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(async res => {
            if (res.data.res) {
                setstudentList((prev) => prev.filter(e => !studentListRemove.includes(e["idStudent"])))
                setClear(false)
                await new Promise(resolve => setTimeout(resolve, 1))
                setstudentListRemove([])
                setClear(true)
                console.log("deleted");
            }
        }).catch(err => {
            console.log(err)
        })
    }
    const selectStudents = (e, id) => {
        if (e.target.checked) {
            setstudentListRemove(prev => {
                prev.push(id)
                return prev
            })
        } else {
            setstudentListRemove(prev => prev.filter(element => element != id))
        }
    }


    return (
        <div className='w-full h-full flex items-center flex-col gap-2  px-2'>
            <div className={`absolute top-0 right-1/2 w-full h-full translate-x-1/2 z-50 ${showQr ? "" : "hidden"}`}>
                <Qrdiv qrCode={location.state.qrCode} code={location.state.code} onTogle={toggle} />
            </div>
            <button className='w-full py-2 px-4 text-white bg-cyan-800 rounded-lg' onClick={toggle}>Code</button>
            <div className='flex flex-col md:flex-row  md:items-center md:w-full gap-2'>
                <p className='py-2 px-4 rounded-lg w-full text-center bg-green-300'>Model : {location.state.module} </p>
                <p className='py-2 px-4 rounded-lg w-full text-center bg-green-300'>Specialist : {location.state.specialist} </p>
                <p className='py-2 px-4 rounded-lg w-full text-center bg-green-300'>Level : {location.state.schoolYear} </p>
            </div>
            <table className="w-full rounded-3xl shadow-sm overflow-hidden text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='h-fit'>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        <th scope="col" className="px-1 md:px-6  py-3">
                            First name
                        </th>
                        <th scope="col" className="px-1 md:px-6  py-3 hidden md:block">
                            Last name
                        </th>
                        <th scope="col" className="px-1 md:px-6  py-3">
                            sex
                        </th>
                        <th scope="col" className="px-1 md:px-6  py-3">
                            specialist
                        </th>
                        <th scope="col" className="px-1 md:px-6  py-3 hidden md:block">
                            Remove
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {studentList.map((room, index) => {
                        return (
                            <tr key={index} className="bg-white border-b h-fit  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4 h-fit">
                                    <div className="flex items-center">
                                        <input
                                            onClick={(e) => { selectStudents(e, room["idStudent"]) }}
                                            id="checkbox-table-search-1"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <th
                                    scope="row"
                                    className="px-1 md:px-6 h-fit  py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {room.firstname}
                                </th>
                                <td className="px-1 md:px-6 h-fit  py-4">{room.lastname}</td>
                                <td className="px-1 md:px-6 h-fit  py-4 hidden md:block">{room.sex}</td>
                                <td className="px-1 md:px-6 h-fit  py-4">{room.specialist}</td>
                                <td onClick={() => { removeStudent(room?.idStudent) }} className="px-1 md:px-6 h-fit cursor-pointer py-4 hidden md:block">
                                    Remove
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <div className='w-full flex justify-between'>
                <span onClick={toggler}>
                    <ToggleRoom isStop={isStop}  />
                </span>
                <button onClick={removeStudents} className='text-red-600 py-2 px-4 rounded-lg'>Delete</button>
            </div>
        </div>
    )
}
)