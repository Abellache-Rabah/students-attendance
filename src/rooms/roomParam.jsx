import React, { useRef } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid'
import{addRoom} from "../redux/roomsReducer"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function RoomParam() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const account = useSelector(state => state.account)
    const [sp, setSp] = useState([])
    const specialist = useRef()
    const schoolYear = useRef()
    const moudle = useRef()
    const type = useRef()
    const fetchspecialist = async () => {

        await axios.get("https://simpleapi-p29y.onrender.com/specialist", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            setSp((e) => res.data)
        }).catch(err => {
            console.log(err);
        })

    }
    const createQrcode = async (e) => {
        e.preventDefault()
        const req = {
            email: account.email,
            password: account.password,
            qrcode: uuid(),
            code:Math.floor(1000000 + Math.random() * 9000000)
          }
          if (specialist.current.value != "specialst") {
            req.specialist = specialist.current.value;
          }
          if (schoolYear.current.value != "School year") {
            req.schoolYear = schoolYear.current.value;
          }
          if (moudle.current.value != "") {
            req.module = moudle.current.value;
          }
          if (type.current.value != "Type") {
            req.type = type.current.value;
          }
        await axios.post("https://simpleapi-p29y.onrender.com/teacher/createroom", req, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            dispatch(addRoom(res.data.data))
            navigate("seassion", { state: res.data.data })
        }).catch(err => {
            console.log(err);
        }
        )
    }
    useEffect(() => {
        fetchspecialist()
    }, [])
    return (
        <div className='flex flex-col items-center px-3 pt-4 bg-white w-11/12 mt-2 mb-10 rounded-3xl'>
            <p className='text-3xl font-bold mb-5'>Create a New Room</p>
            <div className='w-full flex flex-col md:flex-row justify-around items-center gap-2'>
                <div className='rounded-full w-5/6 bg-secondary'>
                    <input type="text" ref={moudle} className='border-none text-center focus:ring-0 bg-transparent py-3 placeholder:text-center placeholder:text-xl' placeholder='Moudile' />
                </div>
                <div className='rounded-full w-5/6 bg-secondary'>
                    <select name="speaciality" defaultValue={""} ref={specialist} id="speaciality" className='border-none text-center focus:ring-0 bg-transparent py-3 placeholder:text-center placeholder:text-xl'>
                        <option value={""} disabled>specialst</option>
                        {sp && sp.map((e, i) => {
                            return (<option key={i} value={e.specialist}>{e.specialist}</option>)
                        })}
                    </select>
                </div>
                <div className='relative w-5/6 rounded-full bg-secondary'>
                    <select name="level" ref={schoolYear} defaultValue={""} id="level" className='border-none text-center w-full focus:ring-0 bg-transparent py-3 placeholder:text-center placeholder:text-xl'>
                        <option value={""} disabled>School year</option>
                        <option value="First licence">First licence</option>
                        <option value="Seconde licence">Seconde licence</option>
                        <option value="Third licence">Third licence</option>
                        <option value="First master">First master</option>
                        <option value="Seconde master">Seconde master</option>
                    </select>
                </div>
                <div className='relative w-5/6 rounded-full bg-secondary'>
                    <select name="level" defaultValue={""} ref={type} id="level" className='border-none text-center w-full focus:ring-0 bg-transparent py-3 placeholder:text-center placeholder:text-xl'>
                        <option value={""} disabled>Type</option>
                        <option value="Cour">Cour</option>
                        <option value="Td">Td</option>
                        <option value="Tp">TP</option>
                    </select>
                </div>
            </div>
            <div className='w-full mb-4 md:mb-0 flex flex-col md:flex-row justify-between items-center '>
                <button onClick={createQrcode} className='bg-orange-400 text-white  px-4 rounded-lg mb-2  py-3  mt-5 w-full'>Create with qrcode</button>
            </div>
        </div>
    )
}
