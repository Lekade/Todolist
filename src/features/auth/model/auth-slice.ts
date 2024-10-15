import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit"
import { setIsInitialized } from "app/app-slice"
import { clearTodosData } from "features/todolistsList/model/todolists-slice"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { authAPI } from "features/auth/api/authAPI"
import { LoginParamsType } from "features/auth/api/authAPI.types"
import { ResultCode } from "common/enums"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isFulfilled(login, me, logout), (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const auth = authSlice.reducer
export const { selectIsLoggedIn } = authSlice.selectors

// thunks
export const login = createAppAsyncThunk<any, LoginParamsType>(
  `${authSlice.name}/login`,
  async (data, { rejectWithValue }) => {
    const res = await authAPI.login(data)
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true }
    }
    return rejectWithValue(res.data)
  },
)

export const me = createAppAsyncThunk<any, undefined>(`${authSlice.name}/me`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  const res = await authAPI.me().finally(() => dispatch(setIsInitialized({ isInitialized: true })))
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true }
  }
  return rejectWithValue(res.data)
})

export const logout = createAppAsyncThunk<any, undefined>(`${authSlice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  const res = await authAPI.logout()
  if (res.data.resultCode === ResultCode.Success) {
    dispatch(clearTodosData())
    return { isLoggedIn: false }
  }
  return rejectWithValue(res.data)
})
