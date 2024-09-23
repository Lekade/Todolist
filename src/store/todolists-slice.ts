import { todolistsApi, TodolistType } from "api/todolists-api"
import { Dispatch } from "redux"
import { RequestStatusType, setAppStatus } from "store/app-slice"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const todolistsSlice = createSlice({
  name: "todos",
  initialState: [] as TodolistDomainType[],
  reducers: {
    setTodolists: (state, action: PayloadAction<{ todos: TodolistType[] }>) => {
      return action.payload.todos.map((todo) => ({ ...todo, filter: "all", entityStatus: "idle" }))
    },
    AddTodolist: (state, action: PayloadAction<{ todo: TodolistType }>) => {
      state.unshift({ ...action.payload.todo, filter: "all", entityStatus: "idle" })
    },
    RemoveTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    ChangeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    },
    ChangeTodolistFilter: (
      state,
      action: PayloadAction<{
        id: string
        filter: FilterValuesType
      }>,
    ) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{
        id: string
        entityStatus: RequestStatusType
      }>,
    ) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].entityStatus = action.payload.entityStatus
      }
    },
    clearTodosData: (state, action: PayloadAction) => {
      return []
    },
  },
  selectors: {
    selectTodos: (state) => state,
  },
})

export const todos = todolistsSlice.reducer
export const {
  setTodolists,
  AddTodolist,
  RemoveTodolist,
  ChangeTodolistTitle,
  ChangeTodolistFilter,
  changeTodolistEntityStatus,
  clearTodosData,
} = todolistsSlice.actions

export const { selectTodos } = todolistsSlice.selectors

export const getTodolists = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .getTodolist()
    .then((res) => {
      dispatch(setTodolists({ todos: res.data }))
      dispatch(setAppStatus({ status: "succeeded" }))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const removeTodolist = (id: string) => (dispatch: Dispatch) => {
  dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .deleteTodo(id)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(changeTodolistEntityStatus({ id, entityStatus: "succeeded" }))
        dispatch(RemoveTodolist({ id }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(changeTodolistEntityStatus({ id, entityStatus: "failed" }))
    })
}

export const addTodolist = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .createTodo(title)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(AddTodolist({ todo: response.data.data.item }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const ChangeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
  dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .updateTodo(id, title)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(ChangeTodolistTitle({ id, title }))
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(changeTodolistEntityStatus({ id, entityStatus: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(changeTodolistEntityStatus({ id, entityStatus: "failed" }))
    })
}
