import { Alert, Button, Label, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function SignUp() {

    const [formData,setFormData] = useState({})
    const [errorMessage,setErrorMessage] = useState(null)
    const [loading,setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value.trim()})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!formData.username || !formData.email || !formData.password){
            setErrorMessage('All fields are required')
            return
        }
        try {
            const res = await fetch('/api/users/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json();
            if(data.message){
                setErrorMessage(data.message)
                return
            }
        } catch (error) {}
    }
  return (
    <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
            {/* left */}
            <div className='flex-1'>
            <Link to='/' className='font-bold  dark:text-white text-4xl'>
                <span className='px-2 py-1 bg-gradient-to-r from-red-600 via-red-300 to-orange-400 rounded-lg text-white'>Hadilao's</span>
            HotPot
                </Link>
            <p className='text-sm mt-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis amet expedita molestias, nulla eligendi cum molestiae quis? Culpa, cum quibusdam.</p>
            </div>
            {/* right */}
            <div className='flex-1' >
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div>
                        <Label value='Username' />
                        <TextInput type='text' placeholder='Username' id='username'  onChange={handleChange}/>
                    </div>
                    <div>
                        <Label value='Email' />
                        <TextInput type='email' placeholder='email@comp.com' id='email' onChange={handleChange} />
                    </div>
                    <div>
                        <Label value='Password' />
                        <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
                    </div>
                    <Button gradientDuoTone='purpleToBlue' type='submit'>Sign Up</Button>
                </form>
                <div className='flex gap-2 text-sm mt-5'>
                    <span>Have an account?</span>
                    <Link to='/signin' className='text-blue-500'>Sign In</Link>
                </div>
                {
                    errorMessage &&(
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default SignUp