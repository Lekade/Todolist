import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '470e32c0-943d-4aa1-985d-60cd15f8156e',
    }
})

export const authAPI  = {
    login(params: LoginParamsType){
        return instance.post<ResponseType<{ userId: number }>>('/auth/login', params)
    },
    me(){
        return instance.get<ResponseType<{id: number, email: string, login: string}>>('/auth/me')
    },
    logout(){
        return instance.delete<ResponseType>('/auth/login')
    }
}

export const todolistsApi = {
    getTodolist(){
        return instance.get<TodolistType[]>(`/todo-lists`)
    },
    createTodo(title: string){
        return instance.post<ResponseType<{ item: TodolistType }>>(`/todo-lists`, {title})
    },
    deleteTodo(todolistId: string){
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string){
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    },

    //---------------------------------------

    getTasks(todolistId: string){
        return  instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType){
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

//Types

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: number
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: number
}

// то что хочет принять сервер при обновлении таски
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | number
    deadline: string
}

type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}