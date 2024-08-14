import React, {memo, useCallback, useMemo} from 'react';
import {FilterValuesType, TaskType, TodoListType} from "../../App";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {TransformTitle} from "../transformTItle/TransformTitle";
import {Task} from "../task/Task";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import ButtonGroup from "@mui/material/ButtonGroup";
import {addTaskAC} from "../../store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/Store";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "../../store/todolists-reducer";
import {MemoButton} from "../button/MemoButton";

type TodolistPropsType = {
    todolist: TodoListType
}

export const Todolist = memo(({todolist}: TodolistPropsType) => {
    console.log('render todolist')
    const {todolistId, filter, title} = todolist
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])

    const removeToDoList = useCallback(() => {
        dispatch(RemoveTodolistAC(todolistId))
    }, [dispatch])

    const changeToDoListTitle = useCallback((newToDoListTitle: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, newToDoListTitle))
    }, [dispatch])
    const addTask = useCallback((taskTitle: string) => {
        dispatch(addTaskAC(todolistId, taskTitle))
    }, [dispatch])
    const changeTaskFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(todolistId, filter))
    }

    const onAllClickHandler = useCallback(() => {
        changeTaskFilter('all', todolistId)
    }, [])
    const onActiveClickHandler = useCallback(() => {
        changeTaskFilter('active', todolistId)
    }, [])
    const onCompletedClickHandler = useCallback(() => {
        changeTaskFilter('completed', todolistId)
    }, [])

    const filtredTasks: TaskType[] = useMemo(()=> {
        if (filter === 'active') {
           return  tasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
           return  tasks.filter(task => task.isDone)
        }
        return tasks
    }, [filter, tasks])

    return (
        <div className='todolist'>
            <TitleTodolistBlock>
                <TransformTitle title={title} changeTitle={changeToDoListTitle}/>
                <IconButton aria-label="delete" onClick={removeToDoList} size="large">
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </TitleTodolistBlock>
            <AddItemForm addItem={addTask}/>
            {
                filtredTasks.length === 0
                    ? <p>Your taskslist is empty</p> :
                    <TasksContainer>
                        {filtredTasks.map(task => {
                            return <Task
                                key={task.taskId}
                                todolistId={todolistId}
                                task={task}
                            />
                        })}
                    </TasksContainer>
            }
            <ButtonGroup sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <MemoButton onClick={onAllClickHandler}
                        variant={filter === 'all' ? "outlined" : "contained"} color={"primary"}>All</MemoButton>
                <MemoButton onClick={onActiveClickHandler}
                        variant={filter === 'active' ? "outlined" : "contained"} color={'primary'}>Active</MemoButton>
                <MemoButton onClick={onCompletedClickHandler}
                        variant={filter === 'completed' ? "outlined" : "contained"} color={'primary'}>Completed</MemoButton>
            </ButtonGroup>
        </div>
    )
})

const TasksContainer = styled.ul`
  padding-left: 0;
`
const TitleTodolistBlock = styled.div`
  margin-bottom: 25px;
`