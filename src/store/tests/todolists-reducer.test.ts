import { v1 } from "uuid"
import {
  AddTodolist,
  ChangeTodolistFilter,
  ChangeTodolistTitle,
  RemoveTodolist,
  TodolistDomainType,
  todos,
} from "store/todolists-slice"
import { TodolistType } from "api/todolists-api"

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]
beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
  ]
})
// 1. Стартовый state

test("correct todolist should be removed", () => {
  // 2. Действие
  const endState = todos(startState, RemoveTodolist({ id: todolistId1 }))

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const todo: TodolistDomainType = {
    id: v1(),
    title: "new todo",
    filter: "all",
    addedDate: "",
    order: 0,
    entityStatus: "idle",
  }
  const action = AddTodolist({ todo })

  const endState = todos(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(action.payload.todo.title) ////
})

test("correct todolist should change its name", () => {
  const action = ChangeTodolistTitle({ id: todolistId2, title: "New Todolist" })
  const endState = todos(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(action.payload.title)
})

test("correct filter of todolist should be changed", () => {
  const action = ChangeTodolistFilter({ id: todolistId2, filter: "completed" })
  const endState = todos(startState, action)

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(action.payload.filter)
})
