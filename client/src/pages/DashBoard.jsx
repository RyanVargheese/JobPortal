import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
const DashBoard=()=>{

    const navigate=useNavigate();

    const {companyData,setCompanyData,setCompanyToken}=useContext(AppContext)

    // Function to logout from company
    const logout=()=>{
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
    }

    useEffect(()=>{
        if(companyData){
            navigate('/dashboard/manage-jobs')
        }
    },[companyData])

    return (
        <div className='min-h-screen text-[#50424F]'>
            {/* NavBar For Recruiter */}
            <div className='shadow py-4' >
                <div className='px-5 flex items-center justify-between' >
                    <img onClick={e => {navigate('/')}} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
                    {companyData && (
                        <div className='flex items-center gap-3'>
                        <p className='max-sm:hidden' >Welcome,{companyData.name}</p>
                        <div className='relative group' >
                            <img className='w-8 rounded-full border-gray-300' src={companyData.image} alt="" />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12' >
                                <ul className='list-none m-0 p-2 bg-white rounded-md text-sm border border-gray-300' >
                                    <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10' >Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    )}
                    
                </div>
            </div>
            
            <div className='flex items-start' >

                {/* Left SideBar */}
                <div className='inline-block min-h-screen border-r-2' >
                    <ul className='flex flex-col items-start pt-5 text-gray-800' >
                        <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-[#800080]'}`} to={'/dashboard/add-job'}>
                            <img className='min-w-4' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden' >Add Job</p>
                        </NavLink>

                        <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-[#800080]'}`} to={'/dashboard/manage-jobs'}>
                            <img className='min-w-4' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden' >Manage Jobs</p>
                        </NavLink>

                        <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-[#800080]'}`} to={'/dashboard/view-applications'}>
                            <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden' >View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                <div className='flex-1 h-full p-2 sm:p-5'>
                    <Outlet/>
                </div>

            </div>
        </div>
    )

}

export default DashBoard