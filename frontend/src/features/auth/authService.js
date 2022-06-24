import axios from 'axios';
 
const API_URL = '/api/users'
const HOST = 'localhost:5000' 
const urlString = 'http://localhost:5000/api/users'
const register = async (userData) =>{
    const response = await axios.post('http://localhost:5000/api/users', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData) =>{
    const response = await axios.post('http://localhost:5000/api/users/login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () =>{
    console.log('removing user')
    localStorage.removeItem('user')
}


const authService = {
    register,
    logout,
    login
}

export default authService;