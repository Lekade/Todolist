import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistAC, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

export type AddTaskAT = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type ChangeStatusTaskAT = ReturnType<typeof changeStatusTaskAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTitleTaskAC>

export type ActionType = AddTaskAT | RemoveTaskAT | ChangeStatusTaskAT | ChangeTaskTitleAT | RemoveTodolistActionType | AddTodolistActionType

const initializationTasks = {}

export const tasksReducer = (tasks: TasksStateType = initializationTasks, action:ActionType):TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const {todolistId, taskTitle} = action.payload
            const newTask: TaskType = {
                id: v1(),
                title: taskTitle,
                todoListId: todolistId,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: 0,
                deadline: '',
                order: 0,
                addedDate: 0,
            }
            return {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        }
        case 'REMOVE-TASK' : {
            const {taskId, todolistId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        }
        case 'CHANGE-STATUS-TASK' : {
            const {taskId, status, todolistId} = action.payload
            return  {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, status} : t)}
        }
        case 'CHANGE-TITLE-TASK' : {
            const {newTaskTitle, taskId, todolistId} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: newTaskTitle} : task)
            }
        }
        case 'ADD-TODOLIST' : {
            const {todolistId,title} = action.payload
            return {...tasks, [todolistId]: []}
        }
        case 'REMOVE-TODOLIST' : {
            const {todolistId} = action.payload
            const {[todolistId]:[], ...rest} = tasks
            return rest
        }
        default:
            return tasks
    }
}

export const addTaskAC = (todolistId: string, taskTitle: string) => ({
    'type': "ADD-TASK",
    'payload': {
        todolistId,
        taskTitle
    }
}) as const
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    'type': 'REMOVE-TASK',
    'payload': {
        taskId,
        todolistId
    }
}) as const
export const changeStatusTaskAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({
    'type': 'CHANGE-STATUS-TASK',
    'payload': {
        taskId, status, todolistId
    }
})as const
export const changeTitleTaskAC = (newTaskTitle: string, taskId: string, todolistId: string) => ({
    'type': 'CHANGE-TITLE-TASK',
    'payload': {
        newTaskTitle, taskId, todolistId
    }
})as const

