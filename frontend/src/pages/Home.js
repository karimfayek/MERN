import  { useEffect , useState} from 'react'
import WorkoutForm from '../components/WorkoutForm'
import Navbar from '../components/Navbar'

import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import CategoryList from '../components/CategoryList'
import AddCategoryForm from '../admin/AddCategoryForm'


const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts')
      const json = await response.json()
      
      console.log(json)
      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS' , payload:json})
      }
    }
    fetchWorkouts()
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/api/workouts/${id}` ,{
      method : 'DELETE'
    })
    const json = await response.json

    if(!response.ok){
      setError(json.error)
      console.log(json.error)
  }
  if(response.ok){
    dispatch( {type:'DELETE_WORKOUT' , payload: id} ) 
    console.log('dispatched')
  }
}
  
  return (
    <>
      <div className='body'>

        <h1>Home Page </h1>
        <AddCategoryForm />
        <CategoryList />
        <WorkoutForm />
        <ul>
          {workouts && workouts.map((workout) => (
            <li key={workout._id}>{workout.title} <span onClick={ () => handleDelete(workout._id) }>delete</span></li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default Home