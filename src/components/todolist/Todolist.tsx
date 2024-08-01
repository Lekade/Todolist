import React, {memo, useCallback, useMemo} from 'react';
import {FilterValuesType, TaskType, TodoListType} from "../../App";
import AddItemForm from "../addItemForm/addItemForm";
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
    todoList: TodoListType
}

export const Todolist = memo(({todoList}: TodolistPropsType) => {
    console.log('render todolist')
    const {todoListId, filter, title} = todoList
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todoListId])

    const removeToDoList = useCallback(() => {
        dispatch(RemoveTodolistAC(todoListId))
    }, [dispatch])

    const changeToDoListTitle = useCallback((newToDoListTitle: string) => {
        dispatch(ChangeTodolistTitleAC(todoListId, newToDoListTitle))
    }, [dispatch])
    const addTask = useCallback((taskTitle: string) => {
        dispatch(addTaskAC(todoListId, taskTitle))
    }, [dispatch])
    const changeTaskFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC(todoListId, filter))
    }

    const onAllClickHandler = useCallback(() => {
        changeTaskFilter('all', todoListId)
    }, [])
    const onActiveClickHandler = useCallback(() => {
        changeTaskFilter('active', todoListId)
    }, [])
    const onCompletedClickHandler = useCallback(() => {
        changeTaskFilter('completed', todoListId)
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
                                todoListId={todoListId}
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