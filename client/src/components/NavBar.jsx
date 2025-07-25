import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import {useClerk,useUser,UserButton} from '@clerk/clerk-react'
import { Link,useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
const NavBar=()=>{

    // Clerk's pre-built sign-in component/modal
    const {openSignIn}=useClerk();
    // user contains information about the currently authenticated user (e.g., ID, name, email),
    //only for front end purposes
    const {user}=useUser();

    const navigate=useNavigate();

    const {setShowRecruiterLogin}=useContext(AppContext);

    return (
        <div className='py-4 px-6 shadow mx-auto 2xl:px-20 '>
            <div className='flex justify-between items-center'>
                <img onClick={()=>{navigate('/')}} className='cursor-pointer' src={assets.logo} alt="No" />
                {
                    user?
                    <div className='flex gap-3'>
                        <h3 className='cursor-pointer' onClick={()=>{navigate('/applications')}}>Applied Jobs</h3>
                        <p>|</p>
                        <p className='max-sm:hidden' >Hi, {user.firstName+" "+user.lastName}</p>
                        <UserButton />
                    </div>:<div className='flex gap-4 max-sm:text-xs'>
                <button onClick={(e)=>{setShowRecruiterLogin(true)}} className='text-[#50424F] cursor-pointer'>Recruiter Login</button>
                <button onClick={(e)=>{openSignIn()}} className='text-white bg-[#800080] px-6 rounded-full sm:px-9 py-2 cursor-pointer'>Login</button>
            </div>
                }
            </div>
            
        </div>
    )
}

export default NavBar;