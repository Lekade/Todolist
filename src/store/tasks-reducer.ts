import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistAC, RemoveTodolistActionType} from "./todolists-reducer";


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
            const newTask: TaskType = {taskId: v1(), title: taskTitle, isDone: false}
            return {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        }
        case 'REMOVE-TASK' : {
            const {taskId, todolistId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].filter(t => t.taskId !== taskId)}
        }
        case 'CHANGE-STATUS-TASK' : {
            const {taskId, isDone, todolistId} = action.payload
            return  {...tasks, [todolistId]: tasks[todolistId].map(t => t.taskId === taskId ? {...t, isDone: isDone} : t)}
        }
        case 'CHANGE-TITLE-TASK' : {
            const {newTaskTitle, taskId, todolistId} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].map(task => task.taskId === taskId ? {...task, title: newTaskTitle} : task)
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
export const changeStatusTaskAC = (taskId: string, isDone: boolean, todolistId: string) => ({
    'type': 'CHANGE-STATUS-TASK',
    'payload': {
        taskId, isDone, todolistId
    }
})as const
export const changeTitleTaskAC = (newTaskTitle: string, taskId: string, todolistId: string) => ({
    'type': 'CHANGE-TITLE-TASK',
    'payload': {
        newTaskTitle, taskId, todolistId
    }
})as const

