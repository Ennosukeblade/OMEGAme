//import "./styles/NavBar.css"

import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from "../assets/icons/NavbarLogo.svg"
import { useCookies } from 'react-cookie';
import axios from "axios";

interface IUser {
  firstName: string
  lastName: string
}
type cookiesType = {
  userId: number
  firstName: string
  lastName: string
}
const NavBar = ({ userId, firstName, lastName }: cookiesType) => {
  const nav = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['userId', 'firstName', 'lastName'])
  //console.log(cookies.userId);
  const [open, setOpen] = useState<boolean>(false)
  const [profileOpen, setProfileOpen] = useState<boolean>(false)

  const linkStyle = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" :
      "text-gray-200 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
  }
  const mobilelinkStyle = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" :
      "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
  }

  const disconnect = () => {
    if (window.confirm('Are you sure you want to Sign Out?')) {
      // Call the function you want to trigger here
      removeCookie('userId')
      removeCookie('firstName')
      removeCookie('lastName')
    }

  }


  return (
    <>
      {/* <div className="container mx-auto">
          <div className='flex justify-between items-center py-3'>
            <ul className="flex gap-x-3 ali">
              <li><a id="len1" className="hoverable" href="#">Games</a></li>
              <li><a id="len2" className="hoverable" href="#">Assets</a></li>
              <li><a id="len3" className="hoverable" href="#">Game Jams</a></li>
              <li><a id="len4" className="hoverable" href="#">Upload Game</a></li>
              <li><a className="underline decoration-sky-500/30">My Company, Inc</a></li>
  
            </ul>
            <button onClick={() => nav("/games/upload")} className="px-4 py-2 font-semibold text-sm bg-sky-500/75 text-white rounded-md shadow-sm">Upload a game</button>
          </div>
        </div>  */}
      <nav className="sticky top-0 z-20 bg-gray-950 bg-opacity-20 backdrop-filter backdrop-blur-lg">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center lg:justify-between px-12">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button onClick={() => setOpen(!open)} type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                {/*
    Icon when menu is closed.

    Menu open: "hidden", Menu closed: "block"
  */}
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                {/*
    Icon when menu is open.

    Menu open: "block", Menu closed: "hidden"
  */}
                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-shrink-0 items-center">
              <NavLink to={'/'}><img className="block h-10 w-auto lg:hidden" src={logo} alt="Your Company" /></NavLink>
              <NavLink to={'/'}><img className="hidden h-10 w-auto lg:block" src={logo} alt="Your Company" /></NavLink>

            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <NavLink to={'/'} className={linkStyle}><p className="drop-shadow-md">Games</p></NavLink>
                {/* <NavLink to={'/games'} className={linkStyle}><p className="drop-shadow-md">Games</p></NavLink> */}
                {/* <NavLink to={'/assets'} className={linkStyle}><p className="drop-shadow-md">Assets</p></NavLink> */}
                <NavLink to={'/gamejams'} className={linkStyle}><p className="drop-shadow-md">Game Jams</p></NavLink>
              </div>
            </div>
            {/* <div className="flex flex-1 items-center justify-between sm:justify-start">
        </div> */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="px-3">
                <button onClick={() => nav("/games/upload/0")} className="px-4 py-2 font-semibold text-sm bg-red-500 text-white rounded-md shadow-sm">Upload a game</button>

              </div>
              {userId ? <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>:<Link to={"/login"}><p className="drop-shadow-md text-white">Login</p></Link>}


              {/* Profile dropdown */}


              <div className="relative ml-3">
                {userId &&
                  <button onClick={() => setProfileOpen(!profileOpen)} type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`} alt="" loading="lazy" />
                  </button>}




                {/*
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  */}
                {profileOpen && userId &&
                  <div onMouseLeave={() => setProfileOpen(!profileOpen)} className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                    {/* Active: "bg-gray-100", Not Active: "" */}
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</a>
                    <button onClick={() => disconnect()} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</button>
                  </div>}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        {open ?
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <NavLink to={'/'} className={mobilelinkStyle}><p className="drop-shadow-md">Games</p></NavLink>
              {/* <NavLink to={'/games'} className={linkStyle}><p className="drop-shadow-md">Games</p></NavLink> */}
              <NavLink to={'/assets'} className={mobilelinkStyle}><p className="drop-shadow-md">Assets</p></NavLink>
              <NavLink to={'/gamejams'} className={mobilelinkStyle}><p className="drop-shadow-md">Game Jams</p></NavLink>
            </div>
          </div> :
          ""}
      </nav>

    </>
  )
}

export default NavBar