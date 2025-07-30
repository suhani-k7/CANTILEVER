import React from 'react'
import { Link } from 'react-router'

const Home = () => {
    return (
        <div >
            <h1 className='flex justify-center mb-2 mt-10 space-x-4 font-semibold text-4xl text-cyan-600'>Welcome to MyTaskPro</h1>
            <br/>
            <p className='flex justify-center ml-20 mr-20 text-cyan-900 space-x-4 text-3xl'>After Registering, you will be able to create, read, update and delete your tasks.
                 Only admin can able to see all the users.</p>
            <br/>
            <div className='flex justify-center space-x-4 mt-10 mr-4'>
                <Link to="/login"
                    className='py-2 px-5 border text-3xl mt-10 mr-4 border-cyan-400 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-900 hover:border-cyan-800'>
                    Log in
                </Link>
                <Link to="/register"
                    className='py-2 px-5 border text-3xl mt-10 mr-4 border-cyan-400 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-900 hover:border-cyan-800'>
                    Sign Up 
                </Link>
                
                <Link to="/admin"
                    className='py-2 px-5 border text-3xl mt-10 mr-4 border-cyan-400 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-900 hover:border-cyan-800'>
                    Admin Login
                </Link>
            </div>
        </div>
    )
}

export default Home