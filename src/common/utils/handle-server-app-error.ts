import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "app/app-slice"
import { BaseResponseType } from "common/types/BaseResponseType"

/**
 * Handles server application errors by dispatching actions to set error and status.
 *
 * @template D - The type of data in the BaseResponseType.
 * @param {BaseResponseType<D>} data - The server response object containing error messages.
 * @param {Dispatch} dispatch - The Redux dispatch function.
 * @param {boolean} [showError=true] - Flag to control whether the error message should be displayed.
 *
 * @returns {void} This function does not return anything.
 */

export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch, showError: boolean = true) => {
  if (showError) {
    const error = data.messages.length ? { error: data.messages[0] } : { error: "Some error occurred" }
    dispatch(setAppError(error))
  }
  dispatch(setAppStatus({ status: "failed" }))
}
