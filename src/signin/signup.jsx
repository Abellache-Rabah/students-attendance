import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { getData } from "google-token-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup(params) {
  const [state, setState] = useState({
    validateusername: [
      "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
      "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    ],
    validateemail: [
      "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
      "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    ],
    validatefirstname: [
      "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
      "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    ],
    validatelastname: [
      "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
      "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    ],
    validatetel: [
      "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
      "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    ],
    validatepassowrd: [
      "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
      "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
    ],
    paswwordchecked: false,
    err: {
      msg: [],
      hidden: "hidden",
    },
  });
  const [isHidden, setIshedden] = useState("true");
  const p = useRef();
  const rp = useRef();
  const username = useRef();
  const email = useRef();
  const fname = useRef();
  const lname = useRef();
  const tel = useRef();
  const sp = useRef();
  const code = useRef();
  const company = useRef();
  const navigate = useNavigate();
  async function sendCode() {
    let res;
    let req = { email: email.current.value };

    if(validateEmail(email.current.value)&&validateName(sp.current.value) && validateName(fname.current.value) && validatepassword(p.current.value) && validateName(lname.current.value) ){
      res = await axios.post(
        "https://simpleapi-p29y.onrender.com/teacher/auth",
        req,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (res.data.res ){
      setIshedden((prevValue) => !prevValue)
      } else {
        toast.error(res.data.mes, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }


    }else{
      toast.error("Check your information", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    

    
  }
  async function send() {
    let res;
    let req = {
      firstname: fname.current.value,
      lastname: lname.current.value,
      sex: company.current.value,
      email: email.current.value,
      password: p.current.value,
      specialist: sp.current.value,
      code: code.current.value,
    };
    if (req.password == rp.current.value) {
      res = await axios.post(
        "https://simpleapi-p29y.onrender.com/teacher/signup",
        req,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (res.data.res) {
        navigate("/home", { state: req });
      } else {
        toast.error(res.data.mes, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  }
  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  function validateName(username) {
    return (
      String(username).match(/^([a-z]+)$/) && String(username).length <= 15
    );
  }
  function validateNumbre(numbre) {
    return (
      String(numbre).match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g) &&
      String(numbre).length <= 15
    );
  }
  function validateusername(username) {
    return (
      String(username).match(/^([a-z_]+[0-9_]*)+$/) &&
      String(username).length <= 15
    );
  }
  function validatepassword(password) {
    return String(password).length < 30 ? true : false;
  }
  function handleusername(e) {
    let value = e.target.value;
    if (validateusername(value) || e.target.value == "") {
      setState((dstate) => ({
        ...dstate,
        validateusername: [
          "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
          "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    } else {
      setState((dstate) => ({
        ...dstate,
        validateusername: [
          "border-red-300 text-red-900 dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600",
          "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    }
  }
  function handle(e) {
    let value = e.target.value;
    if (validateEmail(value) || e.target.value == "") {
      setState((dstate) => ({
        ...dstate,
        validateemail: [
          "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
          "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    } else {
      setState((dstate) => ({
        ...dstate,
        validateemail: [
          "border-red-300 text-red-900 dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600",
          "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    }
  }
  function handlepassword(e) {
    if (e.target.id == "floating_password") {
      if (state.paswwordchecked && rp.current.value != "") {
        if (
          p.current.value == rp.current.value &&
          validatepassword(p.current.value)
        ) {
          setState((dstate) => ({
            ...dstate,
            validatepassowrd: [
              "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
              "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
            ],
          }));
        } else {
          setState((dstate) => ({
            ...dstate,
            validatepassowrd: [
              "border-red-300 text-red-900 dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600",
              "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
            ],
          }));
        }
      } else {
        if (
          (p.current.value == rp.current.value || rp.current.value == "") &&
          validatepassword(p.current.value)
        ) {
          setState((dstate) => ({
            ...state,
            validatepassowrd: [
              "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
              "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
            ],
          }));
        } else {
          setState((dstate) => ({
            ...dstate,
            validatepassowrd: [
              "border-red-300 text-red-900 dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600",
              "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
            ],
          }));
        }
      }
    } else {
      if (
        p.current.value == rp.current.value &&
        validatepassword(rp.current.value)
      ) {
        setState((dstate) => ({
          ...dstate,
          validatepassowrd: [
            "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600",
            "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
          ],
        }));
      } else {
        setState((dstate) => ({
          ...dstate,
          validatepassowrd: [
            "border-red-300 text-red-900 dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600",
            "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
          ],
        }));
      }
    }
  }
  function handlfirstname(e) {
    let value = e.target.value;
    if (validateName(value) || e.target.value == "") {
      setState((dstate) => ({
        ...dstate,
        validatefirstname: [
          "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
          "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    } else {
      setState((dstate) => ({
        ...dstate,
        validatefirstname: [
          "block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer",
          "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    }
  }
  const login2 = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse.access_token);
      getData(tokenResponse.access_token, (err, data) => {
        // your logic here
        if (err) {
          return false;
        }
        email.current.value = data.email;
        fname.current.value = data.given_name;
        lname.current.value = data.family_name;
      });
    },
  });
  function login() {
    let req = {
      username: username.current.value,
      email: email.current.value,
      pwd: p.current.value,
      rpwd: rp.current.value,
      fname: fname.current.value,
      lname: lname.current.value,
      code: tel.current.value,
      company: company.current.value,
    };
    console.log(req);
    if (
      validateusername(req.username) &&
      validateEmail(req.email) &&
      validatepassword(req.pwd) &&
      req.pwd == req.rpwd &&
      validateName(req.fname) &&
      validateName(req.lname) &&
      validateNumbre(req.tel) &&
      validateName(req.company)
    ) {
      send();
      console.log("ff");
    } else {
      login2();
      console.log("dd");
    }
  }
  function handllastname(e) {
    let value = e.target.value;
    if (validateName(value) || e.target.value == "") {
      setState((dstate) => ({
        ...dstate,
        validatelastname: [
          "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
          "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    } else {
      setState((dstate) => ({
        ...dstate,
        validatelastname: [
          "block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer",
          "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    }
  }
  function handletel(e) {
    let value = e.target.value;
    if (validateNumbre(value) || e.target.value == "") {
      setState((dstate) => ({
        ...dstate,
        validatetel: [
          "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
          "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    } else {
      setState((dstate) => ({
        ...dstate,
        validatetel: [
          "block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-red dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer",
          "peer-focus:font-medium absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        ],
      }));
    }
  }
  return (
    <div className="items-center justify-center flex">
      <div
        className={`flex justify-center items-center flex-col ${
          isHidden ? "hidden" : ""
        }`}
      >
        <div className="relative z-0 mb-3 w-full group">
          <input
            type="text"
            name="floating_email"
            ref={code}
            id="username"
            className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className={`${state.validateusername[1]}`}
          >
            Code
          </label>
          <button
            onClick={send}
            className="w-full mt-6 mb-3 bg-purple-500 rounded-md h-10 text-white font-serif"
          >
            Sign up
          </button>
        </div>
      </div>
      <div className={`w-5/6 md:w-3/5 ${isHidden ? "" : "hidden"}`}>
        <div
          className={`${state.err.hidden} flex p-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800`}
          role="alert"
        >
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Warring!</span>{" "}
            {state.err.msg.map((e) => e + ",")}.
          </div>
        </div>
        <div className="mb-3 dark:text-white">
          <p className="text-3xl font-semibold font-serif">
            Welcome to the page
          </p>
          <p className="text-zinc-500 mt-3 font-serif dark:text-slate-400">
            Welcome,please entre details.
          </p>
        </div>
       
        <div className="relative z-0 mb-3 w-full group">
          <input
            type="email"
            name="floating_email"
            ref={email}
            onBlur={handle}
            onChange={handle}
            id="floating_email"
            className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${state.validateemail[0]} appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className={`${state.validateemail[1]}`}
          >
            Email address
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-3 w-full group">
            <input
              type="password"
              ref={p}
              onChange={handlepassword}
              name="floating_password"
              id="floating_password"
              className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${state.validatepassowrd[0]} appearance-none focus:outline-none focus:ring-0 peer`}
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className={`${state.validatepassowrd[1]}`}
            >
              Password
            </label>
          </div>
          <div className="relative z-0 mb-3 w-full group">
            <input
              type="password"
              ref={rp}
              onBlur={handlepassword}
              onClick={() => {
                setState({ ...state, paswwordchecked: true });
              }}
              name="repeat_password"
              id="floating_repeat_password"
              className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${state.validatepassowrd[0]} appearance-none focus:outline-none focus:ring-0 peer`}
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_repeat_password"
              className={`${state.validatepassowrd[1]}`}
            >
              Confirm password
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-3 w-full group">
            <input
              type="text"
              ref={fname}
              onChange={handlfirstname}
              name="floating_first_name"
              id="floating_first_name"
              className={`${state.validatefirstname[0]}`}
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className={`${state.validatefirstname[1]}`}
            >
              First name
            </label>
          </div>
          <div className="relative z-0 mb-3 w-full group">
            <input
              type="text"
              ref={lname}
              onChange={handllastname}
              name="floating_last_name"
              id="floating_last_name"
              className={`${state.validatelastname[0]}`}
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className={`${state.validatelastname[1]}`}
            >
              Last name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          
          <div className="relative z-0 mb-3 w-full group">
            <input
              type="text"
              ref={sp}
              name="floating_company"
              id="floating_company"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_company"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              specialist
            </label>
          </div>
          <div>
        
          <select ref={company} id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">

              <option value="Male">Male</option>
            <option value="Fimale">Fmail</option>
          </select>
          </div>
        </div>
        <button
          onClick={() => {
            sendCode();


          }}
          className="w-full mt-6 mb-3 bg-purple-500 rounded-md h-10 text-white font-serif"
        >
          Sign up
        </button>
        <button
          onClick={login}
          className="w-full border border-slate-300 py-1 rounded-md font-serif flex justify-center items-center dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
        >
          <img
            className="h-8 w-8 mr-5"
            src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png"
          />
          Sign up with google
        </button>
        <div className="flex justify-center mt-5">
          <p className="font-serif dark:text-white">you have an account?</p>
          <Link
            to={"../signin"}
            className="pl-1 text-purple-900 font-serif dark:text-purple-500"
          >
            sing in
          </Link>
        </div>
      </div>
    </div>
  );
}
