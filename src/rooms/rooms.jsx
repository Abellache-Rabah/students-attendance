import React, { memo, useEffect, useState } from 'react'
import { Table, Checkbox, Pagination } from 'flowbite-react'
import Nav from '../nav/nav';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {  setRooms } from '../redux/roomsReducer';
import RoomParam from './roomParam';

import { Navigate, Route, Routes,useNavigate} from 'react-router-dom';
import Room from './room';
import RoomPrev from './roomPrev';
export default memo(function Rooms() {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.rooms)
    const [currentPage, setCurrentPage] = useState(1);
    const store = useSelector(state => state.account)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(5)
    const [clear,setClear]=useState(true)
    const [selectForDelete, setSelectForDelete] = useState([])
    const removeRoom = async (id) => {
        const req = {
            email: store.email,
            password: store.password,
            idroom: id
        }
        await axios.delete("https://simpleapi-p29y.onrender.com/teacher/deletroom", {
            data: req,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            dispatch(setRooms({ id: [id] }))
   
        }).catch(err => {
            console.log(err);
        })
    }
    const removeRooms = async (e) => {

        e.preventDefault()
        if (selectForDelete.length > 0) {
            console.log(selectForDelete.length);
            const req = {
                email: store.email,
                password: store.password,
                idroom: selectForDelete
            }
            await axios.delete("https://simpleapi-p29y.onrender.com/teacher/deletrooms", {
                data: req,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(async res => {
                if (res.data.res) {
                    dispatch(setRooms({ id: selectForDelete }))
                    setSelectForDelete(()=>[])
                    setClear(false)
                    await new Promise((resolve)=>setTimeout(resolve,1))
                    setClear(true)
                }

            }).catch(err => {
                console.log(err);
            })
        }
    }
    const selectRoom = (e, id) => {
        console.log(e.target.checked);
        if (e.target.checked) {
            setSelectForDelete(prev => {
                prev.push(id)
                return prev
            })
        } else {
            setSelectForDelete(prev => prev.filter(element => element != id))
        }
    }
    const fetchSession = async (id) => {
        await axios.get(`https://simpleapi-p29y.onrender.com/student/session/${id}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.res) {
                navigate("/rooms/prevRoom", { state: res.data, replace: true })
            } 
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className='col-start-2 col-end-6 overflow-y-scroll gap-y-2git remote add origin https://github.com/GHanamaAhmed/students-attendance-web-site.git flex flex-col items-center'>
            <Nav />
            <Routes>
                <Route path='/*' element={
                    <>
                        <RoomParam />
                        <div className='w-full h-full flex justify-center items-center'>
                            <div className='w-full flex items-center flex-col ' >
                                <div className="w-11/12  bg-transparent shadow-none relative overflow-x-auto   sm:rounded-lg">
                                    <table className="w-full h-full rounded-3xl shadow-sm overflow-hidden text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="p-4">
                                                    <div className="flex items-center">
                                                        <label htmlFor="checkbox-all-search" className="sr-only">
                                                            checkbox
                                                        </label>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-1 md:px-6  py-3">
                                                    Module name
                                                </th>
                                                <th scope="col" className="px-1 md:px-6  py-3 hidden md:block">
                                                    code
                                                </th>
                                                <th scope="col" className="px-1 md:px-6  py-3">
                                                    Type
                                                </th>
                                                <th scope="col" className="px-1 md:px-6  py-3">
                                                    Ceate At
                                                </th>
                                                <th scope="col" className="px-1 md:px-6  py-3 hidden md:block">
                                                    Remove
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clear&&rooms?.rooms && rooms.rooms.map((room, index) => {
                                                if (index >= min && index < max) {
                                                    return (
                                                        <tr key={index} onDoubleClick={()=>{fetchSession(room["_id"])}} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="w-4 p-4">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        onChange={(e) => { selectRoom(e, room["_id"]) }}
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
                                                                className="px-1 md:px-6  py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                            >
                                                                {room.module}
                                                            </th>
                                                            <td className="px-1 md:px-6  py-4">{room?.code ? room.code : "Empty"}</td>
                                                            <td className="px-1 md:px-6  py-4 hidden md:block">{room.type}</td>
                                                            <td className="px-1 md:px-6  py-4">{new Date(room.createAt).toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })}</td>
                                                            <td className="px-1 md:px-6 cursor-pointer py-4 hidden md:block" onClick={() => removeRoom(room["_id"])}>
                                                                Remove
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                    <nav
                                        className="flex items-center justify-between p-4"
                                        aria-label="Table navigation"
                                    >
                                        <Pagination
                                            currentPage={currentPage}
                                            layout="table"
                                            onPageChange={(page) => {
                                                setSelectForDelete(()=>[])
                                                setMin(page-1)
                                                setMax(page + 5)
                                                setCurrentPage(page)
                                            }}
                                            showIcons={true}
                                            totalPages={Math.ceil(rooms.rooms.length / 5)}
                                        />
                                        <button onClick={removeRooms} className='text-red-600 py-2 px-4 rounded-lg'>Delete</button>
                                    </nav>

                                </div>
                            </div>

                        </div></>
                } />
                <Route path='seassion/*' element={<Room />} />
                <Route path='prevRoom/*' element={<RoomPrev />} />
                <Route path='*' element={<Navigate to={"/"} />} />
            </Routes>
        </div>
    )
}
)