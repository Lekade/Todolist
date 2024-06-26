import React from 'react';
import {TransformTitle} from "../transformTItle/TransformTitle";

type TaskType = {
    taskId: string
    isDone: boolean
    title: string
    changeStatusTask: (checked: boolean) => void
    changeTaskTitleHandler: (newTitle: string) => void
    removeTask: (taskId: string) => void
}

const Task = ({taskId, isDone, title, changeStatusTask, changeTaskTitleHandler, removeTask}:TaskType) => {
    return (
        <li>
            <input type="checkbox"
                   onChange={e => changeStatusTask(e.currentTarget.checked)}
                   checked={isDone}/>
            <TransformTitle style={isDone ? 'task-done' : 'task'}  changeTitle={newTitle =>  changeTaskTitleHandler(newTitle)} title={title}/>
            <button onClick={() => removeTask(taskId)}>X</button>
        </li>
    );
};

export default Task;