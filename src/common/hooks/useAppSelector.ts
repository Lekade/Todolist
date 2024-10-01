import { TypedUseSelectorHook, useSelector } from "react-redux"
import { AppRootStateType } from "app/Store"

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
