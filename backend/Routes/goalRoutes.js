const express = require('express');
const router = express.Router();
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../Controllers/goalController.js')
const {protect} = require('../middleware/authMiddleware')
// this router object now handles the requests that app sends
// from server.js, this allows neater code and more scalability
// nb: we only need one slash because the app.use() statement in 
// server.js has already matched the /api/goals url
router.route('/').get(protect, getGoals).post(protect, setGoal)

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)


//module in module.exports allows a function to be exported from this file
module.exports = router