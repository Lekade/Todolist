import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from "api/todolists-api"
import { RequestStatusType, setAppStatus } from "store/app-slice"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addTodolist, clearTodosData, getTodos, removeTodolist } from "store/todolists-slice"
import { createAppAsyncThunk } from "utils/create-app-async-thunk"

export type TasksStateType = {
  [todolistId: string]: TaskDomainType[]
}
export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType
}

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    changeTaskEntityStatus: (
      state,
      action: PayloadAction<{ todoListId: string; id: string; entityStatus: RequestStatusType }>,
    ) => {
      const { todoListId, id, entityStatus } = action.payload
      const index = state[todoListId].findIndex((task) => task.id === id)
      state[todoListId][index] = { ...state[todoListId][index], entityStatus }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        action.payload.todos.forEach((t) => {
          state[t.id] = []
        })
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state[action.payload.todo.id] = []
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(clearTodosData, (state, action) => {
        return {}
      })
      //thunk action
      .addCase(getTasks.fulfilled, (state, action) => {
        const { todoListId, tasks } = action.payload
        return { ...state, [todoListId]: tasks.map((task) => ({ ...task, entityStatus: "idle" })) }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const { todoListId, id } = action.payload
        const index = state[todoListId].findIndex((task) => task.id === id)
        state[todoListId].splice(index, 1)
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const { task } = action.payload
        state[task.todoListId].unshift({ ...task, entityStatus: "idle" })
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoListId]
        const index = tasks.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.model }
        }
      })
  },
})

export const tasks = tasksSlice.reducer
export const { changeTaskEntityStatus } = tasksSlice.actions

export const getTasks = createAppAsyncThunk<{ tasks: TaskType[]; todoListId: string }, string>(
  `${tasksSlice.name}/getTasks`,
  async (todoListId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await todolistsAPI.getTasks(todoListId)
      const tasks = res.data.items
      dispatch(setAppStatus({ status: "succeeded" }))
      return { todoListId, tasks }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const removeTask = createAppAsyncThunk<{ todoListId: string; id: string }, { todoListId: string; id: string }>(
  `${tasksSlice.name}/removeTask`,
  async ({ todoListId, id }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: "loading" }))
      dispatch(setAppStatus({ status: "loading" }))
      const res = await todolistsAPI.deleteTask(todoListId, id)
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: "succeeded" }))
        return { todoListId, id }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const addTask = createAppAsyncThunk<{ task: TaskType }, { todoListId: string; title: string }>(
  `${tasksSlice.name}/addTasks`,
  async ({ todoListId, title }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const res = await todolistsAPI.createTask(todoListId, title)
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { task: res.data.data.item }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const updateTask = createAppAsyncThunk<
  { todoListId: string; id: string; model: UpdateDomainTaskModelType },
  { task: TaskDomainType; model: UpdateDomainTaskModelType }
>(`${tasksSlice.name}/updateTask`, async ({ task, model }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    const { todoListId, id } = task

    let apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...model,
    }
    dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: "loading" }))
    dispatch(setAppStatus({ status: "loading" }))
    const res = await todolistsAPI.updateTask(todoListId, id, apiModel)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: "succeeded" }))
      return { todoListId, id, model }
    } else {
      handleServerAppError(res.data, dispatch)
      dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: "failed" }))
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    const { todoListId, id } = task
    dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: "failed" }))
    return rejectWithValue(null)
  }
})
