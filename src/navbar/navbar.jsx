import React from 'react'
import { Avatar, Dropdown } from 'flowbite-react'
import {useSelector} from "react-redux"
export default function Navbar() {
    const account =useSelector((state)=>state.account)
    return (
        <div className='flex justify-around py-2 w-full'>
            
            <div className='flex gap-2'>
            <Dropdown inline={true} label={<Avatar img={""} rounded={true}/>} placement='auto'>
                <Dropdown.Header>
                    <span className="block text-sm">
                        {account.lastName} {account.firstName}
                    </span>
                    <span className="block truncate text-sm font-medium">
                        bonnie@flowbite.com
                    </span>
                </Dropdown.Header>
                <Dropdown.Item>
                    Logout
                </Dropdown.Item>
            </Dropdown>
            <img src="./img/Line.svg" alt="" />
            </div>
        </div>
    )
}
