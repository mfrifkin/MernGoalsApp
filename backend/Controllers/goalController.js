const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res)=>{
    //get goals of the user whose token is sent up
    const goals = await Goal.find({user: req.user.id }) 
    res.status(200).json(goals)
})

// @desc  set goal
// @route POST /api/goals/
// @access Private
const setGoal = asyncHandler(async (req, res)=>{
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id 
    });
    res.status(200).json(goal )
})

// @desc  update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res)=>{
    // get goal they want to update
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found');
    }

    //check for user
    //nb: already have user in the req for all protected routes
    // b/c it gets set in middleware
    if(!req.user){
        res.status(401)
         throw new Error('user not found ')
    }

    // make sure goal being fetched has the user id of the user
    // that is sending the request (goal.user is the userid of the user that created that goal)
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')

    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})

    console.log(updatedGoal)
    res.status(200).json(updatedGoal);
})


// @desc  delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res)=>{
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found');
    }
 

    //check for user
    if(!req.user){
        res.status(401)
         throw new Error('user not found ')
    }

    // make sure goal being fetched has the user id of the user
    // that is sending the request (goal.user is the userid of the user that created that goal)
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')

    }
    
    await goal.remove()
    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal

}