import React from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDownLoads from '../components/AppDownLoads'

const Home=()=>{
    return (
        <>
        <NavBar />
        <Hero />
        <JobListing />
        <AppDownLoads />
        </>
    )
}

export default Home