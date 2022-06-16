import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


//register user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()
            //this line corresponds to the register.rejected case
            //this is the line that sends the action with a payload as
            // message
        return thunkAPI.rejectWithValue(message)


    }
})

//login user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()
            //this line corresponds to the register.rejected case
            //this is the line that sends the action with a payload as
            // message
        return thunkAPI.rejectWithValue(message)


    }
})

export const logout = createAsyncThunk('auth/logout', 
 async ()=>{
    await authService.logout
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ' '

        }
    },

    extraReducers: (builder) => {
        // redux toolkit will go tho the pending, fulfilled, and rejected case for
        // our register function automatically, it handles this all for us 
        // this is why redux tool kit is nice
        builder
        .addCase(register.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess=true
            state.user = action.payload
        })
        .addCase(register.rejected, (state,action) =>{
            state.isLoading=false
            state.isError = true
            state.message = action.payload 
            state.user = null
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user = null;
        })
        .addCase(login.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess=true
            state.user = action.payload
        })
        .addCase(login.rejected, (state,action) =>{
            state.isLoading=false
            state.isError = true
            state.message = action.payload 
            state.user = null
        })
     }
})


export const { reset } = authSlice.actions;
export default authSlice.reducer;
