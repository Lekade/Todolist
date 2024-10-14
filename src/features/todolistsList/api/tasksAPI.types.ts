import { TaskPriorities, TaskStatuses } from "features/todolistsList/lib/enums"

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

export type UpdateTaskModelType = Omit<TaskType, "id" | "todoListId" | "order" | "addedDate">

export type GetTasksResponse = {
  items: TaskType[]
  totalCount: number
  error: string | null
}

type UpdateDomainTaskModelType = Partial<UpdateTaskModelType>

export type UpdateTaskArgType = {
  todoListId: string
  id: string
  model: UpdateDomainTaskModelType
}
