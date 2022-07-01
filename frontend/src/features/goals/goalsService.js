import axios from 'axios';
 
const API_URL = '/api/goals/'

const fetchGoals = async (token) =>{
    //const token = JSON.parse(localStorage.getItem('user'))['token'] 
   
    const headers = {
        authorization:`Bearer  ${token}`
    }
    const response = await axios.get(API_URL, {
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
      const response = await axios.post(API_URL, {text: goalText}, config)
    
      return response.data
}

const deleteGoal = async (goalId, token) =>{

  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.delete(API_URL+goalId, config)
  
    return response.data
}

const updateGoal = async (goalId, token, text) =>{

  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.put(API_URL+goalId,{text:text}, config)
  
    return response.data
}


const goalsService = {
    fetchGoals,
    createGoal,
    deleteGoal,
    updateGoal
}

export default goalsService;
    