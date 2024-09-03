import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistAC,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./Store";

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

export type AddTaskAT = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type UpdateTaskAT = ReturnType<typeof updateTaskAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>

export type ActionType = AddTaskAT | RemoveTaskAT | UpdateTaskAT | RemoveTodolistActionType | AddTodolistActionType | SetTodolistsActionType | SetTasksAT

const initializationTasks = {}

export const tasksReducer = (state: TasksStateType = initializationTasks, action:ActionType):TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS' :
            const {todolistId, tasks} = action.payload
            return {...state, [todolistId]: tasks}
        case 'SET-TODOLISTS' :
            const stateCopy = {...state}
            action.payload.todos.forEach(t => {
                stateCopy[t.id] = []
            })
            return stateCopy
        case 'ADD-TASK': {
            const {task} = action.payload
            return {...state, [task.todoListId]: [task, ...state[task.todoListId]]}
        }
        case 'REMOVE-TASK' : {
            const {todolistId, taskId} = action.payload
            return {...state, [todolistId]: state[todolistId].filter(t => t.id !== taskId)}
        }
        case 'UPDATE-TASK' : {
            const {task} = action.payload
            return  {...state, [task.todoListId]: state[task.todoListId].map(t => t.id === task.id ? task : t)}
        }
        case 'ADD-TODOLIST' : {
            const {todolistId,title} = action.payload
            return {...state, [todolistId]: []}
        }
        case 'REMOVE-TODOLIST' : {
            const {todolistId} = action.payload
            const {[todolistId]:[], ...rest} = state
            return rest
        }
        default:
            return state
    }
}

export const addTaskAC = (task: TaskType) => ({
    'type': "ADD-TASK",
    payload: {
        task
    }
}) as const
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    'type': 'REMOVE-TASK',
    payload: {
        todolistId,
        taskId
    }
}) as const
export const updateTaskAC = (task: TaskType) => ({
    'type': 'UPDATE-TASK',
    payload: {
        task
    }
})as const

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    'type': 'SET-TASKS',
    payload: {
        todolistId,
        tasks
    }
})as const

export const getTasks = (todolistId: string) => (dispatch: Dispatch) =>{
    todolistsApi.getTasks(todolistId).then(response => {
        dispatch(setTasksAC(todolistId, response.data.items))
    })
}

export const removeTask = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTask(todolistId, taskId).then(response => {
        dispatch(removeTaskAC(todolistId, taskId))
    })
}

export const addTasks = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTask(todolistId, title).then(response => {
        dispatch(addTaskAC(response.data.data.item))
    })
}

type changeTaskInput = 'title'| 'status'

export const updateTasksTC = (task: TaskType, name: changeTaskInput, elModel: TaskStatuses | string) =>
    (dispatch: Dispatch, getState: ()=> AppRootStateType) => {
    console.log(task.startDate)

            const model: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            }

            todolistsApi.updateTask(task.todoListId, task.id, {...model, [name]: elModel}).then(response => {
                dispatch(updateTaskAC(response.data.data.item))
            })
}

