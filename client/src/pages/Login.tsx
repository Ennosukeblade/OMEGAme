/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState, ChangeEvent } from "react";
import logo from "../assets/icons/Logo.svg"
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";

interface IUser {
    loginEmail: string
    loginPassword: string
}
export default function Login() {
    const nav = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['userId', 'firstName', 'lastName']);
    const [user, setUser] = useState<IUser>({
        loginEmail: "",
        loginPassword: ""
    })
    const [error, setError] = useState<string>()

    const handleChange = (e: ChangeEvent) => {
        //e.preventDefault();
        const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
        setUser({ ...user, [name]: value });
    };
    console.log(user);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await axios.post("https://localhost:7223/api/user/login", user)
            .then(response => {
                setError("")
                console.log(response.data)
                removeCookie("userId")
                setCookie("userId", response.data.userId, { path: '/' })
                setCookie("firstName", response.data.firstName, { path: '/' })
                setCookie("lastName", response.data.lastName, { path: '/' })
                nav('/')
            })
            .catch(error => {
                console.log(error)
                setError(error.response.data)
            })
    }
    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
            <div className="flex flex-1 flex-col 2xl:justify-center items-center px-6 py-6 lg:px-8">
                <div className="max-w-md w-96 px-10 py-3 bg-white mx-2 md:mx-0 shadow rounded-3xl sm:px-10 sm:py-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={logo}
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        {error && <span className="text-red-500">{error}</span>}
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="loginEmail"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="loginPassword"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <Link to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}
