import React from 'react'

export default function Room() {
    return (
        <div className='w-full h-full flex items-center flex-col gap-2  px-2'>
            <button className='w-full py-2 px-4 text-white bg-cyan-800 rounded-lg'>Code</button>
            <div className='flex flex-col md:flex-row  md:items-center md:w-full gap-2'>
                <p className='py-2 px-4 rounded-lg w-full text-center bg-green-300'>Model : Math </p>
                <p className='py-2 px-4 rounded-lg w-full text-center bg-green-300'>Specialist : Mi </p>
                <p className='py-2 px-4 rounded-lg w-full text-center bg-green-300'>Level : First Lisence </p>
            </div>
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
                            className="px-1 md:px-6  py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >

                        </th>
                        <td className="px-1 md:px-6  py-4"></td>
                        <td className="px-1 md:px-6  py-4 hidden md:block"></td>
                        <td className="px-1 md:px-6  py-4"></td>
                        <td className="px-1 md:px-6 cursor-pointer py-4 hidden md:block">
                            Remove
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}
