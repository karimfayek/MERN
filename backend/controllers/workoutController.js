const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get single worlout 
const getWorkout = async (req , res) =>{
    
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'not valid id'})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }else{
        
        res.status(200).json(workout)
    }
}

// get all workouts 
const getWorkouts = async (req , res) =>{
    const workouts = await Workout.find({}).sort({createdAt : -1})
    
    res.status(200).json(workouts)
}

//create 
const careateWorkout = async (req , res) => {
    const {title, load, reps} = req.body
  
    try {
      const workout = await Workout.create({title, load, reps})
      res.status(200).json(workout)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}
//update  single worlout 
const updateworkout = async (req , res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'not valid id'})
    }
    const workout = await Workout.findOneAndUpdate({_id: id } , {
        ...req.body
    })
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}
//delete  single worlout 
const deleteWorkout = async (req , res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'not valid id'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}



module.exports ={
    getWorkout,
    getWorkouts,
    careateWorkout,
    deleteWorkout,
    updateworkout
}