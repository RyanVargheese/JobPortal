import React from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDownLoads from '../components/AppDownLoads'

const Home=()=>{
    return (
        <div className="min-w-[400px]">
            <NavBar />
            <Hero />
            <JobListing />
            <AppDownLoads />
        </div>
    )
}

export default Home