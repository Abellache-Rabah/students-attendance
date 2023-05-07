import { useEffect, useState } from "react";
import Navbar from "./navbar/navbar";
import Header from "./header/header";
import ListHeader from "./components/listHeader";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard/dashboard";
import Rooms from "./rooms/rooms";
import CreateRoom from "./createRoom/createRoom";
import Sign from "./signin/sign";
import { fetchRooms, setRooms } from './redux/roomsReducer';
import { useDispatch, useSelector } from "react-redux";
import { fetchSeassions } from './redux/seassion';
function App() {
  const account = useSelector(state => state.account)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const rooms = useSelector(state => state.rooms)
  const store = useSelector(state => state.account)
  const seassions = useSelector(state => state.seassions)
  useEffect(() => {
  
      dispatch(fetchRooms(store))
  }, [account])
  useEffect(() => {

      dispatch(fetchSeassions({email:"ghanamaahmed@gmail.com",password:"12345678"}))
  }, [rooms])
  return (
    <>
      <Routes>
        <Route exact path="/sign/*" element={<Sign />} />
        <Route
          exact
          path="/*"
          element={
            <>
              <Header />
              <div className="md:grid md:grid-cols-4 h-full md:grid-rows-1 md:h-full">
                <ListHeader
                  className={"hidden md:block w-fit col-start-1 h-full col-end-2"}
                />
                <Routes>
                  <Route exact path="/Dashboard/*" element={<Dashboard />} />
                  <Route exact path="/Rooms/*" element={<Rooms />} />
                  <Route exact path="/CreateRoom/*" element={<CreateRoom />} />

                </Routes>
              </div>
            </>
          }
        />
        <Route path="*" element={<Navigate to="/sign/in" />} />
      </Routes>

    </>
  );
}
export default App;
