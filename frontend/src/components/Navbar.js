import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () =>  {
  return (
    <div className='navbar'>
      <div className='logo'>
        <img src='/images/logo.svg'></img>
      </div>
      <div className='search'>
        <input type='text' placeholder='search' />
      </div>
      <div className='buttons'>
      <Link to={'/login'}>Login</Link>
      <Link to={'/register'}>Register</Link>
      </div>
    </div>
  )
}
export default  Navbar