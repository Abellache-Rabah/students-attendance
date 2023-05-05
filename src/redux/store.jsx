import {configureStore} from "@reduxjs/toolkit"
import accountReducer from "./accountReducer"
import roomsReducer from "./roomsReducer"
import Rooms from "../rooms/rooms"
const store=configureStore(
    {
        reducer:{
            account:accountReducer,
            rooms:roomsReducer
        }
    }
)
export default store