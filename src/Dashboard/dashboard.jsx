import React, { memo, useEffect, useState } from 'react'
import Nav from '../nav/nav'
import MyCharts from './chartLine'
import { Dropdown, Pagination } from 'flowbite-react'
import { useDispatch, useSelector } from "react-redux"
import { fetchStudents, emptyStudents } from "../redux/studentReducer"
import axios from 'axios'
import { toast } from 'react-toastify'
export default memo(function Dashboard() {
  const dispatch = useDispatch()
  const account = useSelector(state => state.account)
  const rooms = useSelector(state => state.rooms)
  const seassions = useSelector(state => state.seassions)
  const students = useSelector(state => state.students)
  const [models, setModels] = React.useState([])
  const [specialist, setSpecialist] = React.useState([])
  const [currentModule, setCurrentModule] = useState("All modules")
  const [currentSortBy, setCurrentSortBy] = useState("All")
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(10)
  const [currentPage, setCurrentPage] = useState(1);
  const [student, setStudent] = useState([])
  const [filteredStudent, setFilteredStudent] = useState([])
  useEffect(() => {
    if (rooms.rooms.length <= 0) {
      setSpecialist([])
      dispatch(emptyStudents())
    } else {
      rooms.rooms.forEach(room => {
        setModels((prev) => [...prev, room.module])
        setSpecialist((prev) => [...prev, room.specialist])
      })
    }
    setModels((prev) => removeDuplicate(prev))
    setSpecialist((prev) => removeDuplicate(prev))
    dispatch(fetchStudents(specialist))
  }, [rooms.rooms]);
  useEffect(() => {
    dispatch(fetchStudents(specialist))
  }, [specialist]);
  useEffect(() => {
    if (seassions.seassions) {
      setStudent([])
      seassions.seassions.map((e) => {
        e.attendence.map((att) => {
          let a = {
            ...att,
            module: e.room.module
          }
          setStudent((prev) => {
            return [...prev, a]
          })
        })
      })
    }
  }, [seassions.seassions]);
  useEffect(() => {
    setFilteredStudent(removeDuplicateObject(student))
    setFilteredStudent((prev) => prev.map((e) => {
      return { ...e, present: presentInModule(e), absent: absentInModule(e) }
    }))
  }, [student]);
  const handleModule = (value) => {
    setCurrentModule(() => value)
  }
  //remove duplicate
  const removeDuplicate = (arr) => {
    let unique_array = []
    arr.map((e) => {
      if (unique_array.indexOf(e) === -1) {
        unique_array.push(e)
      }
    })
    return unique_array
  }
  //remove duplicate array of object bt contain key
  const removeDuplicateObject = (arr) => {
    const uniqueArray = arr.filter((value, index) => {
      const _value = JSON.stringify(value);
      return index === arr.findIndex(obj => {
        return JSON.stringify(obj) === _value;
      });
    });
    return uniqueArray
  }
  const presentInModule = (st) => {
    let count = 0
    if (currentModule === "All modules") {
      student.map((e) => {
        if (e._id === st._id && e.year == st.year && e.specialist == st.specialist) {
          count++
        }
      })
    } else {
      student.map((e) => {
        if (e.module === currentModule && e._id === st._id && e.year == st.year && e.specialist == st.specialist) {
          count++
        }
      })
    }

    return count
  }
  const absentInModule = (st) => {
    let countRepeteModule = 0
    let count = 0
    let present = 0
    if (currentModule != "All modules") {
      rooms.rooms.map((e) => {
        if (e.module == currentModule && e.schoolYear == st.year && e.specialist == st.specialist) {
          countRepeteModule++
        }
      })
      present = presentInModule(st)
    } else {
      seassions && seassions.seassions && seassions.seassions.map((e) => {
        if (e.room.schoolYear == st.year && e.room.specialist == st.specialist) {
          countRepeteModule++
        }
      })
      seassions.seassions.map((e) => {
        e.attendence.map((att) => {
          if (att._id === st._id && att.year == e.room.schoolYear && att.specialist == e.room.specialist) {
            present++
          }
        })
      })
    }
    count = countRepeteModule - present
    return count
  }
  useEffect(() => {
    console.log(student);
  });
  const sendMessages = async (idStudent, absent) => {
    if (absent == 0) {
      return
    }
    const req = {
      email: account.email,
      password: account.password,
      idStudent: idStudent,
      absent: absent,
      module: currentModule
    }
    await axios.post("https://simpleapi-p29y.onrender.com/teacher/sendMessage", req, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }



  const sendToAllStudent = async () => {
    let st = students.students.map(e => {
      if (absentInModule(e)) {
        return {
          id: e._id,
          absent: absentInModule(e)
        }
      }
    })
    const req = {
      email: account.email,
      password: account.password,
      student: st,
      module: currentModule
    }
    await axios.post("https://simpleapi-p29y.onrender.com/teacher/sendtoallstudents", req, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })

  }
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
            <p className='font-semibold'>{rooms.rooms?.length}</p>
            <p className='opacity-70'>Rooms</p>
          </div>
          <div className='border-border-color bg-white w-full border-4 flex flex-col gap-y-2 px-10 py-4'>
            <p>Total Moudels </p>
            <p className='font-semibold'>{models?.length}</p>
            <p className='opacity-70'>Moudels</p>
          </div>
        </div>
        <MyCharts />
        <div className='w-full bg-white py-2 px-4'>
          <div className='w-full flex flex-col md:flex-row md:items-end mb-3 justify-between'>
            <div className='flex items-center flex-col md:flex-row md:w-1/2 gap-5'>
              <div className='flex flex-col gap-2 '>
                <p>model</p>
                <div className='bg-secondary rounded-lg py-3 bg-opacity-40 px-5 w-full'>
                  <Dropdown
                    label={currentModule}
                    inline={true}
                    style={{ backgroundColor: "red" }}
                  >
                    <Dropdown.Item onClick={() => setCurrentModule(() => "All modules")}>
                      All modules
                    </Dropdown.Item>
                    {models.map((m, i) => <Dropdown.Item key={i} onClick={() => { handleModule(m) }}>{m}</Dropdown.Item>)}
                  </Dropdown>
                </div>
              </div>
              {/* 
              <div className='flex flex-col gap-2 w-full'>
                <p>sort by</p>
                <div className='bg-secondary rounded-lg py-3 bg-opacity-40 px-5'>
                  <Dropdown
                    label={currentSortBy}
                    inline={true}
                  >
                    <Dropdown.Item onClick={() => setCurrentSortBy(() => "All")}>
                      All
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCurrentSortBy(() => "PRESNTATION")}>
                      PRESNTATION
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCurrentSortBy(() => "ABSENCE")}>
                      ABSENCE
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
  */}
            </div>
            <button onClick={sendToAllStudent} className='bg-secondary  rounded-lg py-3 bg-opacity-40 active:  px-5'>Send to all students</button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>

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
                  <th scope="col" className="px-6 py-3">
                    Send warring
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  students && students.students && students.students.map((e, i) => {
                    if (i >= min && i < max) {
                      return (
                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                          <th
                            scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div className="pl-3">
                              <div className="text-base font-semibold">{e.lastname} {e.firstname}</div>
                            </div>
                          </th>
                          <td className="px-6 py-4">{e.email}</td>
                          <tr>
                            <div className="pl-3">
                              <div className="text-base font-semibold">{e.specialist}</div>
                            </div>
                          </tr>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                              {presentInModule(e)}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />{" "}
                              {absentInModule(e)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                            {absentInModule(e)?<button className='rounded text-white bg-blue-500 hover:bg-red-600 px-5 py-2' onClick={() => sendMessages(e._id, absentInModule(e))}>Send</button>:<button className='px-5 py-2 cursor-default'>Send</button>}
                            </div>
                          </td>
                        </tr>
                      )
                    }
                  })
                }

              </tbody>
            </table>
           
            <nav
              className="flex items-center justify-between p-4"
              aria-label="Table navigation"
            >
              <Pagination
                currentPage={currentPage}
                layout="table"
                onPageChange={(page) => {
                  setMin(page - 1)
                  setMax(page + 5)
                  setCurrentPage(page)
                }}
                showIcons={true}
                totalPages={Math.ceil(students.students ? students.students.length / 5 : 1)}
              />
            </nav>
          </div>

        </div>
      </div>
    </div>
  )
}
)