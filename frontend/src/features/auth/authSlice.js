import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signupUser,
  loginUser,
  getUserProfile,
} from "../../services/authService";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUserProfileThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const signupUserThunk = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signupUser(userData);
      return {
        user: {
          _id: response._id,
          name: response.name,
          email: response.email,
        },
        token: response.token,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      return {
        user: {
          _id: response._id,
          name: response.name,
          email: response.email,
        },
        token: response.token,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await getUserProfile();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
