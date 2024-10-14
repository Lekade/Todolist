import { RequestStatusType, setAppError } from "app/app-slice"
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { addTodolist, clearTodosData, getTodos, removeTodolist } from "features/todolistsList/model/todolists-slice"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { ResultCode } from "common/enums"
import { TaskType, UpdateTaskArgType, UpdateTaskModelType } from "features/todolistsList/api/tasksAPI.types"
import { tasksAPI } from "features/todolistsList/api/tasksAPI"
import { AnyAction } from "redux"

export type TasksStateType = Record<string, TaskDomainType[]>

export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {},
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
      .addMatcher(isPending(updateTask, removeTask), (state, action: AnyAction) => {
        const { todoListId, id } = action.meta.arg
        const task = state[todoListId].find((task) => task.id === id)
        if (task) {
          task.entityStatus = "loading"
        }
      })
      .addMatcher(isFulfilled(updateTask), (state, action: AnyAction) => {
        const { todoListId, id } = action.meta.arg
        const task = state[todoListId].find((task) => task.id === id)
        if (task) {
          task.entityStatus = "succeeded"
        }
      })
      .addMatcher(isRejected(updateTask, removeTask), (state, action: AnyAction) => {
        const { todoListId, id } = action.meta.arg
        const task = state[todoListId].find((task) => task.id === id)
        if (task) {
          task.entityStatus = "failed"
        }
      })
  },
})

export const tasks = tasksSlice.reducer

export const getTasks = createAppAsyncThunk<{ tasks: TaskType[]; todoListId: string }, string>(
  `${tasksSlice.name}/getTasks`,
  async (todoListId, thunkAPI) => {
    const res = await tasksAPI.getTasks(todoListId)

    const tasks = res.data.items
    return { todoListId, tasks }
  },
)

export const addTask = createAppAsyncThunk<{ task: TaskType }, { todoListId: string; title: string }>(
  `${tasksSlice.name}/addTasks`,
  async ({ todoListId, title }, { rejectWithValue }) => {
    const res = await tasksAPI.createTask(todoListId, title)

    if (res.data.resultCode === ResultCode.Success) {
      return { task: res.data.data.item }
    }
    return rejectWithValue(res.data)
  },
)

export const removeTask = createAppAsyncThunk<{ todoListId: string; id: string }, { todoListId: string; id: string }>(
  `${tasksSlice.name}/removeTask`,
  async ({ todoListId, id }, { rejectWithValue }) => {
    const res = await tasksAPI.deleteTask(todoListId, id)

    if (res.data.resultCode === ResultCode.Success) {
      return { todoListId, id }
    }
    return rejectWithValue(res.data)
  },
)

export const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  `${tasksSlice.name}/updateTask`,
  async ({ todoListId, id, model }, { dispatch, getState, rejectWithValue }) => {
    const task = getState().tasks[todoListId].find((t) => t.id === id)

    if (!task) {
      dispatch(setAppError({ error: "Task not found in the state" }))
      return rejectWithValue(null)
    }
    let apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...model,
    }
    const res = await tasksAPI.updateTask({ todoListId, id, model: { ...apiModel } })

    if (res.data.resultCode === ResultCode.Success) {
      return { todoListId, id, model }
    }
    return rejectWithValue(res.data)
  },
)
