import React from 'react'
import Navbar from '../Navbar/Navbar'
import Dashboard from '../Dashboard/Dashboard'

const Home = ({ type }) => {
  return (
    <div className='home-container flex flex-col md:flex-row justify-between  h-screen'>
        <Navbar />
        <Dashboard myType={type} />
    </div>
  )
}

export default Home