import React, {memo, useCallback} from 'react';
import {TransformTitle} from "../transformTItle/TransformTitle";
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import {changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "../../store/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskType} from "../../App";

type TaskPropsType = {
    task: TaskType
    todoListId: string
}

export const Task = memo(({task, todoListId }:TaskPropsType) => {
    console.log('render task')
    const {taskId, isDone, title} = task
    const dispatch = useDispatch()

    const removeTask = useCallback( () => {
        dispatch(removeTaskAC(taskId, todoListId))
    }, [dispatch])
    const changeStatusTask = useCallback( (isDone: boolean) => {
        dispatch(changeStatusTaskAC(taskId, isDone, todoListId))
    }, [dispatch])
    const changeTaskTitle = useCallback((newTaskTitle: string) => {
        dispatch(changeTitleTaskAC(newTaskTitle, taskId, todoListId))
    }, [dispatch])

    return (
        <ListItem sx={{
            p: 0,
            justifyContent: 'space-between',
            opacity: isDone ? 0.5 : 1,
        }}>
            <Checkbox onChange={e => changeStatusTask(e.currentTarget.checked)} checked={isDone}/>
            <TransformTitle style={isDone ? 'task-done' : 'task'}  changeTitle={changeTaskTitle} title={title}/>
            <IconButton aria-label="delete" onClick={removeTask}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
});

