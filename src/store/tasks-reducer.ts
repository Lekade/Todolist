import {
    AddTodolistActionType, changeTodolistEntityStatusAC, ClearTodosDataAT,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

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

export type AddTaskAT = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type UpdateTaskAT = ReturnType<typeof updateTaskAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>
type changeTaskEntityStatusAT = ReturnType<typeof changeTaskEntityStatusAC>

export type ActionType =
    AddTaskAT
    | RemoveTaskAT
    | UpdateTaskAT
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | SetTasksAT
    | changeTaskEntityStatusAT
    | ClearTodosDataAT

const initializationTasks = {}

export const tasksReducer = (state: TasksStateType = initializationTasks, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS' :
            const {todolistId, tasks} = action.payload
            return {...state, [todolistId]: tasks.map(task => ({...task, entityStatus: 'idle'}))}
        case 'SET-TODOLISTS' :
            const stateCopy = {...state}
            action.payload.todos.forEach(t => {
                stateCopy[t.id] = []
            })
            return stateCopy
        case 'ADD-TASK': {
            const {task} = action.payload
            return {...state, [task.todoListId]: [{...task, entityStatus: 'idle'}, ...state[task.todoListId]]}
        }
        case 'REMOVE-TASK' : {
            const {todolistId, taskId} = action.payload
            return {...state, [todolistId]: state[todolistId].filter(t => t.id !== taskId)}
        }
        case 'UPDATE-TASK' : {
            const {task} = action.payload
            return {
                ...state,
                [task.todoListId]: state[task.todoListId].map(t => t.id === task.id ? {...t, ...task} : t)
            }
        }
        case 'ADD-TODOLIST' : {
            const {todolistId, title} = action.payload
            return {...state, [todolistId]: []}
        }
        case 'REMOVE-TODOLIST' : {
            const {todolistId} = action.payload
            const {[todolistId]: [], ...rest} = state
            return rest
        }
        case 'CHANGE-TASK-ENTITY-STATUS': {
            const {todoListId, id, entityStatus} = action.payload
            return {...state, [todoListId]: state[todoListId].map(task => task.id === id ? ({...task, entityStatus}) : task) }
        }
        case 'CLEAR-TODOS-DATA':
            return {}
        default:
            return state
    }
}

export const addTaskAC = (task: TaskType) => ({
    type: "ADD-TASK",
    payload: {
        task
    }
}) as const
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    payload: {
        todolistId,
        taskId
    }
}) as const
export const updateTaskAC = (task: TaskType) => ({
    type: 'UPDATE-TASK',
    payload: {
        task
    }
}) as const

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    payload: {
        todolistId,
        tasks
    }
}) as const

export const changeTaskEntityStatusAC = (todoListId: string, id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TASK-ENTITY-STATUS',
    payload: {
        todoListId,
        id,
        entityStatus
    }
}) as const

export const getTasks = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTasks(todolistId)
        .then(response => {
        dispatch(setTasksAC(todolistId, response.data.items))
        dispatch(setAppStatusAC('succeeded'))
    })
        .catch((error) => {
        handleServerNetworkError(error, dispatch)
    })

}

export const removeTask = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(changeTaskEntityStatusAC(todolistId, taskId,'loading'))
    dispatch(setAppStatusAC('loading'))
    todolistsApi.deleteTask(todolistId, taskId)
        .then(response => {
        if (response.data.resultCode === 0) {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTaskEntityStatusAC(todolistId, taskId,'succeeded'))
        } else {
            handleServerAppError(response.data, dispatch)
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(()=>{
            dispatch(changeTaskEntityStatusAC(todolistId, taskId,'failed'))
    })
}

export const addTasks = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTask(todolistId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(response.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTasksTC = (task: TaskType, elModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch) => {
        let apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...elModel
        }
        dispatch(changeTaskEntityStatusAC(task.todoListId, task.id,'loading'))
        dispatch(setAppStatusAC('loading'))
        todolistsApi.updateTask(task.todoListId, task.id, apiModel)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(updateTaskAC(response.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(response.data, dispatch)
                }
            })
            .catch(error =>{
                handleServerNetworkError(error, dispatch)
            }).finally(()=>{
            dispatch(changeTaskEntityStatusAC(task.todoListId, task.id,'failed'))
        })
    }

