import { todolistsAPI } from "features/todolistsList/api/todolistsAPI"
import { RequestStatusType } from "app/app-slice"
import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { ResultCode } from "common/enums"
import { TodolistType } from "features/todolistsList/api/todolistsAPI.types"
import { AnyAction } from "redux"

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
      .addMatcher(isPending(removeTodolist, changeTodolistTitle), (state, action: AnyAction) => {
        const { id } = action.meta.arg
        const todo = state.find((todo) => todo.id === id)
        if (todo) {
          todo.entityStatus = "loading"
        }
      })
      .addMatcher(isFulfilled(changeTodolistTitle), (state, action: AnyAction) => {
        const { id } = action.meta.arg
        const todo = state.find((todo) => todo.id === id)
        if (todo) {
          todo.entityStatus = "succeeded"
        }
      })
      .addMatcher(isRejected(removeTodolist, changeTodolistTitle), (state, action: AnyAction) => {
        const { id } = action.meta.arg
        const todo = state.find((todo) => todo.id === id)
        if (todo) {
          todo.entityStatus = "failed"
        }
      })
  },
})

export const todos = todosSlice.reducer
export const { changeTodolistFilter, clearTodosData } = todosSlice.actions

export const getTodos = createAppAsyncThunk<{ todos: TodolistType[] }, undefined>(
  `${todosSlice.name}/getTodos`,
  async (_, { rejectWithValue }) => {
    const res = await todolistsAPI.getTodolist()
    return { todos: res.data }
  },
)

export const addTodolist = createAppAsyncThunk<{ todo: TodolistType }, string>(
  `${todosSlice}/addTodolist`,
  async (title, { rejectWithValue }) => {
    const res = await todolistsAPI.createTodo(title)
    if (res.data.resultCode === ResultCode.Success) {
      return { todo: res.data.data.item }
    }
    return rejectWithValue(res.data)
  },
)
export const removeTodolist = createAppAsyncThunk<{ id: string }, { id: string }>(
  `${todosSlice.name}/removeTodolist`,
  async ({ id }, { rejectWithValue }) => {
    const res = await todolistsAPI.deleteTodo(id)
    if (res.data.resultCode === ResultCode.Success) {
      return { id }
    }
    return rejectWithValue(res.data)
  },
)

export const changeTodolistTitle = createAppAsyncThunk<any, { id: string; title: string }>(
  `${todosSlice.name}/ChangeTodolistTitle`,
  async ({ id, title }, { rejectWithValue }) => {
    const res = await todolistsAPI.updateTodo(id, title)
    if (res.data.resultCode === ResultCode.Success) {
      return { id, title }
    }
    return rejectWithValue(res.data)
  },
)
