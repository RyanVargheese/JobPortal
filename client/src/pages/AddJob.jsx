import React, { useRef, useState,useEffect,useContext } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddJob=()=>{

    const [title,setTitle]=useState('')
    const [location,setLocation]=useState('Banglore')
    const [category,setCategory]=useState('Programming')
    const [level,setLevel]=useState('Beginner Level')
    const [salary,setSalary]=useState(0)
    
    const editorRef=useRef(null)
    const quillRef=useRef(null)

    const {backendUrl,companyToken}=useContext(AppContext)

    const onSubmitHandler= async (e)=>{
        //Preventing Default form behaviour
        e.preventDefault();

        try {
            //Extracting rich text(HTML) from Quill editor
            const description=quillRef.current.root.innerHTML; 

             // Making an asynchronous POST request to the backend API to post a new job
             //The job data to be sent in the request body,will be available in req.body
            
            const {data}= await axios.post(backendUrl+'/api/company/post-job',{title,description,location,category,level,salary},{headers:{token:companyToken}})
            
            if(data.success){
                // Display a success notification to the user
                toast.success(data.message)

                //Making it back to normal
                setTitle('');
                setSalary(0);
                quillRef.current.root.innerHTML="";

            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    // It runs side effects after the component renders
    useEffect(()=>{
        //Initiating quill only once
        //Quill attaching it to the DOM element referenced by `editorRef.current`
        if(!quillRef.current && editorRef.current){
            quillRef.current=new Quill(editorRef.current,{theme:'snow'})
        }
    },[])

    return (
       <form onSubmit={(e)=>{onSubmitHandler(e)}} className='container p-4 flex flex-col w-full items-start gap-3'>

        <div className='w-full' >
            <p className='mb-2'>Job Title</p>
            <input className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' type="text" onChange={e=>setTitle(e.target.value)} value={title} required placeholder='Title'/>
        </div>

        <div className='w-full max-w-2xl'>
            <p className='my-2'>Job Description</p>
            <div ref={editorRef} >
            
            </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
                <p className='mb-2'>Job Category</p>
                <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>{setCategory(e.target.value)}}>
                    {JobCategories.map((category,idx)=>{
                        return <option key={idx} value={category}>{category}</option>
                    })}
                </select>
            </div>

            <div>
                <p className='mb-2' >Job Location</p>
                <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>{setLocation(e.target.value)}}>
                    {JobLocations.map((Location,idx)=>{
                        return <option key={idx} value={Location}>{Location}</option>
                    })}
                </select>
            </div>

            <div>
                <p className='mb-2' >Job Level</p>
                <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>{setLevel(e.target.value)}}>
                    <option value="Beginner Level">Beginner Level</option>
                    <option value="Intermediate Level">Intermediate Level</option>
                    <option value="Senior Level">Senior Level</option>
                </select>
            </div>

        </div>

        <div>
            <p className='mb-2'>Job Salary</p>
            <input min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' type="Number" onChange={e=>{setSalary(e.target.value)}} value={salary} placeholder='2500'/>
        </div>

        <button className='w-28 py-3 mt-4 bg-black text-white rounded' >ADD</button>

       </form>
    )

}

export default AddJob
