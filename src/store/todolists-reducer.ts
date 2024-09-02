import {todolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

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

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ActionType = AddTodolistActionType | RemoveTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType | SetTodolistsActionType

const initializationTodolists:Array<TodolistDomainType> = []

export const todolistsReducer = (todolists: Array<TodolistDomainType> = initializationTodolists, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type){
        case 'SET-TODOLISTS' :
            const {todos} = action.payload
            return todos.map(todo => ({...todo, filter: 'all'}))
        case 'ADD-TODOLIST' :
            const {title, todolistId} = action.payload
            return [{ id: todolistId, title, filter: 'all', addedDate: '', order: 0}, ...todolists]
        case 'REMOVE-TODOLIST' :{
            const {todolistId} = action.payload
            return todolists.filter(tl => tl.id !== todolistId)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            const {filter, todolistId} = action.payload
            return todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const {title, todolistId} = action.payload
            return todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)
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

export const setTodolistsAC = (todos: TodolistType[]) => ({
    type: 'SET-TODOLISTS',
    payload: {
        todos
    }
}) as const

export const getTodos = () => (dispatch: Dispatch, getState: any) => {
    todolistsApi.getTodolist()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}