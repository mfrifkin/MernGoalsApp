
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalsSlice'
import {useEffect} from 'react'
function GoalDisplay({ goal }) {
  const dispatch = useDispatch()

useEffect(() => {
  console.log(`goal: ${goal.text} rendered`)

}, [])  
  //btn: onClick={() => dispatch(deleteGoal(goal._id))}
  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button  onClick={()=>dispatch(deleteGoal(goal._id))}className='close'>
        X
      </button>
    </div>
  )
}

export default GoalDisplay