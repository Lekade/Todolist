import {FilterValuesType, TodoListType} from "../App";

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title:string
        todoListId: string
    }
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        todoListId: string
    }
}

type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        filter: FilterValuesType
        todoListId: string
    }
}

type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        title:string
        todoListId: string
    }
}

export type ActionType = AddTodolistActionType | RemoveTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type){
        case 'ADD-TODOLIST' :
            const {title, todoListId} = action.payload
            return [{todoListId, title, filter: 'all'}, ...todolists]
        case 'REMOVE-TODOLIST' :{
            const {todoListId} = action.payload
            return todolists.filter(tl => tl.todoListId !== todoListId)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            const {filter, todoListId} = action.payload
            return todolists.map(tl => tl.todoListId === todoListId ? {...tl, filter} : tl)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const {title, todoListId} = action.payload
            return todolists.map(tl => tl.todoListId === todoListId ? {...tl, title} : tl)
        }

        default:
            return todolists
    }
}

export const AddTodolistAC = (todoListId: string, title: string):AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todoListId
        }
    }
}

export const RemoveTodolistAC = (todoListId: string):RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListId
        }
    }
}

export const ChangeTodolistFilterAC = (todoListId: string, filter: FilterValuesType):ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListId,
            filter
        }
    }
}

export const ChangeTodolistTitleAC = (todoListId: string, title:string):ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoListId,
            title
        }
    }
}