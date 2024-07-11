import {TaskObjType, TaskType} from "../App";
import {v1} from "uuid";

export type AddTaskType = {
    type: 'ADD-TASK',
    payload: {
        todoListId: string,
        taskTitle: string
    }
}

export type RemoveTaskType = {
    type: 'REMOVE-TASK'
    payload: {
        taskId: string,
        todoListId: string
    }
}
export type ChangeStatusTaskType = {
    type: 'CHANGE-STATUS-TASK'
    payload: {
        taskId: string, isDone: boolean, todoListId: string
    }
}

export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        newTaskTitle: string, taskId: string, todoListId: string
    }
}

export type ActionType = AddTaskType | RemoveTaskType | ChangeStatusTaskType | ChangeTaskTitleType


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
        case 'CHANGE-TASK-TITLE' : {
            const {newTaskTitle, taskId, todoListId} = action.payload
            return {
                ...tasks,
                [todoListId]: tasks[todoListId].map(task => task.taskId === taskId ? {...task, title: newTaskTitle} : task)
            }
        }
        default:
            return tasks
    }
}

export const AddTaskAC = (todoListId: string, taskTitle: string):AddTaskType => ({
    'type': "ADD-TASK",
    'payload': {
        todoListId,
        taskTitle
    }
})
export const RemoveTaskAC = (taskId: string, todoListId: string):RemoveTaskType => ({
    'type': 'REMOVE-TASK',
    'payload': {
        taskId,
        todoListId
    }
})
export const ChangeStatusTaskAC = (taskId: string, isDone: boolean, todoListId: string):ChangeStatusTaskType => ({
    'type': 'CHANGE-STATUS-TASK',
    'payload': {
        taskId, isDone, todoListId
    }
})
export const ChangeTaskTitleAC = (newTaskTitle: string, taskId: string, todoListId: string):ChangeTaskTitleType => ({
    'type': 'CHANGE-TASK-TITLE',
    'payload': {
        newTaskTitle, taskId, todoListId
    }
})