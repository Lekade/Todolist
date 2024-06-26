import React from 'react';
import {FilterValuesType, TaskType} from "../../App";
import {Button} from "../button/Button";
import AddItemForm from "../addItemForm/addItemForm";
import {TransformTitle} from "../transformTItle/TransformTitle";
import Task from "../task/Task";

type PropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (taskTitle: string, todoListId: string) => void
    changeStatusTask: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeToDoList: (todoListId: string) => void
    changeToDoListTitle: (newToDoListTitle: string, todoListId: string) => void
    changeTaskTitle: (newTaskTitle: string, taskId: string, todoListId: string) => void
}

export const Todolist = ({
                             todoListId,
                             title,
                             tasks,
                             removeTask,
                             changeTaskFilter,
                             addTask,
                             changeStatusTask,
                             filter,
                             removeToDoList,
                             changeToDoListTitle,
                             changeTaskTitle
                         }: PropsType) => {
    const removeToDoListHandler = () => {
        removeToDoList(todoListId)
    }
    const addTaskHandler = (taskTitle: string) => {
        addTask(taskTitle, todoListId)
    }
    const changeToDoListTitleHandler = (newToDoListTitle: string) => {
        changeToDoListTitle(newToDoListTitle, todoListId)
    }
    const changeTaskTitleHandler = (newTaskTitle: string, taskId: string) => {
        changeTaskTitle(newTaskTitle, taskId, todoListId)
    }
    const changeStatusTaskHandler = (taskId: string, isDone: boolean) => {
        changeStatusTask(taskId, isDone, todoListId)
    }


    return (
        <div className='todolist'>
            <TransformTitle changeTitle={newTitle => changeToDoListTitleHandler(newTitle)} title={title}/>
            <Button onClickHandler={removeToDoListHandler} title='X'/>
            <AddItemForm addItem={(itemTitle) => addTaskHandler(itemTitle)}/>
            {
                tasks.length === 0
                    ? <p>Your taskslist is empty</p> :
                    <ul>
                        {tasks.map(task => {
                            return <Task
                                key={task.taskId}
                                taskId={task.taskId}
                                isDone={task.isDone}
                                title={task.title}
                                changeStatusTask={isDone => changeStatusTaskHandler(task.taskId, isDone)}
                                changeTaskTitleHandler={newTaskTitle => changeTaskTitleHandler(newTaskTitle, task.taskId)}
                                removeTask={() => removeTask(task.taskId, todoListId)}
                            />
                        })}
                    </ul>
            }
            <div>
                <Button classes={filter === 'all' ? 'activeFilter' : ''}
                        onClickHandler={() => changeTaskFilter('all', todoListId)} title='All'/>
                <Button classes={filter === 'active' ? 'activeFilter' : ''}
                        onClickHandler={() => changeTaskFilter('active', todoListId)} title='Active'/>
                <Button classes={filter === 'completed' ? 'activeFilter' : ''}
                        onClickHandler={() => changeTaskFilter('completed', todoListId)} title='Completed'/>
            </div>
        </div>
    )
}



