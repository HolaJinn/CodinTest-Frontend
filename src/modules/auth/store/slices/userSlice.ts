import { getAuthenticatedUser } from './../../services/authService';
import { Role } from './../../../../models/Role';
import { IUser } from './../../../../models/User';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { UserState } from '../../../../models/UserState';

  
  const initialState = {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        photoUrl: "",
        userState: UserState.INACTIVE,
        verified: false,
        role: Role.UNDEFINED
      } as IUser
  };

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
        }) 
        builder.addCase(getCurrentUser.fulfilled, (state, action: any) => {
            console.log("Action>>", action)
            console.log("Payload>>", action.payload)
          state.user = action.payload.data
        })
    }
})


export default userSlice.reducer