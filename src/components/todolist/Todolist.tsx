import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import {Button} from "../button/Button";

type PropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (taskTitle: string, todoListId: string) => void
    changeStatusTask: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
}

export const Todolist = ({todoListId, title, tasks, removeTask,  changeTaskFilter, addTask, changeStatusTask, filter}: PropsType) => {

    const [inputText, setInputText] = useState('')
    const[error, setError] = useState(false)
    const ChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setInputText(e.currentTarget.value)
        setError(false)
    }
    const addTaskInput = () => {
        if(inputText.trim()){
            setError(false)
            addTask(inputText.trim(), todoListId)
            setInputText('')
        }else {
            setError(true)
        }
    }

    const keyDownAddTaskInput = (e:KeyboardEvent<HTMLInputElement>) =>{
        e.key === 'Enter' && addTaskInput()
    }

    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error-input' : ''} onChange={ChangeInputHandler} onKeyDown={keyDownAddTaskInput} value={inputText} />
                <Button onClickHandler={addTaskInput} title='+'/>
            </div>
            {error && <div className='error'>The field is required</div>}
            {
                tasks.length === 0
                    ? <p>Your taskslist is empty</p> :
                    <ul>
                        {tasks.map(task => {
                            return (
                                <li key={task.taskId}>
                                    <input type="checkbox" onChange={(e) => changeStatusTask(task.taskId, e.currentTarget.checked, todoListId)} checked={task.isDone}/>
                                    <span className={task.isDone ? 'task-done' : 'task'} >{task.title}</span>
                                    <button onClick={() => removeTask(task.taskId, todoListId)}>X</button>
                                </li>
                            )
                        })}
                    </ul>
            }
            <div>
                <Button classes={filter === 'all' ? 'activeFilter' : ''} onClickHandler={() => changeTaskFilter('all', todoListId)} title='All'/>
                <Button classes={filter === 'active' ? 'activeFilter' : ''} onClickHandler={() => changeTaskFilter('active', todoListId)} title='Active'/>
                <Button classes={filter === 'completed' ? 'activeFilter' : ''} onClickHandler={() => changeTaskFilter('completed', todoListId)} title='Completed'/>
            </div>
        </div>
    )
}