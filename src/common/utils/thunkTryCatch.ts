import { setAppStatus } from "app/app-slice"
import { handleServerNetworkError } from "common/utils/handle-server-network-error"
import { ThunkDispatch } from "redux-thunk"
import { AppRootStateType } from "app/Store"

/**
 * @typedef {Object} ThunkApi
 * @property {ThunkDispatch<AppRootStateType, unknown, any>} dispatch - A function to dispatch actions in Redux.
 * @property {function(): AppRootStateType} getState - A function to get the current application state from Redux.
 * @property {function(any): any} rejectWithValue - A function to reject with a given value.
 */

/**
 * A function to handle try/catch within a thunk, executing the provided logic and handling errors.
 *
 * @template T
 * @param {ThunkApi} thunkAPI - The API object provided by thunk.
 * @param {function(): Promise<T>} logic - The logic that will be executed asynchronously.
 * @returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>} The result of the logic execution or the rejected value in case of an error.
 */

type ThunkApi = {
  dispatch: ThunkDispatch<AppRootStateType, unknown, any>
  getState: () => AppRootStateType
  rejectWithValue: (value: any) => any
}

export const thunkTryCatch = async <T>(
  thunkAPI: ThunkApi,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setAppStatus({ status: "loading" }))
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(setAppStatus({ status: "idle" }))
  }
}
