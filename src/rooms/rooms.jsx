import React, { memo, useEffect, useState } from 'react'
import { Table, Checkbox, Pagination } from 'flowbite-react'
import Nav from '../nav/nav';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, setRooms } from '../redux/roomsReducer';
import RoomParam from './roomParam';
import { toast } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';
import Room from './room';
export default memo(function Rooms() {
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.rooms)
    const [currentPage, setCurrentPage] = useState(1);
    const store = useSelector(state => state.account)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(5)
    const [length, setLenght] = useState(0)
    useEffect(() => {
        if (rooms.rooms.length == 0) {
            dispatch(fetchRooms(store))
        }
    }, [])
    useEffect(() => {
        const wait = toast.loading("Please wait...")
        setLenght(rooms.rooms.length)
    })
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
            dispatch(setRooms({ id: id }))
            toast.update(wait, { render: "Room deleted", type: "success", isLoading: false, autoClose: true, delay: 2000 })
            
        }).catch(err => {
            console.log(err);
            toast.update(wait, { render: "Error", type: "error", isLoading: false, autoClose: true, delay: 2000 })
           
        })
    }
    return (
        <div className='col-start-2 col-end-6 overflow-y-scroll gap-y-2git remote add origin https://github.com/GHanamaAhmed/students-attendance-web-site.git flex flex-col items-center'>
            <Nav />
            <Routes>
                <Route path='*' element={
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
                                            {rooms?.rooms && rooms.rooms.map((room, index) => {
                                                if (index >= min && index < max) {
                                                    return (
                                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="w-4 p-4">
                                                                <div className="flex items-center">
                                                                    <input
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
                                                setMin((page - 1) * 5)
                                                setMax(page * 5)
                                                setCurrentPage(page)
                                            }}
                                            showIcons={true}
                                            totalPages={Math.ceil(length / 5)}
                                        />
                                        <button className='text-red-600 py-2 px-4 rounded-lg'>Delete</button>
                                    </nav>

                                </div>
                            </div>

                        </div></>
                } />
                <Route path='seassion/*' element={<Room/>} />
                <Route path='*' element={<Navigate to={"/"}/>} />
            </Routes>
        </div>
    )
}
)