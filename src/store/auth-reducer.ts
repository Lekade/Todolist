import {Dispatch} from 'redux'
import {SetAppErrorAT, setAppStatusAC, SetAppStatusAT, setIsInitializedAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {clearTodosDataAC} from "./todolists-reducer";

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) =>
    ({type: 'AUTH/SET-IS-LOGGED-IN', payload: {isLoggedIn}}) as const

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const meTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
            handleServerAppError(res.data, dispatch)
        }
        dispatch(setIsInitializedAC(true))
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI
        .logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(clearTodosDataAC())
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export type SetIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>

// types
type ActionsType =
    | SetIsLoggedInAT
    | SetAppStatusAT
    | SetAppErrorAT

