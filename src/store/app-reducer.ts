export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as (string | null),
    isInitialized: false,
}

type InitialStateType = typeof initialState

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':{
            return {...state, error: action.payload.error}
        }
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    payload: {
        status
    }
}) as const

export const setIsInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED',
    payload: {
        isInitialized
    }
}) as const


export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', payload:{error}}) as const

export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
type SetIsInitializedAT = ReturnType<typeof setIsInitializedAC>

type ActionsType = SetAppStatusAT | SetAppErrorAT | SetIsInitializedAT
