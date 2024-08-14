import {FilterValuesType, TodoListType} from "../App";

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title:string
        todolistId: string
    }
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        todolistId: string
    }
}

type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        filter: FilterValuesType
        todolistId: string
    }
}

type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        title:string
        todolistId: string
    }
}

export type ActionType = AddTodolistActionType | RemoveTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType

const initializationTodolists:Array<TodoListType> = []

export const todolistsReducer = (todolists: Array<TodoListType> = initializationTodolists, action: ActionType): Array<TodoListType> => {
    switch (action.type){
        case 'ADD-TODOLIST' :
            const {title, todolistId} = action.payload
            return [{todolistId, title, filter: 'all'}, ...todolists]
        case 'REMOVE-TODOLIST' :{
            const {todolistId} = action.payload
            return todolists.filter(tl => tl.todolistId !== todolistId)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            const {filter, todolistId} = action.payload
            return todolists.map(tl => tl.todolistId === todolistId ? {...tl, filter} : tl)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const {title, todolistId} = action.payload
            return todolists.map(tl => tl.todolistId === todolistId ? {...tl, title} : tl)
        }

        default:
            return todolists
    }
}

export const AddTodolistAC = (todolistId: string, title: string):AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId
        }
    }
}

export const RemoveTodolistAC = (todolistId: string):RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    }
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType):ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            filter
        }
    }
}

export const ChangeTodolistTitleAC = (todolistId: string, title:string):ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            title
        }
    }
}