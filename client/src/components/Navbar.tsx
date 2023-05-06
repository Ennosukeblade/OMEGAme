import React from 'react'
import "./styles/NavBar.css"
const NavBar = () => {
  return (
    <div className="cc">
  <nav className="navbar navbar-inverse">
    <div className="container-fluid">
        <div className='d-flex p-2'>
      <ul className="nav navbar-nav">
        <li><a id="len1" className="hoverable" href="#">Games</a></li>
        <li><a id="len2" className="hoverable" href="#">Assets</a></li>
        <li><a id="len3" className="hoverable" href="#">Game Jams</a></li>
        <li><a id="len4" className="hoverable" href="#">Upload Game</a></li>
      </ul>
    </div>
    </div>
  </nav>
</div>
  )
}

export default NavBar