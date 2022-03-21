import { registerService } from './../../services/authService';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { IRegistrationPayload } from "../../model";


interface IRegistrationState {
    registering: boolean;
    success: boolean;
    error: boolean;
    message: string;
  }
  
  const initialState: IRegistrationState = {
    registering: false,
    success: false,
    error: false,
    message: "",
  };

  export const register = createAsyncThunk(
      "auth/register", 
      async(registrationPayload: IRegistrationPayload, thunkAPI) => {
        try {
            const response = await registerService(registrationPayload)
            return response;
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
      }
  )

const registerSlice: Slice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.registering = true
            state.success = false
            state.error = false
            state.message = ""
        })
        builder.addCase(register.fulfilled, (state, {payload}) => {
            state.registering = false
            state.success = true
            state.error = false
            state.message = "You successfully registered. You will recieve a verification email."
        })
        builder.addCase(register.rejected, (state, action:any) => {
            state.registering = false
            state.success = false
            state.error = true
            state.message = action.payload.message
        })
    }
})


export const registerActions = registerSlice.actions
export default registerSlice.reducer