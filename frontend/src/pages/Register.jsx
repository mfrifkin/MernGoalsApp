import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData;

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
