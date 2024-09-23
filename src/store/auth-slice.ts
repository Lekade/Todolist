import { Dispatch } from "redux"
import { authAPI, LoginParamsType } from "api/todolists-api"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { setAppStatus, setIsInitialized } from "store/app-slice"
import { clearTodosData } from "store/todolists-slice"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const auth = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authAPI
    .login(data)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const meTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
      dispatch(setIsInitialized({ isInitialized: true }))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(clearTodosData())
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
