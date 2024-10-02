import axios, { AxiosError } from "axios"
import { setAppError, setAppStatus } from "app/app-slice"
import { Dispatch } from "redux"

/**
 * Handles network errors by determining the type of error and dispatching actions to set error and status.
 *
 * @param {unknown} err - The error object, which could be an AxiosError, a native Error, or another type.
 * @param {Dispatch} dispatch - The Redux dispatch function.
 *
 * @returns {void} This function does not return anything.
 */

export const handleServerNetworkError = (err: unknown, dispatch: Dispatch): void => {
  let errorMessage = "Some error occurred"
  // Проверка на наличие axios ошибки
  if (axios.isAxiosError(err)) {
    // err.response?.data?.message - например получение тасок с невалидной todolistId
    // err?.message - например при создании таски в offline режиме
    errorMessage = err.response?.data?.message || err?.message || errorMessage
    // Проверка на наличие нативной ошибки
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
    // Какой-то непонятный кейс
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(setAppError({ error: errorMessage }))
  dispatch(setAppStatus({ status: "failed" }))
}
