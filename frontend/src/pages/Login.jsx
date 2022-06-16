import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData;

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const {user, isLoading,isError,isSuccess,message} = useSelector((state)=>state.auth)

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
        },[user, isError, isSuccess, message, navigate, dispatch]) 

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

  
    const onSubmit = (e) =>{
        e.preventDefault()

        const userData = {
            email,
            password
         }
            dispatch(login(userData))
       
    }



    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
            </h1>
                <p>Please Login</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit} >
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
                        <button type=' submit' className='btn btn-block'>
                            Submit
                        </button>

                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
