import React, { useContext,useEffect,useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations} from '../assets/assets';
import JobCard from './JobCard';

const JobListing=()=>{

    const {searchFilter,isSearched,setSearchFilter,jobs}=useContext(AppContext);
    const [showFilter,setShowFilter]=useState(false);
    const [currentPage,setCurrentPage]=useState(1);

    const [selectedCategories,setSelectedCategories]=useState([]);
    const [selectedLocations,setSelectedLocations]=useState([]);
    const [filteredJobs,setFilteredJobs]=useState([]);

    const handleCategoryChange=(category)=>{

        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c!== category) : [...prev,category]
        )

    }

    const handleLocationChange=(location)=>{

        setSelectedLocations(
            prev => prev.includes(location) ? prev.filter(l => l!== location) : [...prev,location]
        )

    }

    useEffect(()=>{

        const matchesCategory= (job)=> selectedCategories.length === 0 || selectedCategories.includes(job.category)

        const matchesLocation= (job)=> selectedLocations.length === 0 || selectedLocations.includes(job.location)

        const matchesTitle=(job)=> searchFilter.title === '' || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const matchesSearchLocation=(job)=> searchFilter.location === '' || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter((job)=>{
            return matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        })

        setFilteredJobs(newFilteredJobs);
        setCurrentPage(1);
    },[jobs,selectedCategories,selectedLocations,searchFilter])

    return (
        <div className='sm:flex sm:gap-4'>

            {/* Sidebar */}
            <div>
            <div className='w-full lg:w-1/4 bg-white px-6 pt-3'>

                {isSearched && (searchFilter.title!='' || searchFilter.location!='') && (
                    <>
                    <h3 className='font-medium text-lg mb-4'>Content Searched</h3>
                    <div className='mb-4 text-gray-600'>
                        {searchFilter.title && (
                            <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                            {searchFilter.title}
                            <img onClick={e =>{setSearchFilter( prev => ({...prev,title:""}) ) }} className='cursor-pointer inline' src={assets.cross_icon} alt="" />
                            </span>
                        )}
                        {searchFilter.location && (
                            
                            <span className=' ml-2 inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                            
                            {searchFilter.location}
                            <img onClick={e =>{setSearchFilter( prev => ({...prev,location:""}) ) }} className='cursor-pointer inline' src={assets.cross_icon} alt="" />
                            </span>
                        )}
                    </div>
                    </>
                    )}

            </div>

            <button onClick={e => setShowFilter(prev => !prev)} className='px-6 mt-2 ml-6 py-1.5 rounded border border-gray-400 lg:hidden'>
                {showFilter ? "Close" : "Filters"}
            </button>

            {/* Categories */}
            <div className={`${showFilter ? "" : "max-lg:hidden"} px-6`}>
                <h3 className='font-medium text-lg py-4'>Different Categories</h3>
                <ul className='space-y-4 text-gray-600'>
                {JobCategories.map((category,idx)=>{
                    return (
                        <li key={idx} className='flex gap-3 items-center'>
                        <input key={idx} type="checkbox" className='scale-125' name="" id="" 
                         onChange={()=>{handleCategoryChange(category)}}
                         checked={selectedCategories.includes(category)}
                        />
                        {category}<br/>
                        </li>
                    )
                })
                }
                </ul>
            </div>
            {/* Location */}
            <div className={`${showFilter ? "" : "max-lg:hidden"} px-6`}>
                <h3 className='font-medium text-lg py-4'>Different Locations</h3>
                <ul className='space-y-4 text-gray-600'>
                {JobLocations.map((location,idx)=>{
                    return (
                        <li key={idx} className='flex gap-3 items-center'>
                        <input key={idx} type="checkbox" className='scale-125' name="" id="" 
                        onChange={()=>{handleLocationChange(location)}}
                         checked={selectedLocations.includes(location)}
                        />
                        {location}<br/>
                        </li>
                    )
                })
                }
                </ul>
            </div>
            </div>


            {/* Job Listing */}
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4 pt-6 max-sm:ml-2'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
                <p className='mb-8'>Get your desired Job from top companies</p>
                {/* Grid for Job listing */}
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job,idx)=>(
                        <JobCard key={idx} job={job} />
                    ))}
                </div>

                {/* Pagination */}
            {jobs.length > 0 && (
                <div className='flex items-center justify-center space-x-2 mt-10' >
                    <a href="#job-list">
                        <img onClick={()=>{setCurrentPage(Math.max(currentPage-1,1))}} src={assets.left_arrow_icon} alt="" />
                    </a>
                    {
                        Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index)=>(
                            <a href="#job-list" id={index}>
                                <button onClick={(e)=>{setCurrentPage(index+1)}} className={`cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index+1 ? "bg-blue-100 text-blue-500" : "text-gray-500"} `} >{index+1}</button>
                            </a>
                        ))
                    }
                    <a href="#job-list">
                        <img onClick={()=>{setCurrentPage(Math.min(currentPage+1,Math.ceil(filteredJobs.length/6)))}} src={assets.right_arrow_icon} alt="" />
                    </a>
                </div>
            )}

            </section>

        </div>
    )

}

export default JobListing