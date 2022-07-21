import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "../../services/goalService";

const initialState = {
    goals: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

//get user goals
export const getGoals = createAsyncThunk(
    "goals/getAllGoals",
    async (_, thunkAPI) => {
        // console.trace("Get Goals");
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.getUserGoals(token);
        } catch (error) {
            const message =
                error.response.data.message ||
                error.message ||
                "Unable to get user goals";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// create new goals
export const createGoal = createAsyncThunk(
    "goals/create",
    async (goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.createUserGoal(goalData, token);
        } catch (error) {
            const message =
                error.response.data.message ||
                error.message ||
                "Error occured please try again.";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// delete goals
export const deleteGoal = createAsyncThunk(
    "goals/delete",
    async (goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.deleteUserGoal(goalData, token);
        } catch (error) {
            const message =
                error.response.data.message ||
                error.message ||
                "Error occured please try again.";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers: {
        reset: (state) => (state = initialState),
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = state.goals.filter((goal) => {
                    return goal._id !== action.payload.id;
                });
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
