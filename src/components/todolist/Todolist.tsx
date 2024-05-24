import React from 'react';
import {TaskType} from "../../App";
import {Button} from "../button/Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    date?: string
}

export const Todolist = ({ title, tasks, date }: PropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <Button title='+'/>
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p> :
                    <ul>
                        {tasks.map(task => {
                            return(
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone} />
                                    <span>{task.title}</span>
                                </li>
                            )
                        })}
                    </ul>
            }

            <div>
                <Button title='All'/>
                <Button title='Active'/>
                <Button title='Completed'/>
            </div>
            <div>{date}</div>
        </div>
    )
}