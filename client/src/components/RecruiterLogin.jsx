import React, { useContext, useEffect, useState} from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const RecruiterLogin = () => {

    const navigate=useNavigate();

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState(false)
    const [isTextDataSubmitted, setIstextDataSubmitted] = useState(false)

    const {setShowRecruiterLogin,backendUrl,setCompanyToken,setCompanyData}=useContext(AppContext)

    const onSubmitHandler= async (e)=>{
         e.preventDefault()

         if(state==='Sign Up' && !isTextDataSubmitted){
            return setIstextDataSubmitted(true)
            // prevent further execution and set 'isTextDataSubmitted' to true
         }

         try {
            
            if(state=== 'Login'){

                // Send 'email' and 'password' from the form fields
                const {data}=await axios.post(backendUrl+'/api/company/login',{email,password})

                if(data.success){
                    setCompanyData(data.company);
                    setCompanyToken(data.token);

                    // Store the company token in local storage for persistence
                    localStorage.setItem('companyToken',data.token);
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                }
                else{
                    toast.error(data.message)
                }

            }
            else{
                // Create a FormData object to handle form data, especially if it includes a file (like 'image')
                const formData=new FormData()
                formData.append('name',name)
                formData.append('password',password)
                formData.append('email',email)
                formData.append('image',image)

                // Send the FormData object (axios will correctly set content-type for FormData)
                const {data} = await axios.post(backendUrl+'/api/company/register',formData) 

                if(data.success){   
                    setCompanyData(data.company);
                    setCompanyToken(data.token);

                    localStorage.setItem('companyToken',data.token);
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                }
                else{
                    toast.error(data.message)
                }

            }


         } catch (error) {
            toast.error(error.message)
         }

    }

    useEffect(()=>{
        //This typically prevents scrolling on the entire page, often used when a modal or overlay is open.
        document.body.style.overflow='hidden'

        // 'unset' removes the previously applied 'hidden' style
        return ()=>{
            document.body.style.overflow='unset'
        }
    },[])

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-[#B7A6B5]'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium' >
                    Recruiter {state}
                    <p className='text-sm' >Welcome Back !Please Sign In to Continue</p>
                    {state === "Sign Up" && isTextDataSubmitted
                        ? <>
                            <div className='flex items-center gap-4 my-10'>
                                <label htmlFor="image">
                                    <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) :assets.upload_area} alt="" />
                                <input onChange={e=>{setImage(e.target.files[0])}} type="file" hidden id="image" />
                                </label>  
                                <p>Upload Company <br /> Logo</p> 
                            </div>
                        </>
                        : <>
                            {state != 'Login' && (
                                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5' >
                                    <img src={assets.person_icon} alt="" />
                                    <input className='outline-none text-sm' onChange={(e) => { setName(e.target.value) }} value={name} type="text" name="" id="" placeholder='Company Name' required />
                                </div>
                            )}

                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5' >
                                <img src={assets.email_icon} alt="" />
                                <input className='outline-none text-sm' onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" name="" id="" placeholder='Email ID' required />
                            </div>

                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5' >
                                <img src={assets.lock_icon} alt="" />
                                <input className='outline-none text-sm' onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" name="" id="" placeholder='Password' required />
                            </div>



                        </>
                    }
                    {state === 'Login' && (<p className='text-sm text-[#800080] my-4 cursor-pointer' >Forgot Password?</p>)}
                    <button type='submit' className='bg-[#800080] w-full text-white py-2 rounded-full text-sm mt-4'>
                        {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create account':'Next'}
                    </button>

                    {state === 'Login' ? <p className='text-sm mt-5 text-center' >Don't have an Account <span className='text-[#800080] cursor-pointer' onClick={(e) => { setState("Sign Up") }} >Sign Up</span></p> : <p className='text-sm mt-5 text-center' >Already have an Account <span className='text-blue-600 cursor-pointer' onClick={(e) => { setState("Login") }} >Login</span></p>}

                </h1>

                <img className='absolute top-5 right-5 cursor-pointer' onClick={e => setShowRecruiterLogin(false)} src={assets.cross_icon} alt="" />    

            </form>
        </div>
    )

}

export default RecruiterLogin