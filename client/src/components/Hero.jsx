import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

    const { setSearchFilter, setIsSearched } = useContext(AppContext)

    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const refUpdated = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)

    }

    return (
        <>
            <div className='mx-6 py-5 text-4xl rounded-md flex flex-col items-center bg-gradient-to-r from-[#800080] to-[#50424F] text-white mt-4 '>
                <div className='text-5xl 2xl:text-7xl max-sm:text-lg font-semibold my-4'>
                    Over 10,000+ jobs to apply
                </div>
                <div className='text-sm 2xl:text-7xl max-sm:text-sm max-w-lg text-center'>
                    Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
                </div>


                {/* Edit */}
                <div className='bg-white text-gray-600 flex items-center justify-between rounded mt-3 pl-3 mx-2 sm:mx-auto max-w-xl max-sm:w-[95%]'>
                    <div className='flex items-center text-lg gap-1 flex-grow min-w-0'>
                        <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
                        <input ref={titleRef} className="max-sm:text-xs placeholder:text-[#50424F] outline-none w-full flex-grow" type="text" name="" id="" placeholder='Search for Jobs' />
                    </div>

                    <div className='w-[1px] h-6 bg-gray-300 mx-1 max-sm:hidden'></div>

                    <div className='flex items-center text-lg gap-1 flex-grow min-w-0'>
                        <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
                        <input ref={locationRef} className="max-sm:text-xs placeholder:text-[#50424F] outline-none w-full flex-grow" type="text" name="" id="" placeholder='Location' />
                    </div>

                    <button onClick={refUpdated} className='bg-[#750b75] px-3 py-2 rounded text-white m-1 text-sm flex-none ml-auto'>
                        Search
                    </button>
                </div>

            </div>
            <div className='flex border border-gray-200 rounded-md p-6 mx-6'>
                <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
                    <p className='font-medium'>Trusted by</p>
                    <img className='h-6' src={assets.microsoft_logo} alt="" />
                    <img className='h-6' src={assets.walmart_logo} alt="" />
                    <img className='h-6' src={assets.accenture_logo} alt="" />
                    <img className='h-6' src={assets.samsung_logo} alt="" />
                    <img className='h-6' src={assets.amazon_logo} alt="" />
                    <img className='h-6' src={assets.adobe_logo} alt="" />
                </div>
            </div>
        </>
    )
}

export default Hero