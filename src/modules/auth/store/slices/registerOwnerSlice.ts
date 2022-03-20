import { IOwnerRegistrationPayload } from './../../model/index';
import { registerOwnerService } from './../../services/authService';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";


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

  export const registerOwner = createAsyncThunk(
      "auth/owner/register", 
      async(registrationPayload: IOwnerRegistrationPayload, thunkAPI) => {
        try {
            const response = await registerOwnerService(registrationPayload)
            return response;
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
      }
  )

const registerOwnerSlice: Slice = createSlice({
    name: "registerOwner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerOwner.pending, (state) => {
            state.registering = true
            state.success = false
            state.error = false
            state.message = ""
        })
        builder.addCase(registerOwner.fulfilled, (state, {payload}) => {
            state.registering = false
            state.success = true
            state.error = false
            state.message = "You successfully registered. You will recieve a verification email."
        })
        builder.addCase(registerOwner.rejected, (state, action:any) => {
            state.registering = false
            state.success = false
            state.error = true
            state.message = action.payload.message
        })
    }
})


export const registerOwnerActions = registerOwnerSlice.actions
export default registerOwnerSlice.reducer