import React, { useEffect } from 'react'
import Nav from '../nav/nav'
import MyCharts from './chartLine'
import { Dropdown } from 'flowbite-react'
import { useSelector } from "react-redux"
export default function Dashboard() {
  const account = useSelector(state => state.account)
  const rooms = useSelector(state => state.rooms)
  const seassions = useSelector(state => state.seassions)
  const [models, setModels] = React.useState([])

  useEffect(() => {
    rooms.rooms.forEach(room => {
        if(!models.includes(room.module)) {
          setModels([...models, room.module])
        }
    })
  },[rooms.rooms, models]);
  useEffect(() => {
  }, []);
  return (
    <div className='col-start-2 col-end-5 overflow-y-scroll'>
      <div className='flex justify-center items-center gap-2 w-full flex-col'>
        <Nav />
        <div className='w-5/6 flex flex-col md:flex-row gap-2 justify-around items-center'>
          <div className='border-border-color bg-white w-full border-4 flex flex-col gap-y-2 px-10 py-4'>
            <p>Welcome </p>
            <p className='font-semibold'>{account?.firstName} {account?.lastName}</p>
            <p className='opacity-70'>{account?.email}</p>
          </div>
          <div className='border-border-color bg-white w-full border-4 flex flex-col gap-y-2 px-10 py-4'>
            <p>Total Rooms </p>
            <p className='font-semibold'>{rooms.rooms.length}</p>
            <p className='opacity-70'>Rooms</p>
          </div>
          <div className='border-border-color bg-white w-full border-4 flex flex-col gap-y-2 px-10 py-4'>
            <p>Total Moudels </p>
            <p className='font-semibold'>{models.length}</p>
            <p className='opacity-70'>Moudels</p>
          </div>
        </div>
        <MyCharts />
        <div className='w-5/6 bg-white py-2 px-4'>
          <div className='w-full flex flex-col md:flex-row md:items-end mb-3 justify-between'>
            <div className='flex items-center flex-col md:flex-row md:w-1/2 gap-5'>
              <div className='flex flex-col gap-2 w-full'>
                <p>model</p>
                <div className='bg-secondary rounded-lg py-3 bg-opacity-40 px-5 w-full'>
                  <Dropdown
                    label="All models"
                    inline={true}
                    style={{ backgroundColor: "red" }}
                  >
                    <Dropdown.Item>
                      All models
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <p>sort by</p>
                <div className='bg-secondary rounded-lg py-3 bg-opacity-40 px-5'>
                  <Dropdown
                    label="All models"
                    inline={true}
                  >
                    <Dropdown.Item>
                      All models
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
            </div>
            <button className='bg-secondary rounded-lg py-3 bg-opacity-40 active:bg-opacity-100 px-5'>Apply Filter</button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Speciality
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Presntation
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Absence
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="pl-3">
                      <div className="text-base font-semibold">Neil Sims</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">agarqbellqche@gmail.com</td>
                  <tr>
                    <div className="pl-3">
                      <div className="text-base font-semibold">Math</div>
                    </div>
                  </tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                      8
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />{" "}
                      8
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}
