import { verifyEmailService } from './../../services/authService';
import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";

interface IVerificationState {
    verifiying: boolean;
    success: boolean;
    error: boolean;
    message: string;
  }
  
  const initialState: IVerificationState = {
    verifiying: false,
    success: false,
    error: false,
    message: "",
  };

  export const verify = createAsyncThunk(
    "auth/verify", 
    async(code: string | null, thunkAPI) => {
      try {
          const response = await verifyEmailService(code)
          return response;
      } catch (error: any) {
          console.log(error)
          return thunkAPI.rejectWithValue(error)
      }
    }
)

  export const emailVerificationSlice: Slice = createSlice({
      name:"emailVerification",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
        builder.addCase(verify.pending, (state) => {
            state.verifiying = true
            state.success = false;
            state.error = false;
            state.message = ""
        }) 
        builder.addCase(verify.fulfilled, (state) => {
            state.verifiying = false
            state.success = true;
            state.error = false;
            state.message = "Your email is verified"
        }) 
        builder.addCase(verify.rejected, (state, action:any) => {
            state.verifiying = false
            state.success = false;
            state.error = true;
            state.message = action.payload
        }) 
      }
      
  })

  export const emailVerificationActions = emailVerificationSlice.actions
  export default emailVerificationSlice.reducer