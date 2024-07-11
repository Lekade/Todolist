import {TaskObjType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTaskAC, tasksReducer} from "./tasks-reducer";

const todoListId1 = v1()
const todoListId2 = v1()
let tasks: TaskObjType
beforeEach(() => {
    tasks = {
        [todoListId1]: [
            {taskId: v1(), title: 'HTML&CSS', isDone: true},
            {taskId: v1(), title: 'JS', isDone: true},
            {taskId: v1(), title: 'ReactJS', isDone: false},
            {taskId: v1(), title: 'Redux', isDone: false},
            {taskId: v1(), title: 'Typescript', isDone: false},
            {taskId: v1(), title: 'RTK query', isDone: false},
        ],
        [todoListId2]: [
            {taskId: v1(), title: 'Milk', isDone: false},
            {taskId: v1(), title: 'Water', isDone: false},
            {taskId: v1(), title: 'Chips', isDone: true},
        ]
    }
})
test('the task should be added', () => {
    const action = AddTaskAC(todoListId2, 'Hello word')
    const result = tasksReducer(tasks, action)

    expect(result[todoListId2].length).toBe(4)
    expect(result[todoListId2].length).toBe(4)
    expect(result[todoListId2][0].title).toBe('Hello word')
})