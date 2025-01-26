import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
const SideBar = () => {
  return (
    <div className='sidebar'>
        <div class="sideOptions">
              <Link to="/" className='sideTag'><h3>Master</h3></Link>
              <Link to="/" className='sideTag'><h3>Ledger</h3></Link>
              <Link to="/" className='sideTag'><h3>Report</h3></Link>
        </div>
            <button id="logOut">LogOut</button>
    </div>
  )
}

export default SideBar