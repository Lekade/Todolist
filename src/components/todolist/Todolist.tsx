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
}

export const Todolist = ({title, tasks, date, removeTask, changeFilter, addTask}: PropsType) => {

    const [inputText, setInputText] = useState('')
    const ChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setInputText(e.currentTarget.value)
    }
    const addTaskInput = () => {
        addTask(inputText)
        setInputText('')
    }

    const keyDownAddTaskInput = (e:KeyboardEvent<HTMLInputElement>) =>{
        e.key === 'Enter' && addTaskInput()
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={ChangeInputHandler} onKeyDown={keyDownAddTaskInput} value={inputText} />
                <Button onClickHandler={addTaskInput} disabled={!inputText.trim()} title='+'/>
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p> :
                    <ul>
                        {tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <button onClick={() => removeTask(task.id)}>X</button>
                                </li>
                            )
                        })}
                    </ul>
            }
            <div>
                <Button onClickHandler={() => changeFilter('all')} title='All'/>
                <Button onClickHandler={() => changeFilter('active')} title='Active'/>
                <Button onClickHandler={() => changeFilter('completed')} title='Completed'/>
            </div>
            <div>{date}</div>
        </div>
    )
}