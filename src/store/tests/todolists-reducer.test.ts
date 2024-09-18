import {
    ActionType,
    AddTodolistAC,
    ChangeTodolistFilterAC, ChangeTodolistTitleAC,
    RemoveTodolistAC, TodolistDomainType,
    todolistsReducer
} from '../todolists-reducer'
import { v1 } from 'uuid'

let todolistId1:string
let todolistId2:string
let startState: TodolistDomainType[]
beforeEach(()=> {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: "idle" },
        { id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: "idle" },
    ]
})
// 1. Стартовый state


test('correct todolist should be removed', () => {
    // 2. Действие
    const action : ActionType = RemoveTodolistAC(todolistId1)

    const endState = todolistsReducer(startState, action)

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const action: ActionType = AddTodolistAC(v1(), 'New Todolist')
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(action.payload.title)
})

test('correct todolist should change its name', () => {
    const action: ActionType = ChangeTodolistTitleAC(todolistId2 ,'New Todolist')
    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(action.payload.title)
})

test('correct filter of todolist should be changed', () => {
    const action: ActionType  = ChangeTodolistFilterAC(todolistId2, 'completed')
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(action.payload.filter)
})

