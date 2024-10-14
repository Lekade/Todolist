import { instance } from "common/api"
import { BaseResponseType } from "common/types/BaseResponseType"
import { TodolistType } from "features/todolistsList/api/todolistsAPI.types"

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
}
