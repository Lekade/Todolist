import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import {Button} from "../button/Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (taskTitle: string) => void
    changeStatusTask: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist = ({title, tasks, date, removeTask, changeFilter, addTask, changeStatusTask, filter}: PropsType) => {

    const [inputText, setInputText] = useState('')
    const[error, setError] = useState(false)
    const ChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setInputText(e.currentTarget.value)
        setError(false)
    }
    const addTaskInput = () => {
        if(inputText.trim()){
            setError(false)
            addTask(inputText.trim())
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
                                <li key={task.id}>
                                    <input type="checkbox" onChange={(e) => changeStatusTask(task.id, e.currentTarget.checked)} checked={task.isDone}/>
                                    <span className={task.isDone ? 'task-done' : 'task'} >{task.title}</span>
                                    <button onClick={() => removeTask(task.id)}>X</button>
                                </li>
                            )
                        })}
                    </ul>
            }
            <div>
                <Button classes={filter === 'all' ? 'activeFilter' : ''} onClickHandler={() => changeFilter('all')} title='All'/>
                <Button classes={filter === 'active' ? 'activeFilter' : ''} onClickHandler={() => changeFilter('active')} title='Active'/>
                <Button classes={filter === 'completed' ? 'activeFilter' : ''} onClickHandler={() => changeFilter('completed')} title='Completed'/>
            </div>
            <div>{date}</div>
        </div>
    )
}