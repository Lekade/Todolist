import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { AnyAction } from "redux"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
}

export type AppInitialStateType = typeof initialState

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = "failed"
        if (action.type === "auth/me/rejected") {
          return
        }
        if (action.payload) {
          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred"
        }
      })
  },
  selectors: {
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsInitialized: (state) => state.isInitialized,
  },
})

export const app = appSlice.reducer
export const { setIsInitialized, setAppError } = appSlice.actions
export const { selectAppStatus, selectAppError, selectIsInitialized } = appSlice.selectors
