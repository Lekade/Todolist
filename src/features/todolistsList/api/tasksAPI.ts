import { instance } from "common/api"
import { BaseResponseType } from "common/types"
import { GetTasksResponse, TaskType, UpdateTaskArgType } from "features/todolistsList/api/tasksAPI.types"

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(arg: UpdateTaskArgType) {
    const { todoListId, id, model } = arg
    return instance.put<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks/${id}`, model)
  },
}
