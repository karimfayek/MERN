import { useEffect, useState } from 'react'
import WorkoutForm from '../components/WorkoutForm'

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
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }
    fetchWorkouts()
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
      method: 'DELETE'
    })
    const json = await response.json

    if (!response.ok) {
      setError(json.error)
      console.log(json.error)
    }
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: id })
      console.log('dispatched')
    }
  }

  return (
    <>

      <div class="homescreen-container">
        <div class="container">
          <section id="page-header">
            <div class="splash-screen-container">
              <div class="row">
                <div class="col-12 col-md-10 col-lg-6 offset-lg-2 offset-md-1">
                  <h1 class="page-title h2 mb-1">
                    Find the perfect <br /> professional for you
                  </h1>
                  <h4 class="text-light-grey mb-4">
                    Get free quotes within minutes
                  </h4>
                </div>
              </div>
              <form id="project-create-form" autocomplete="off" method="post" action="/find/">

                <div class="row">
                  <div class="col-12 col-md-10 col-lg-8 offset-lg-2 offset-md-1 create-frm-container">
                    <div class="d-flex flex-row justify-content-start section-padding">
                      <div class="d-flex flex-row input-and-btn-row w-100">
                        <div class="large-split-input d-flex ">
                          <div class="d-flex input-group left-input">
                            <input type="text" autocomplete="off" name="category_name" id="category_name" value="" class="form-control category-input-v2" placeholder="What service are you looking for?" />
                              <input type="hidden" name="category_id" id="category_id" value="" />
                                <input type="hidden" name="bark_mode" id="bark_mode" value="home"/>
                                  <input type="hidden" name="category_name_hidden" id="category_name_hidden" value=""/>
                                  </div>
                                  <div class="input-group icon-left right-input align-items-center full-postcode-input">
                                    <span class="py-2 pl-2 pr-2 locicon">
                                      <img alt="" width="20" height="20" title="" data-src="https://d18jakcjgoan9.cloudfront.net/s/img/icons/icon-locationmarker.png!d=rNqfn" data-srcset="https://d18jakcjgoan9.cloudfront.net/s/img/icons/icon-locationmarker.png!d=rNqfn 1x, https://d18jakcjgoan9.cloudfront.net/s/img/icons/icon-locationmarker.png!d=5GOHq 2x" class="lazy loaded" srcset="https://d18jakcjgoan9.cloudfront.net/s/img/icons/icon-locationmarker.png!d=rNqfn 1x, https://d18jakcjgoan9.cloudfront.net/s/img/icons/icon-locationmarker.png!d=5GOHq 2x" src="https://d18jakcjgoan9.cloudfront.net/s/img/icons/icon-locationmarker.png!d=rNqfn" data-was-processed="true"/>
                                    </span>
                                    <input type="text" class="form-control pl-0 postcode-input-v2" autocomplete="off" placeholder="Postcode" name="postcode" id="postcode"/>
                                      <input type="hidden" name="postcode_id" id="postcode_id" value="" />
                                        <input type="hidden" name="postcode_type" id="postcode_type" value=""/>
                                        </div>
                                      </div>
                                      <div class="pl-2 d-flex align-items-center search-button desktop-only">
                                        <div class="btn btn-primary large-btn" id="bark_submit">Search</div>
                                      </div>
                                      <div class="pl-2 d-flex align-items-center search-button mobile-only">
                                        <div class="d-flex btn btn-primary large-btn-mobile js-search-professional-mobile"><img src="https://d18jakcjgoan9.cloudfront.net/s/img/images/icons/magnifier-mobile.png!d=5K1So" alt="" width="19" height="19" /></div>
                                      </div>
                                  </div>
                                </div>
                                <div class="d-flex flex-column align-items-left">
                                  <div style={{display:"none" }} id="category_error" class="error py-2"></div>
                                  <div style={{display:"none" }} id="postcode_error" class="error py-2"></div>
                                </div>
                                <div class="py-3">
                                  <p class="text-xs-14 text-light-grey">
                                    <span class="text-light-grey">Popular:</span>
                                    <span data-caid="1212" class="carousel-link cursor-pointer">House Cleaning</span>,                                            <span data-caid="1505" class="carousel-link cursor-pointer">Web Design</span>,                                            <span data-caid="74" class="carousel-link cursor-pointer">Personal Trainers</span>                                    </p>
                                </div>
                              </div>
                          </div>
                        </form>
                      </div>
                    </section>
                  </div>
                </div>
                <div className='body'>

        <h1>Home Page </h1>
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