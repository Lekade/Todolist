import {TaskObjType} from "../App";
import {v1} from "uuid";
import {AddTaskAC, ChangeStatusTaskAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";

const todoListId1 = v1()
const todoListId2 = v1()
let tasks: TaskObjType
beforeEach(() => {
    tasks = {
        [todoListId1]: [
            {taskId: '01', title: 'HTML&CSS', isDone: true},
            {taskId: '02', title: 'JS', isDone: true},
            {taskId: '03', title: 'ReactJS', isDone: false},
            {taskId: '04', title: 'Redux', isDone: false},
            {taskId: '05', title: 'Typescript', isDone: false},
            {taskId: '06', title: 'RTK query', isDone: false},
        ],
        [todoListId2]: [
            {taskId: '01', title: 'Milk', isDone: false},
            {taskId: '02', title: 'Water', isDone: false},
            {taskId: '03', title: 'Chips', isDone: true},
        ]
    }
})


test('the task should be added', () => {
    const action = AddTaskAC(todoListId2, 'Hello word')
    const result = tasksReducer(tasks, action)

    expect(result[todoListId2].length).toBe(4)
    expect(result[todoListId2][0].title).toBe('Hello word')
})

test('the task should be remove', () => {
    const action = RemoveTaskAC('02', todoListId2)
    const result = tasksReducer(tasks, action)

    expect(result[todoListId2].length).toBe(2)
    expect(result[todoListId2][1].taskId).not.toBe('02')
    expect(result[todoListId2][1].taskId).toBe('03')
})

test('the task should be changed status', () => {
    const action = ChangeStatusTaskAC('03', true, todoListId1)
    const result = tasksReducer(tasks, action)

    expect(result[todoListId1].length).toBe(6)
    expect(result[todoListId1][2].isDone).toBe(true)
})
test('the task should be changed title', () => {
    const action = ChangeTaskTitleAC('cheese', '01', todoListId2)
    const result = tasksReducer(tasks, action)

    expect(result[todoListId2].length).toBe(3)
    expect(result[todoListId2][0].title).toBe('cheese')
})