import React, {memo, useCallback} from 'react';
import {TransformTitle} from "../transformTItle/TransformTitle";
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import { removeTask, updateTasksTC} from "../../store/tasks-reducer";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {useAppDispatch} from "../../store/Store";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({task, todolistId }:TaskPropsType) => {
    console.log('render task')
    const {id, status, title} = task
    const dispatch = useAppDispatch();

    const removeTaskHandler = useCallback( () => {
        dispatch(removeTask(todolistId, id))
    }, [dispatch])

    const changeStatusTask = useCallback( (isDone: boolean) => {
        const status = isDone ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTasksTC(task, 'status', status))
    }, [dispatch])
    const changeTaskTitle = useCallback((newTaskTitle: string) => {
        dispatch(updateTasksTC(task,'title', newTaskTitle))
    }, [dispatch])



    return (
        <ListItem sx={{
            p: 0,
            justifyContent: 'space-between',
            opacity: status ? 0.5 : 1,
        }}>
            <Checkbox onChange={e => changeStatusTask(e.currentTarget.checked)} checked={status > 0}/>
            <TransformTitle style={status ? 'task-done' : 'task'}  changeTitle={changeTaskTitle} title={title}/>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
});

