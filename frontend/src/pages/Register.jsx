import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
// use selector allows you to gran stuff from state,
//use dispatch allows you to alter the state
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    // destructuring state held data for use in onSubmit
    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // all these objects are brought down from global state with this selector
    // statement, its being destructured as well which makes it look more 
    // confusing
    const {user, isLoading,isError,isSuccess,message} = useSelector((state)=>state.auth)
           //state.auth tells it which part of the global state
           // to look in 
           
    const onChange = (e) => {
        // state updates are asynchronous and batched, so you cant rely
        // on this.state... to be what you think it ought to be, passing in 
        // a function fixes this, the first param is the previous state,
        // second is previous prop
        setFormData((prevState)=>({
            //this udates form data, copying previous values over,
            // and setting changed fields to their new updated values
            ...prevState,
            [e.target.name]: e.target.value

        }))

    }

    useEffect(()=>{
        //if isError became true show an error message
        if (isError){
            toast.error(message)
        }

        // in this case we need to log the user in
        if(isSuccess || user){
            // is the dashboard url
             navigate('/')
        }

        // reset all fields stored in the store to false, so its fresh next 
        // time a user might try to register
        dispatch(reset())
    // this array here is a list of dependencies that will 
    // trigger useEffect when changed or used
    // user, isError, isSuccess, message are all set in the 
    // authslice extrareducers, redux manages their updates and here we 
    // are using the ways in which they might change after a register call
    // to keep this page updates
    },[user, isError, isSuccess, message, navigate, dispatch]) 

    const onSubmit = (e) =>{
        e.preventDefault()

        if(password !== password2){
            toast.error('Passwprds do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }

       
    }

    if(isLoading){
        return <Spinner/>
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
            </h1>
                <p>Please Create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit} >
                    <div className='form-group'>
                        <input type="text"
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            placeholder='Enter your name'
                            onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input type="text"
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input type="text"
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter your password'
                            onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input type="text"
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
                            placeholder='Confirm password'
                            onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <button type=' submit' className='btn btn-block'>
                            Submit
                        </button>

                    </div>
                </form>
            </section>
        </>
    )
}

export default Register
