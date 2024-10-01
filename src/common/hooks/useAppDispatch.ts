import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { useDispatch } from "react-redux"
import { AppRootStateType } from "app/Store"

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch = useDispatch<AppDispatch>
