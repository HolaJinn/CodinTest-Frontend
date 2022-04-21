import { IRecruiterRegisterRequest } from './../../models/index';
import { addRecruiterService } from './../../services/dashboardServices';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";

interface IAddRecruiterState {
    isAdding: boolean,
    success: boolean,
    error: boolean,
    message: string
}

const initialState: IAddRecruiterState = {
    isAdding: false,
    success: false,
    error: false,
    message: ""
}

export const addRecruiter = createAsyncThunk(
    "recruiter/add",
    async(request: IRecruiterRegisterRequest, thunkAPI) => {
        try {
            const reponse = await addRecruiterService(request)
            return reponse
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const addRecruiterSlice: Slice = createSlice({
    name: "addRecruiter",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addRecruiter.pending, (state) => {
            state.isAdding = true
            state.success = false
            state.error = false
            state.message = ""
        })
        builder.addCase(addRecruiter.fulfilled, (state, action: any) => {
            state.isAdding = false
            state.success = true
            state.error = false
            state.message = "New recruiter is added"
        })
        builder.addCase(addRecruiter.rejected, (state, action: any) => {
            state.isAdding = false
            state.success = false
            state.error = true
            state.message = action.payload.message
        })
    }
})

export default addRecruiterSlice.reducer
