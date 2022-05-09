import { getAuthenticatedUser } from './../../services/authService';
import { Role } from './../../../../models/Role';
import { IUser } from './../../../../models/User';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { UserState } from '../../../../models/UserState';
import { boolean } from 'yup';

  interface IUserSliceState {
    isLoading: boolean,
    success: boolean,
    error: boolean,
    errorMessage: string,
    user?: IUser;
  }

  const initialState: IUserSliceState = {
    isLoading: false,
    success: false,
    error: false,
    errorMessage: "",
    user: undefined,
  }

  
  // const initialState = {
  //     user: {
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       photoUrl: "",
  //       userState: UserState.INACTIVE,
  //       verified: false,
  //       role: Role.UNDEFINED
  //     } as IUser
  // };

  export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async() => {
      try {
        const response = await getAuthenticatedUser()
        console.log(response)
        return response;
      } catch(error: any) {
        console.log(error)
      }
    }
  )

const userSlice: Slice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true
            state.error = false
            state.success = false
            state.errorMessage = ""
        }) 
        builder.addCase(getCurrentUser.fulfilled, (state, action: any) => {
          state.isLoading = false
          state.error = false
          state.success = true
          state.user = action.payload.data
          console.log(action.payload.data)
          localStorage.setItem("user", JSON.stringify(action.payload.data))
        })
        builder.addCase(getCurrentUser.rejected, (state, action: any) => {
          state.isLoading = false
          state.error = true
          state.success = false
          state.errorMessage = action.payload.message
        })
    }
})


export default userSlice.reducer