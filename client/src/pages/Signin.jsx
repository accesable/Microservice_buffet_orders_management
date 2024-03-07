import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { SignInStart,signInFailure,signInSuccess   } from '../redux/user/userSlice'
import { useDispatch,useSelector } from 'react-redux'

function Signin() {

    const [formData,setFormData] = useState({})
    const {loading, error: errorMessage} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value.trim()})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!formData.username ||  !formData.password){
            return dispatch(signInFailure('All fields are required'))
        }
        try {
            dispatch(SignInStart())
            const res = await fetch('/api/users/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json();
            if(data.message){
              dispatch(signInFailure(data.message))
                
            }
            if(res.ok){
              dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            dispatch(signInFailure(error.message))
        }
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
                        <Label value='Password' />
                        <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
                    </div>
                    <Button gradientDuoTone='purpleToBlue' type='submit' disabled={loading}>
                        {
                            loading ? (
                                <>
                                    <Spinner size='sm'/>
                                    <span className='pl-3'>Loading ...</span>
                                </>
                            ) : (
                                <span>Sign Up</span>
                            )
                        }
                    </Button>
                </form>
                <div className='flex gap-2 text-sm mt-5'>
                    <span>Don't have an account?</span>
                    <Link to='/signup' className='text-blue-500'>Sign Up</Link>
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

export default Signin