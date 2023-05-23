import { useState, memo, useRef, useEffect } from "react"
export default memo(function ToggleRoom({isStop}) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input value={isStop}  type="checkbox" className="sr-only peer" />
            <div className={`w-11 h-6  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 ${isStop?"after:translate-x-full after:border-white bg-red-600":"bg-green-200"}  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`} />
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Start / Stop
            </span>
        </label>

    )
})