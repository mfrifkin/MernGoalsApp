const express = require('express');
const router = express.Router();
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../Controllers/goalController')

// this router object now handles the requests that app sends
// from server.js, this allows neater code and more scalability
// nb: we only need one slash because the app.use() statement in 
// server.js has already matched the /api/goals url
router.route('/').get(getGoals).post(setGoal)

router.route('/:id').put(updateGoal).delete (deleteGoal)


//module in module.exports allows a function to be exported from this file
module.exports = router