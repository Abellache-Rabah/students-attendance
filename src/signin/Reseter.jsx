import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'
export default function Reseter() {
    const location = useLocation()
    const navigate = useNavigate()
    const code = useRef()
    const [time, setTime] = useState(0)
    const sendCode = () => {
        const wait = toast.loading("Wait few minut")
        if (code.current.value != "") {
            axios.post("https://simpleapi-p29y.onrender.com/teacher/forgetpassword", { email: location.state.email, code: code.current.value }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
                .then(async res => {
                    if (res.data.res) {
                        toast.update(wait, { render: "Code successfuly", type: "success", isLoading: false, autoClose: 1000 });
                        await new Promise((resolve) => setTimeout(resolve, 1000))
                        navigate("../newpass", { state: { email: location.state.email, code: code.current.value } })
                    } else {
                        toast.update(wait, { render: res.data.mes, type: "error", isLoading: false, delay: 1000, autoClose: true });
                    }
                })
        } else {
            toast.update(wait, { render: "form is Empty!", type: "error", isLoading: false, delay: 1000, autoClose: true });
        }
    }
    const resend = () => {
        const wait = toast.loading("Wait few minut")
        let newTime = Date.now()
        if (newTime - time < 59000) {
            toast.update(wait, { render: `wait 60s stay ${new Date(newTime - time).getSeconds()}s`, type: "success", isLoading: false, autoClose: 1000 });
            return
        }
        axios.post("https://simpleapi-p29y.onrender.com/teacher/authResetPassword", { email: location.state.email }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
            .then(async res => {
                if (res.data.res) {
                    setTime(() => Date.now())
                    toast.update(wait, { render: "Code has been resended", type: "success", isLoading: false, autoClose: 1000 });
                } else {
                    toast.update(wait, { render: res.data.mes, type: "error", isLoading: false, delay: 1000, autoClose: true });
                }
            })
    }
    return (
        <div className='w-full'>
            <div className="relative z-0 mb-6 w-full group">
                <input
                    type={"text"}
                    ref={code}
                    name="code"
                    id="code"
                    className={`block py-2.5 pr-20 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 appearance-none focus:outline-none focus:ring-0 peer`}
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="code"
                    className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                    4-digit code
                </label>
            </div>
            <div>
                <div className='flex gap-3'>
                    <button onClick={resend} className="rounded-lg bg-sky-400 py-2 px-4 w-full flex justify-center items-center text-white">Resend</button>
                    <button onClick={sendCode} className="rounded-lg bg-sky-400 py-2 px-4 w-full flex justify-center items-center text-white">Send code</button>
                </div>
            </div>
        </div>
    )
}
