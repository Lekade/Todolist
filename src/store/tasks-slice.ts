import { TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType } from "api/todolists-api"
import { Dispatch } from "redux"
import { RequestStatusType, setAppStatus } from "store/app-slice"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddTodolist, clearTodosData, RemoveTodolist, setTodolists } from "store/todolists-slice"

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
    setTasks: (state, action: PayloadAction<{ todoListId: string; tasks: TaskType[] }>) => {
      const { todoListId, tasks } = action.payload
      return { ...state, [todoListId]: tasks.map((task) => ({ ...task, entityStatus: "idle" })) }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const { task } = action.payload
      state[task.todoListId].unshift({ ...task, entityStatus: "idle" })
    },
    removeTask: (state, action: PayloadAction<{ todoListId: string; id: string }>) => {
      const { todoListId, id } = action.payload
      const index = state[todoListId].findIndex((task) => task.id === id)
      state[todoListId].splice(index, 1)
    },
    updateTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const { task } = action.payload
      const index = state[task.todoListId].findIndex((t) => t.id === task.id)
      state[task.todoListId][index] = { ...task, entityStatus: "idle" }
    },
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
      .addCase(setTodolists, (state, action) => {
        action.payload.todos.forEach((t) => {
          state[t.id] = []
        })
      })
      .addCase(AddTodolist, (state, action) => {
        state[action.payload.todo.id] = []
      })
      .addCase(RemoveTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(clearTodosData, (state, action) => {
        return {}
      })
  },
})

export const tasks = tasksSlice.reducer
export const { setTasks, addTask, removeTask, updateTask, changeTaskEntityStatus } = tasksSlice.actions

export const getTasks = (todoListId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .getTasks(todoListId)
    .then((response) => {
      dispatch(setTasks({ todoListId, tasks: response.data.items }))
      dispatch(setAppStatus({ status: "succeeded" }))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const removeTaskTC = (todoListId: string, id: string) => (dispatch: Dispatch) => {
  dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: "loading" }))
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .deleteTask(todoListId, id)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(removeTask({ todoListId, id }))
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: "failed" }))
    })
}

export const addTasks = (todoListId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .createTask(todoListId, title)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(addTask({ task: response.data.data.item }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTasksTC = (task: TaskType, elModel: UpdateDomainTaskModelType) => (dispatch: Dispatch) => {
  const { todoListId, id } = task

  let apiModel: UpdateTaskModelType = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    ...elModel,
  }
  dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: "loading" }))
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .updateTask(todoListId, id, apiModel)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(updateTask({ task: response.data.data.item }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: "failed" }))
    })
}
