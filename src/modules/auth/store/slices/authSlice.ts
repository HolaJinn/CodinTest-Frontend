import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { ILoginPayload } from "../../model";
import { loginService } from "../../services/authService";


  interface IAuthState {
    isLoggedIn: boolean;
    logging: boolean;
    token: String;
    error: boolean;
    message: string;
  }
  
  const initialState: IAuthState = {
    isLoggedIn: false,
    logging: false,
    token: "",
    error: false,
    message: "",
  };

  export const login = createAsyncThunk(
      "auth/login", 
      async(loginPayload: ILoginPayload, thunkAPI) => {
        try {
            const response = await loginService(loginPayload)
            return response;
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
      }
  )

const authSlice: Slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.logging = true
            state.error = false
        })
        builder.addCase(login.fulfilled, (state, {payload}) => {
            state.isLoggedIn = true
            state.logging = false
            state.token = payload.data.jwtToken
            state.error = false
            state.message = "You successfully logged in"
        })
        builder.addCase(login.rejected, (state, action:any) => {
            state.isLoggedIn = false
            state.logging = false
            state.token = ''
            state.error = true
            state.message = action.payload.message
        })
    }
})


export const authActions = authSlice.actions
export default authSlice.reducer