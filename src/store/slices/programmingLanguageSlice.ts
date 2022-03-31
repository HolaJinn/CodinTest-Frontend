import { getAllProgrammingLanguagesService } from './../../modules/CompanyDashboard/services/dashboardServices';
import { ProgrammingLanguage } from './../../models/ProgrammingLanguage';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";

interface IProgrammingLanguageState {
    isFetching: Boolean,
    success: Boolean,
    error: Boolean
    errorMessage: String
    list: ProgrammingLanguage[]
}

const initialState: IProgrammingLanguageState = {
    isFetching: false,
    success: false,
    error: false,
    errorMessage: "",
    list: []
}

export const fetchProgrammingLanguages = createAsyncThunk(
    "programmingLanguages/fetch",
    async() => {
        try {
            const response = await getAllProgrammingLanguagesService()
            return response
        } catch(error: any) {
            console.log(error)
        }
    }
)


const programmingLanguageSlice: Slice = createSlice({
    name: "programmingLanguage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProgrammingLanguages.pending, (state) => {
            state.isFetching = true
            state.success = false
            state.error = false
            state.errorMessage = ""
            state.list = []
        })
        builder.addCase(fetchProgrammingLanguages.fulfilled, (state, action: any) => {
            state.isFetching = false
            state.success = true
            state.error = false
            state.errorMessage = ""
            state.list = action.payload.data
        })
        builder.addCase(fetchProgrammingLanguages.rejected, (state, action: any) => {
            state.isFetching = false
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
            state.list = []
        })
    }
})

export default programmingLanguageSlice.reducer