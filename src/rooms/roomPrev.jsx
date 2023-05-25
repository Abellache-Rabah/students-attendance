import axios from 'axios'
import React, { memo, useCallback, useEffect, useLayoutEffect, useState, useTransition } from 'react'
import { useLocation } from "react-router-dom"
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSeassions } from '../redux/seassion';
import Qrdiv from './qrdiv';
import ToggleRoom from './toggleRoom';
import Printer from './printer';
import { v4 as uuid } from 'uuid';
import { Dropdown } from 'flowbite-react';
export default memo(function RoomPrev() {
    const dispatch = useDispatch()
    const [studentList, setstudentList] = useState([])
    const [studentListRemove, setstudentListRemove] = useState([])
    const [showQr, setShowQr] = useState(false)
    const store = useSelector(state => state.account)
    const [isVisit, setIsVisit] = useState(false)
    const location = useLocation()
    const [clear, setClear] = useState(true)
    const [isStop, setIsStop] = useState(true)
    const [qrCode, setQrCode] = useState()
    const [typeShearch, setTypeShearch] = useState('Name')
    const [shearch, setShearchInp] = useState("")
    const [filter, setFilter] = useState([])
    const [isLoading, transition] = useTransition()
    const handle = (e) => {
        e.preventDefault()
        setShearchInp(e.target.value)
    }
    useLayoutEffect(() => {
        setFilter(studentList.filter((e) => (!shearch || (typeShearch == "Name" && !`${e?.lastname} ${e?.firstname}`.toLowerCase().indexOf(shearch.toLowerCase())) || (typeShearch == "Name" && !`${e?.firstname} ${e?.lastname}`.toLowerCase().indexOf(shearch.toLowerCase())) || (typeShearch == "Sex" && !`${e?.sex}`.toLowerCase().indexOf(shearch.toLowerCase())) || (typeShearch == "Specialst" && !`${e?.specialist}`.toLowerCase().indexOf(shearch.toLowerCase())))))
    }, [studentList, shearch, typeShearch,showQr]);
    const fetchSession = async () => {
        await axios.get(`https://simpleapi-p29y.onrender.com/student/session/${location.state.room["_id"]}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.res) {
                setstudentList(() => res.data.data)
            } else {
                console.log(res.data?.mes);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchSession()
    }, [])
    const refresher = async () => {
        const req = {
            email: store.email,
            password: store.password,
            idRoom: location.state.room['_id'],
            qrcode: store.email + uuid()
        }
        await axios.post(`https://simpleapi-p29y.onrender.com/teacher/refrQrcode`, req, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            res.data.res && setQrCode(req.qrcode)
            !res.data.res && console.error(res.data.mes);
        }).catch(err => { console.error(err) })
    }
    useEffect(() => {
        var intervl = setInterval(() => {
            refresher()
        }, 5000);
        return () => clearInterval(intervl)
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
            socket.emit("join-room", {
                idRoom: location.state.room["_id"],
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
            idroom: location.state.room["_id"]
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
            idroom: location.state.room["_id"]
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
    const toggle = useCallback(() => {
        setShowQr(prev => !prev)
    }, [setShowQr])
    const toggler = (e) => {
        if (!isStop) {
            stopRoom()
        } else {
            startRoom()
        }
    }
    useEffect(() => {
        return () => {
            dispatch(fetchSeassions(store))
            stopRoom()
        }
    }, [])
    const removeStudent = async (idstudent) => {
        const req = {
            email: store.email,
            password: store.password,
            idroom: location.state.room["_id"],
            idstudent: idstudent
        }
        await axios.delete("https://simpleapi-p29y.onrender.com/teacher/removeStudent", {
            data: req,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(async res => {
            if (res.data.res) {
                setstudentList((prev) => prev.filter((item) => item.idStudent != idstudent))
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const removeStudents = async () => {
        const req = {
            email: store.email,
            password: store.password,
            idroom: location.state.room["_id"],
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
            }
        }).catch(err => {
            console.log(err);
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
                <Qrdiv qrCode={qrCode || location.state.room.qrCode} code={location.state.room.code} onTogle={toggle} />
            </div>
            <button className='w-full py-2 px-4 text-white bg-cyan-800 rounded-lg' onClick={toggle}>Code</button>
            <div className='flex flex-col md:flex-row  md:items-center md:w-full gap-2'>
                <p className='py-2 px-2 rounded-lg w-full text-center bg-green-300 cursor-default'>Model : {location.state.room.module} </p>
                <p className='py-2 px-2 rounded-lg w-full text-center bg-green-300 cursor-default'>Specialist : {location.state.room.specialist} </p>
                <p className='py-2 px-2 rounded-lg w-full text-center bg-green-300 cursor-default'>Level : {location.state.room.schoolYear} </p>
                <p className='py-2 px-2 rounded-lg w-full text-center bg-green-300 cursor-default'>presents : {studentList?.length} </p>
            </div>
            <div className='flex gap-2'>
                <div className='flex items-center justify-between py-0 bg-white rounded-lg ps-5'>
                    <Dropdown label={typeShearch} inline={true}>
                        <Dropdown.Item onClick={() => setTypeShearch("Name")}>
                            Name
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setTypeShearch("Sex")}>
                            Sex
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setTypeShearch("Specialst")}>
                            Specialst
                        </Dropdown.Item>
                    </Dropdown>
                    <input type="text" placeholder='shearch' onChange={handle} className='w-1/2 border-none placeholder:opacity-50 bg-transparent focus:ring-0 py-2' />
                </div>
            </div>
            <table id='wow' className="w-full rounded-3xl shadow-sm overflow-hidden text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='h-fit'>
                        <th scope="col" className="p-3">

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
                    {!isLoading && clear && filter.length > 0 && filter.map((room, index) => {
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
                                    {index + 1} - {room?.firstname}
                                </th>
                                <td className="px-1 md:px-6 h-fit  py-4">{room?.lastname}</td>
                                <td className="px-1 md:px-6 h-fit  py-4 hidden md:block">{room?.sex}</td>
                                <td className="px-1 md:px-6 h-fit  py-4">{room?.specialist}</td>
                                <td onClick={() => { removeStudent(room?.idStudent) }} className="px-1 md:px-6 h-fit cursor-pointer py-4 hidden md:block">
                                    Remove
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <div className='w-full flex justify-between'>
                <span onClick={toggler}  >
                    <ToggleRoom isStop={isStop} />
                </span>
                <div className='flex gap-5 items-center'>
                    <Printer apiData={filter.map(e => ({ first_name: e.firstname, last_name: e.lastname, email: e.email, specialist: e.specialist, sex: e.sex }))} />
                    <button onClick={removeStudents} className='text-red-600 py-2 px-4 rounded-lg'>Delete</button>
                </div>
            </div>
        </div>
    )
}
)