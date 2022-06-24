import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalsService from './goalsService'
const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async (user, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.fetchGoals(token)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()
            //this line corresponds to the register.rejected case
            //this is the line that sends the action with a payload as
            // message
        return thunkAPI.rejectWithValue(message)


    }
})

export const createGoal = createAsyncThunk('goals/createGoal', async ( goalText, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.createGoal(goalText, token)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()
            //this line corresponds to the register.rejected case
            //this is the line that sends the action with a payload as
            // message
        return thunkAPI.rejectWithValue(message)


    }
})

//delete a goal
export const deleteGoal = createAsyncThunk('goals/deleteGoal', async ( goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.deleteGoal(goalId, token)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()
            //this line corresponds to the register.rejected case
            //this is the line that sends the action with a payload as
            // message
        return thunkAPI.rejectWithValue(message)


    }
})


export const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ' '
            state.goals = []

        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchGoals.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchGoals.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess=true
            state.goals = action.payload
        })
        .addCase(fetchGoals.rejected, (state,action) =>{
            state.isLoading=false
            state.isError = true
            state.message = action.payload 
        })
        .addCase(createGoal.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createGoal.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess=true
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected, (state,action) =>{
            state.isLoading=false
            state.isError = true
            state.message = action.payload 
        })
        .addCase(deleteGoal.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(deleteGoal.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess=true
            //console.log(`filtering ${ state.goals.filter((goal)=>goal._Id!==action.payload._id)}`)
            state.goals = state.goals.filter((goal)=>goal._id!==action.payload.id)
        })
        .addCase(deleteGoal.rejected, (state,action) =>{
            state.isLoading=false
            state.isError = true
            state.message = action.payload 
        })
     }
})

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;