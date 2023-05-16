import { useState, ChangeEvent } from 'react'
import logo from "../assets/icons/Logo.svg"
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

interface IUser {
    firstName: string
    lastName: string
    email: string
    password: string
    confirm: string
}
const Register = () => {
    const nav = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['userId', 'firstName', 'lastName']);
    const [user, setUser] = useState<IUser>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm: ""
    })
    const [emailError, setEmailError] = useState("")
    const [errors, setErrors] = useState<any>({})
    const handleChange = (e: ChangeEvent) => {
        const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setEmailError("")
        axios.post("https://localhost:7223/api/user/register", user)
            .then(response => {
                setErrors({})
                console.log(response.data)
                removeCookie("userId")
                setCookie("userId", response.data.value.userId, { path: '/' })
                setCookie("firstName", response.data.value.firstName, { path: '/' })
                setCookie("lastName", response.data.value.lastName, { path: '/' })
                nav("/")
            })
            .catch(error => {
                if (error.response && error.response.data.status == 400) {
                    // Handle API validation errors
                    //const apiError: ApiError = error.response.data;

                    console.log(error.response)
                    setErrors(error.response.data.errors)
                }
                else if (error.response && error.response.status == 401) {
                    // Handle API validation errors
                    //const apiError: ApiError = error.response.data;

                    console.log(error)
                    setEmailError(error.response.data);
                }
                else {
                    console.log(error)
                }

            })
    }
    //console.log(errors);

    return (
        <>
            <div className="flex flex-col 2xl:justify-center items-center px-6 py-6 lg:px-8">
                <div className="max-w-md w-96 px-10 py-3 bg-white mx-2 md:mx-0 shadow rounded-3xl sm:px-10 sm:py-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={logo}
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign up with email
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="FirstName" className="block text-sm font-medium leading-6 text-gray-900">
                                    First Name {errors.FirstName && <span className='text-red-500'>{errors.FirstName[0]}</span>}
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="FirstName"
                                        name="firstName"
                                        type="text"
                                        autoComplete="text"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />

                                </div>
                            </div>
                            <div>
                                <label htmlFor="FirstName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last Name <span className='text-red-500'>{errors.LastName ? errors.LastName[0] : ""}</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="LastName"
                                        name="lastName"
                                        type="text"
                                        autoComplete="text"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address <span className='text-red-500'>{errors.Email ? errors.Email[0] : emailError}</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password <span className='text-red-500'>{errors.Password ? errors.Password[0] : ""}</span>
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
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm Password <span className='text-red-500'>{errors.Confirm ? errors.Confirm[0] : ""}</span>
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="Confirm Password"
                                        name="confirm"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already a member?{' '}
                            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register