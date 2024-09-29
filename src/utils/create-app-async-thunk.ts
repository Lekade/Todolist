import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch, AppRootStateType } from "store/Store"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatch
  rejectValue: null
}>()
