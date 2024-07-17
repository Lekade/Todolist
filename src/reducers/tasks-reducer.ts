import {TaskObjType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type AddTaskAT = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type ChangeStatusTaskAT = ReturnType<typeof changeStatusTaskAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTitleTaskAC>

export type ActionType = AddTaskAT | RemoveTaskAT | ChangeStatusTaskAT | ChangeTaskTitleAT | RemoveTodolistActionType | AddTodolistActionType

export const tasksReducer = (tasks: TaskObjType, action:ActionType):TaskObjType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const {todoListId, taskTitle} = action.payload
            const newTask: TaskType = {taskId: v1(), title: taskTitle, isDone: false}
            return {...tasks, [todoListId]: [newTask, ...tasks[todoListId]]}
        }
        case 'REMOVE-TASK' : {
            const {taskId, todoListId} = action.payload
            return {...tasks, [todoListId]: tasks[todoListId].filter(t => t.taskId !== taskId)}
        }
        case 'CHANGE-STATUS-TASK' : {
            const {taskId, isDone, todoListId} = action.payload
            return  {...tasks, [todoListId]: tasks[todoListId].map(t => t.taskId === taskId ? {...t, isDone: isDone} : t)}
        }
        case 'CHANGE-TITLE-TASK' : {
            const {newTaskTitle, taskId, todoListId} = action.payload
            return {
                ...tasks,
                [todoListId]: tasks[todoListId].map(task => task.taskId === taskId ? {...task, title: newTaskTitle} : task)
            }
        }
        case 'ADD-TODOLIST' : {
            const {todoListId,title} = action.payload
            return {...tasks, [todoListId]: []}
        }
        case 'REMOVE-TODOLIST' : {
            const {todoListId} = action.payload
            const {[todoListId]:[], ...rest} = tasks
            return rest
        }
        default:
            return tasks
    }
}

export const addTaskAC = (todoListId: string, taskTitle: string) => ({
    'type': "ADD-TASK",
    'payload': {
        todoListId,
        taskTitle
    }
}) as const
export const removeTaskAC = (taskId: string, todoListId: string) => ({
    'type': 'REMOVE-TASK',
    'payload': {
        taskId,
        todoListId
    }
}) as const
export const changeStatusTaskAC = (taskId: string, isDone: boolean, todoListId: string) => ({
    'type': 'CHANGE-STATUS-TASK',
    'payload': {
        taskId, isDone, todoListId
    }
})as const
export const changeTitleTaskAC = (newTaskTitle: string, taskId: string, todoListId: string) => ({
    'type': 'CHANGE-TITLE-TASK',
    'payload': {
        newTaskTitle, taskId, todoListId
    }
})as const
