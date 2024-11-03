import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{isLoggedIN:false},
    reducers:{
        login(state){
            state.isLoggedIN=true
        },
        logout(state){
            localStorage.removeItem('userId')
            state.isLoggedIN=false
        }
    }
})

export const authActions=authSlice.actions

export const store=configureStore({
    reducer:authSlice.reducer
})