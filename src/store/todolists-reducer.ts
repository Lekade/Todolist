import {todolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
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
        title: string
        todolistId: string
    }
}

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ActionType =
    AddTodolistActionType
    | RemoveTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>

const initializationTodolists: Array<TodolistDomainType> = []

export const todolistsReducer = (todolists: Array<TodolistDomainType> = initializationTodolists, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS' :
            const {todos} = action.payload
            return todos.map(todo => ({...todo, filter: 'all', entityStatus: "idle"}))
        case 'ADD-TODOLIST' :
            const {title, todolistId} = action.payload
            return [{id: todolistId, title, filter: 'all', addedDate: '', order: 0, entityStatus: "idle"}, ...todolists]
        case 'REMOVE-TODOLIST' : {
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
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            const {id, entityStatus} = action.payload
            return todolists.map(tl => tl.id === id ? {...tl, entityStatus} : tl)
        }

        default:
            return todolists
    }
}

export const AddTodolistAC = (todolistId: string, title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId
        }
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    }
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            filter
        }
    }
}

export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
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

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    payload: {
        id,
        entityStatus
    }
}) as const

export const getTodolists = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTodolist()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}

export const removeTodolist = (id: string) => (dispatch: Dispatch) => {
    dispatch(changeTodolistEntityStatusAC(id, "loading"))
    dispatch(setAppStatusAC('loading'))
    todolistsApi.deleteTodo(id)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTodolistEntityStatusAC(id, "succeeded"))
                dispatch(RemoveTodolistAC(id))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        }).finally(()=>{
        dispatch(changeTodolistEntityStatusAC(id, "failed"))
    })
}

export const addTodolist = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTodo(title)
        .then(response => {
        if (response.data.resultCode === 0) {
            dispatch(AddTodolistAC(response.data.data.item.id, title))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(response.data, dispatch)
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const ChangeTodolistTitle = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(changeTodolistEntityStatusAC(id, "loading"))
    dispatch(setAppStatusAC('loading'))
    todolistsApi.updateTodo(id, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(ChangeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(id, "succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(()=>{
        dispatch(changeTodolistEntityStatusAC(id, "failed"))
    })
}