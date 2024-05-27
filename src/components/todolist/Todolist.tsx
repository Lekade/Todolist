import React from 'react';
import {FilterValuesType, TaskType} from "../../App";
import {Button} from "../button/Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

export const Todolist = ({title, tasks, date, removeTask, changeFilter}: PropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title='+'/>
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