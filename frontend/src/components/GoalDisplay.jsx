
import { useDispatch } from 'react-redux'
import { deleteGoal, updateGoal } from '../features/goals/goalsSlice'
import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'


function GoalDisplay({ goal }) {

  const [isEditing, setIsEditing] = useState(false)
  const [localGoal, setLocalGoal] = useState(goal)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(`goal: ${goal.text} rendered`)

  }, [])

  // toggles edit mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev)
  }

  const cancelEdit = () => {
    // setIsEditing back to false
    toggleEdit()

    //reset local state
    setLocalGoal(goal)

  }

  const save = (e) => {
    e.preventDefault()
    toggleEdit()
    console.log('saved')
    if (localGoal.text !== goal.text) {
      //dispatch update call
      dispatch(updateGoal({ goalId: goal._id, text: localGoal.text }))
    }


  }

  const onChange = (e) => {
    // state updates are asynchronous and batched, so you cant rely
    // on this.state... to be what you think it ought to be, passing in 
    // a function fixes this, the first param is the previous state,
    // second is previous prop
    setLocalGoal((prevState) => ({
      //this udates form data, copying previous values over,
      // and setting changed fields to their new updated values
      ...prevState,
      text: e.target.value

    }))

  }
  console.log(isEditing)
  //btn: onClick={() => dispatch(deleteGoal(goal._id))}
  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      {isEditing ?
        (<form className = 'edit-form' onSubmit={save}>
          <input
            type='text'
            name='text'
            id='text'
            value={localGoal.text}
            onChange={onChange}
          />
          <input type='submit' value='save' />
          <button onClick={cancelEdit}>cancel</button>
        </form>)
        : (<h2>{goal.text}</h2>)}

      <div className='close buttons'>
        {!isEditing &&
          <button className = 'smallBtn'>
            <FaEdit onClick={toggleEdit} />
          </button>}
          <button className = 'smallBtn' onClick={() => dispatch(deleteGoal(goal._id))}>
            X
          </button>

      </div>
    </div>
  )
}

export default GoalDisplay