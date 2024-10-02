import { tasks } from "features/todolistsList/model/tasks-slice"
import { todos } from "features/todolistsList/model/todolists-slice"
import { app } from "app/app-slice"
import { auth } from "features/auth/model/auth-slice"
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

export type AppRootStateType = ReturnType<typeof store.getState>
