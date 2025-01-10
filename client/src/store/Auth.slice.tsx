import AxiosInstance from "@/api/axios";
import { APISuccessType, LoggedUserDataFromBackendType } from "@/lib/Types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

export interface AuthState {
  user: LoggedUserDataFromBackendType | null;
  isloading: boolean;
}

const initialState: AuthState = {
  user: null,
  isloading: false,
};
export const loginFn = createAsyncThunk("auth/login", async (token: string) => {
  try {
    const response = await AxiosInstance.get<APISuccessType<AuthState["user"]>>(
      `api/v1/auth/user/verify`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
    }
  }
});
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoggedUserDataFromBackendType>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginFn.pending, (state) => {
        state.isloading = true;
      })
      .addCase(loginFn.fulfilled, (state, action) => {
        state.user = action.payload?.data || null;
        state.isloading = false;
      })
      .addCase(loginFn.rejected, (state) => {
        state.user = null;
        state.isloading = false;
      });
  },
});
export const { login, logout } = AuthSlice.actions;
export default AuthSlice;
