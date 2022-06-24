import axios from 'axios';
 
const API_URL = '/api/goals'
const HOST = 'localhost:5000' 
const urlString = 'http://localhost:5000/api/goals/'

const fetchGoals = async (token) =>{
    //const token = JSON.parse(localStorage.getItem('user'))['token'] 
   
    const headers = {
        authorization:`Bearer  ${token}`
    }
    const response = await axios.get('http://localhost:5000/api/goals', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

    return response.data
}

const createGoal = async (goalText, token) =>{

    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.post(urlString, {text: goalText}, config)
    
      return response.data
}

const deleteGoal = async (goalId, token) =>{

  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.delete(urlString+goalId, config)
  
    return response.data
}


const goalsService = {
    fetchGoals,
    createGoal,
    deleteGoal
}

export default goalsService;
    