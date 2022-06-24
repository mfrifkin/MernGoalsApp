import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {fetchGoals, reset} from '../features/goals/goalsSlice'
import Spinner from '../components/Spinner'
import GoalForm from '../components/GoalForm'
import GoalDisplay from '../components/GoalDisplay'

function Dashboard() {

    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const {isError, message, goals, isLoading} = useSelector((state)=>state.goals)


    // useEffect(() => {
    //     if (isError) {
    //       console.log(message)
    //     }
    
    //     if (!user) {
    //       navigate('/login')
    //     }
    
    //     dispatch(getGoals())
    
    //     return () => {
    //       dispatch(reset())
    //     }
    //   }, [user, navigate, isError, message, dispatch])
    

    useEffect(()=>{
        if(user===null){
            navigate('/login')
        }
        
        dispatch(fetchGoals())
        return ()=>{
            dispatch(reset())
        }
    },[user, dispatch,navigate])


    const goalItems = goals.map((goal)=>
    <GoalDisplay   key = {goal._id} goal={goal}/>
    );

    if(isLoading){
        return <Spinner/>
    }

    return (
        <>
        <section className='heading'>
            <h1>Welcome {user && user.name}</h1>
            <p>Goals Dashboard</p>
         </section>
        <section /*lassName='content'*/>
            <div>
                <GoalForm/>
                {goalItems}
                
            </div>

        </section>
    
        </>
    )
}

export default Dashboard
