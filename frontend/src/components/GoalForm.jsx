import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createGoal} from '../features/goals/goalsSlice'
import {toast} from 'react-toastify'
function GoalForm() {

    const dispatch = useDispatch();

    const onSubmit =(e)=>{
        e.preventDefault()
        if(goal){
            dispatch(createGoal(goal))
        }
        else{
            toast.error('please add text to create a goal')
        }
       
    }


    const [goal, setGoal] = useState('')
    const [placeHolder, setPlaceHolder] = useState('Add a Goal')

    return (
        <section >
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='text'>Goal</label>
            <input
              type='text'
              name='text'
              id='text'
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block' type='submit'>
              Add Goal
            </button>
          </div>
        </form>
      </section>
    ) 
}

export default GoalForm
