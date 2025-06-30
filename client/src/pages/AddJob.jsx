import React, { useRef, useState,useEffect } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'

const AddJob=()=>{

    const [title,setTitle]=useState('')
    const [location,setLocation]=useState('Banglore')
    const [category,setCategory]=useState('Programming')
    const [level,setLevel]=useState('Beginner')
    const [salary,setSalary]=useState(0)
    
    const editorRef=useRef(null)
    const quillRef=useRef(null)

    useEffect(()=>{
        //Initiating quill only once
        if(!quillRef.current && editorRef.current){
            quillRef.current=new Quill(editorRef.current,{theme:'snow'})
        }
    },[])

    return (
       <form className='container p-4 flex flex-col w-full items-start gap-3'>

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
                <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>{setLocation(e.target.value)}}>
                    <option value="Beginner Level">Beginner Level</option>
                    <option value="Intermediate Level">Intermediate Level</option>
                    <option value="Senior Level">Senior Level</option>
                </select>
            </div>

        </div>

        <div>
            <p className='mb-2'>Job Salary</p>
            <input min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' type="Number" onChange={e=>{setSalary(e.target.value)}} placeholder='2500'/>
        </div>

        <button className='w-28 py-3 mt-4 bg-black text-white rounded' >ADD</button>

       </form>
    )

}

export default AddJob
