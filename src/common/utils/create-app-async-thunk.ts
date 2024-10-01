import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppRootStateType } from "app/Store"
import { AppDispatch } from "common/hooks/useAppDispatch"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatch
  rejectValue: null
}>()
