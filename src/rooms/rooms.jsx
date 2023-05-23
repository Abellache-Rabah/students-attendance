import React from 'react'
import Nav from '../nav/nav';
import { Navigate, Route, Routes} from 'react-router-dom';
import Room from './room';
import RoomPrev from './roomPrev';
import AllRooms from './allRooms';
export default function Rooms() {
    return (
        <div className='col-start-2 col-end-6 gap-y-2 overflow-y-auto pb-10 flex flex-col items-center'>
            <Nav />
            <Routes>
                <Route path='/*' element={<AllRooms/>} />
                <Route path='seassion/*' element={<Room />} />
                <Route path='prevRoom/*' element={<RoomPrev />} />
                <Route path='*' element={<Navigate to={"/"} />} />
            </Routes>
        </div>
    )
}