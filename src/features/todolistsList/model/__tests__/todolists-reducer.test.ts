import { v1 } from "uuid"
import {
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  FilterValuesType,
  getTodos,
  removeTodolist,
  TodolistDomainType,
  todos,
} from "features/todolistsList/model/todolists-slice"
import { TodolistType } from "features/todolistsList/api/todolists-api"
import { RequestStatusType } from "app/app-slice"
import { TestAction } from "common/types/TestAction"

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "", order: 0 },
    { id: todolistId2, title: "What to buy", filter: "all", entityStatus: "idle", addedDate: "", order: 0 },
  ]
})

test("correct todolist should be removed", () => {
  const action: TestAction<typeof removeTodolist.fulfilled> = {
    type: removeTodolist.fulfilled.type,
    payload: { id: todolistId1 },
  }
  const endState = todos(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  let todolist: TodolistType = {
    title: "New Todolist",
    id: "any id",
    addedDate: "",
    order: 0,
  }
  const action: TestAction<typeof addTodolist.fulfilled> = {
    type: addTodolist.fulfilled.type,
    payload: { todo: todolist },
  }

  const endState = todos(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(todolist.title)
  expect(endState[0].filter).toBe("all")
})

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist"

  const action: TestAction<typeof changeTodolistTitle.fulfilled> = {
    type: changeTodolistTitle.fulfilled.type,
    payload: { id: todolistId2, title: newTodolistTitle },
  }

  const endState = todos(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed"

  const action = changeTodolistFilter({ id: todolistId2, filter: newFilter })

  const endState = todos(startState, action)

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})
test("todolists should be added", () => {
  const action: TestAction<typeof getTodos.fulfilled> = {
    type: getTodos.fulfilled.type,
    payload: { todos: startState },
  }

  const endState = todos([], action)

  expect(endState.length).toBe(2)
})
test("correct entity status of todolist should be changed", () => {
  let newStatus: RequestStatusType = "loading"

  const action = changeTodolistEntityStatus({ id: todolistId2, entityStatus: newStatus })

  const endState = todos(startState, action)

  expect(endState[0].entityStatus).toBe("idle")
  expect(endState[1].entityStatus).toBe(newStatus)
})
