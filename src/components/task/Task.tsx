import React from 'react';
import {TransformTitle} from "../transformTItle/TransformTitle";
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';

type TaskType = {
    taskId: string
    isDone: boolean
    title: string
    changeStatusTask: (checked: boolean) => void
    changeTaskTitleHandler: (newTitle: string) => void
    removeTask: (taskId: string) => void
}

export const Task = ({taskId, isDone, title, changeStatusTask, changeTaskTitleHandler, removeTask}:TaskType) => {
    return (
        <ListItem sx={{
            p: 0,
            justifyContent: 'space-between',
            opacity: isDone ? 0.5 : 1,
        }}>
            <Checkbox onChange={e => changeStatusTask(e.currentTarget.checked)} checked={isDone}/>
            <TransformTitle style={isDone ? 'task-done' : 'task'}  changeTitle={newTitle =>  changeTaskTitleHandler(newTitle)} title={title}/>
            <IconButton aria-label="delete" onClick={() => removeTask(taskId)}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
};

