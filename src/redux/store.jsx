import {configureStore} from "@reduxjs/toolkit"
import accountReducer from "./accountReducer"
import roomsReducer from "./roomsReducer"
import studentsReducer from "./studentReducer"
import Rooms from "../rooms/rooms"
import seassionsReducer from "./seassion"
const store=configureStore(
    {
        reducer:{
            account:accountReducer,
            rooms:roomsReducer,
            seassions:seassionsReducer,
            students:studentsReducer
        }
    }
)
export default store