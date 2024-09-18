import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../store/app-reducer";
import {ResponseType} from "../api/todolists-api";

export const handleServerAppError = <D> (data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))

    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}
export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}