import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard=({job})=>{

    const navigate=useNavigate();

    return(
    <div className='p-6 shadow shadow-[#B7A6B5] rounded bg-[#b7a6b509]'>
        <div className='flex justify-between items-center'>
            <img className='h-8' src={job.companyId.image} alt="" />
        </div>
        <h4 className='font-medium text-xl mt-2' >{job.title}</h4>
        <div className='flex items-center mt-2 gap-3 text-xs' >
            <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded' >{job.location}</span>
            <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded' >{job.level}</span>
        </div>

        <p className='text-[#50424F] text-sm mt-4' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
        <div className='mt-4 flex gap-4 text-sm' >
            <button onClick={()=>{navigate(`/apply-jobs/${job._id}`);scrollTo(0,0);}} className='bg-[#800080] text-white px-4 py-2 rounded' >Apply Now</button>
            <button onClick={()=>{navigate(`/apply-jobs/${job._id}`);scrollTo(0,0);}} className='bg-white text-[#50424F] px-4 py-2 rounded border border-gray-300' >Learn More</button>
        </div>
    </div>
    )

}

export default JobCard

