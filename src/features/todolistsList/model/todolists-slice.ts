import { todolistsAPI, TodolistType } from "features/todolistsList/api/todolists-api"
import { RequestStatusType, setAppStatus } from "app/app-slice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { ResultCode } from "common/enums"
import { thunkTryCatch } from "common/utils/thunkTryCatch"

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const todosSlice = createSlice({
  name: "todos",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (
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
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        return action.payload.todos.map((todo) => ({ ...todo, filter: "all", entityStatus: "idle" }))
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todo, filter: "all", entityStatus: "idle" })
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
  },
})

export const todos = todosSlice.reducer
export const { changeTodolistFilter, changeTodolistEntityStatus, clearTodosData } = todosSlice.actions

export const getTodos = createAppAsyncThunk<{ todos: TodolistType[] }, undefined>(
  `${todosSlice.name}/getTodos`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsAPI.getTodolist()
      dispatch(setAppStatus({ status: "succeeded" }))
      return { todos: res.data }
    })
  },
)

export const addTodolist = createAppAsyncThunk<{ todo: TodolistType }, string>(
  `${todosSlice}/addTodolist`,
  async (title, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsAPI.createTodo(title)
      if (res.data.resultCode === ResultCode.Success) {
        return { todo: res.data.data.item }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  },
)
export const removeTodolist = createAppAsyncThunk<{ id: string }, string>(
  `${todosSlice.name}/removeTodolist`,
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
      const res = await todolistsAPI.deleteTodo(id)
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(changeTodolistEntityStatus({ id, entityStatus: "succeeded" }))
        return { id }
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(changeTodolistEntityStatus({ id, entityStatus: "failed" }))
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      dispatch(changeTodolistEntityStatus({ id, entityStatus: "failed" }))
      return rejectWithValue(null)
    }
  },
)

export const changeTodolistTitle = createAppAsyncThunk<any, { id: string; title: string }>(
  `${todosSlice.name}/ChangeTodolistTitle`,
  async ({ id, title }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
      dispatch(setAppStatus({ status: "loading" }))
      const res = await todolistsAPI.updateTodo(id, title)
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(changeTodolistEntityStatus({ id, entityStatus: "succeeded" }))
        return { id, title }
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(changeTodolistEntityStatus({ id, entityStatus: "failed" }))
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      dispatch(changeTodolistEntityStatus({ id, entityStatus: "failed" }))
      return rejectWithValue(null)
    }
  },
)
