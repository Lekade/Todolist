import { instance } from "common/api"
import { BaseResponseType } from "common/types/BaseResponseType"
import { TaskPriorities, TaskStatuses } from "features/todolistsList/lib/enums"

export const todolistsAPI = {
  getTodolist() {
    return instance.get<TodolistType[]>(`/todo-lists`)
  },
  createTodo(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>(`/todo-lists`, { title })
  },
  deleteTodo(todolistId: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}`)
  },
  updateTodo(todolistId: string, title: string) {
    return instance.put<BaseResponseType>(`/todo-lists/${todolistId}`, { title })
  },

  //---------------------------------------

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

//Types

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: string
  addedDate: string
}

// то что хочет принять сервер при обновлении таски
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

export type GetTasksResponse = {
  items: TaskType[]
  totalCount: number
  error: string | null
}
