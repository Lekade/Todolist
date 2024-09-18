import {v1} from "uuid";
import {
    addTaskAC,
    removeTaskAC,
    tasksReducer, TasksStateType, updateTaskAC
} from "../tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolists-api";

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
                addedDate: 0,
                entityStatus: 'idle'},
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
                addedDate: 0,
                entityStatus: 'idle'},
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
                addedDate: 0,
                entityStatus: 'idle'
            },
        ],
        [todolistId2]: [
            {
                id: '01',
                title: '111',
                todoListId: todolistId2,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: 0,
                deadline: '',
                order: 0,
                addedDate: 0,
                entityStatus: 'idle'},
            {
                id: '02',
                title: '222',
                todoListId: todolistId2,
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: 0,
                deadline: '',
                order: 0,
                addedDate: 0,
                entityStatus: 'idle'},
            {
                id: '03',
                title: '333',
                todoListId: todolistId2,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: 0,
                deadline: '',
                order: 0,
                addedDate: 0,
                entityStatus: 'idle'
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
        addedDate: 0,
        entityStatus: 'idle'
    }
    const action = addTaskAC(task)
    const result = tasksReducer(tasks, action)

    expect(result[todolistId2].length).toBe(4)
    expect(result[todolistId2][0].title).toBe('Hello word')
})

test('the task should be remove', () => {
    const result = tasksReducer(tasks, removeTaskAC(todolistId2, '02'))

    expect(result[todolistId2].length).toBe(2)
    expect(result[todolistId2][1].id).not.toBe('02')
    expect(result[todolistId2][1].id).toBe('03')
})

test('the task should be update', () => {
    const updatedTask = {
        id: '01',
        title: 'new title',
        todoListId: todolistId2,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: 0,
        deadline: '',
        order: 0,
        addedDate: 0,
        entityStatus: 'idle'}

    const result = tasksReducer(tasks, updateTaskAC(updatedTask))

    expect(result[todolistId2].length).toBe(3)
    expect(result[todolistId2][0].title).toBe('new title')
})
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
        addedDate: 0,
        entityStatus: 'idle'
    }

    const endState = tasksReducer(tasks, addTaskAC(task))
    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][0].title).toBe('juce')
    expect(endState[todolistId2][0].id).toBe('04')
})
