import {v1} from "uuid";
import {
    addTaskAC,
    removeTaskAC,
    tasksReducer, TasksStateType
} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const todolistId1 = v1()
const todolistId2 = v1()
let tasks: TasksStateType
beforeEach(() => {
    tasks = {
        [todolistId1]: [
            {
                id: '01',
                title: 'HTML&CSS',
                todoListId: todolistId1,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: 0,
                deadline: '',
                order: 0,
                addedDate: 0},
            {
                id: '02',
                title: 'JS',
                todoListId: todolistId1,
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: 0,
                deadline: '',
                order: 0,
                addedDate: 0},
            {
                id: '03',
                title: 'ReactJS',
                todoListId: todolistId1,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: 0,
                deadline: '',
                order: 0,
                addedDate: 0
            },
        ],
        [todolistId2]: [
            {
                id: '01',
                title: '111',
                todoListId: todolistId1,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: 0,
                deadline: '',
                order: 0,
                addedDate: 0},
            {
                id: '02',
                title: '222',
                todoListId: todolistId1,
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: 0,
                deadline: '',
                order: 0,
                addedDate: 0},
            {
                id: '03',
                title: '333',
                todoListId: todolistId1,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: 0,
                deadline: '',
                order: 0,
                addedDate: 0
            },
        ]
    }
})

test('the task should be added', () => {
    const task = {
        id: '04',
        title: 'Hello word',
        todoListId: todolistId2,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: 0,
        deadline: '',
        order: 0,
        addedDate: 0
    }
    const action = addTaskAC(task)
    const result = tasksReducer(tasks, action)

    expect(result[todolistId2].length).toBe(4)
    expect(result[todolistId2][0].title).toBe('Hello word')
})

test('the task should be remove', () => {
    const action = removeTaskAC('02', todolistId2)
    const result = tasksReducer(tasks, action)

    expect(result[todolistId2].length).toBe(2)
    expect(result[todolistId2][1].id).not.toBe('02')
    expect(result[todolistId2][1].id).toBe('03')
})

// test('the task should be changed status', () => {
//     const action = changeStatusTaskAC('03', TaskStatuses.Completed, todolistId1)
//     const result = tasksReducer(tasks, action)
//
//     expect(result[todolistId1].length).toBe(6)
//     expect(result[todolistId1][2].status).toBe(TaskStatuses.Completed)
// })
// test('the task should be changed title', () => {
//     const action = changeTitleTaskAC('cheese', '01', todolistId2)
//     const result = tasksReducer(tasks, action)
//
//     expect(result[todolistId2].length).toBe(3)
//     expect(result[todolistId2][0].title).toBe('cheese')
// })
test('correct task should be added to correct array', () => {
    const task = {
        id: '04',
        title: 'juce',
        todoListId: todolistId2,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: 0,
        deadline: '',
        order: 0,
        addedDate: 0
    }
    const action = addTaskAC(task)

    const endState = tasksReducer(tasks, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].id).toBe(false)
})

// test('status of specified task should be changed', () => {
//     const action = changeStatusTaskAC('2', TaskStatuses.New, 'todolistId2')
//     const endState = tasksReducer(tasks, action)
//     expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
//     expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
// })
