import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useAuth, useUser } from '@clerk/clerk-react';

export const AppContext = createContext();
const AppContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const { user } = useUser();
    /*
     This hook provides access to the currently authenticated user's object.
     It listens for changes and re-renders your component when the user logs in, logs out, or their information changes.
    */
    const { getToken } = useAuth();
    /*
     getToken is an asynchronous function that you call to retrieve a valid JSON Web Token (JWT) for the authenticated user.
     This token is crucial for making authenticated requests to your backend API.
     */


    const [searchFilter, setSearchFilter] = useState({
        title: '', location: ''
    });

    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    const [userData, setUserData] = useState(null);
    const [userApplications, setUserApplications] = useState([]);
    
    

    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/jobs')

            if (data.success) {
                setJobs(data.jobs)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to fetch company data
    const fetchCompanyData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })

            if (data.success) {
                setCompanyData(data.company)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    //Function to fetch user data
    const fetchUserData = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get(backendUrl + '/api/users/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setUserData(data.user);
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to fetch User's Applied Applications data
    const fetchUserApplications=async ()=>{
        try {
            
            const token= await getToken();

            const {data}=await axios.get(backendUrl+'/api/users/applications',{headers:
                {Authorization:`Bearer ${token}`}
            })

            if (data.success) {
                setUserApplications(data.application)
            
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken');

        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }

    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    }, [companyToken])

    useEffect(() => {
        if (user)
            fetchUserData()
            fetchUserApplications()
    }, [user])

    const value = {
        searchFilter, setSearchFilter, isSearched, setIsSearched, jobs, setJobs, showRecruiterLogin, setShowRecruiterLogin, companyToken, setCompanyToken, companyData, setCompanyData, backendUrl, userData, setUserData, userApplications, setUserApplications,fetchUserData,fetchUserApplications
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider