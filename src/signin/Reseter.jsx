import React from 'react'
import { Link } from 'react-router-dom'

export default function Reseter() {
  return (
    <div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input
                                    type={"number"}

                                    name="code"
                                    id="code"
                                    className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 {state.invalidinpute} appearance-none focus:outline-none focus:ring-0 peer`}
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="code"
                                    className={`{state.invalidelabel} peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                    4-digit code 
                                </label>
                            </div>
                            <div>
                                <Link to={"../newpass"} className="w-full mt-6 mb-3 bg-xr8 bg-opacity-95 p-2 rounded-md h-10  hover:bg-xr12 text-white font-serif">validate code </Link>
                            </div>
    </div>
  )
}
