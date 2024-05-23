const express = require('express')
const { careateWorkout, getWorkout, getWorkouts ,deleteWorkout, updateworkout } = require('../controllers/workoutController')


const router = express.Router()

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', careateWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateworkout)

module.exports = router