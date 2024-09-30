import { Dispatch } from "redux"
import { authAPI, LoginParamsType } from "api/todolists-api"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice } from "@reduxjs/toolkit"
import { setAppStatus, setIsInitialized } from "store/app-slice"
import { clearTodosData } from "store/todolists-slice"
import { createAppAsyncThunk } from "utils/create-app-async-thunk"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const auth = authSlice.reducer
export const {} = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors

// thunks
export const login = createAppAsyncThunk<any, LoginParamsType>(`${authSlice.name}/login`, async (data, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setAppStatus({ status: "loading" }))
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatus({ status: "succeeded" }))
      return { isLoggedIn: true }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

export const me = createAppAsyncThunk<any, undefined>(`${authSlice.name}/me`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  } finally {
    dispatch(setIsInitialized({ isInitialized: true }))
  }
})

export const logout = createAppAsyncThunk<any, undefined>(`${authSlice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setAppStatus({ status: "loading" }))
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(clearTodosData())
      dispatch(setAppStatus({ status: "succeeded" }))
      return { isLoggedIn: false }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})
