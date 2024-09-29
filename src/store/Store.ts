import { tasks } from "store/tasks-slice"
import { todos } from "store/todolists-slice"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { app } from "store/app-slice"
import { auth } from "store/auth-slice"
import { combineSlices, configureStore } from "@reduxjs/toolkit"

export const rootReducer = combineSlices({
  app,
  todos,
  tasks,
  auth,
})

export const store = configureStore({
  reducer: rootReducer,
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
