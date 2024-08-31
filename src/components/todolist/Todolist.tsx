import React, {memo, useCallback, useMemo} from 'react';
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
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC,
    TodolistDomainType
} from "../../store/todolists-reducer";
import {MemoButton} from "../button/MemoButton";
import {TaskStatuses, TaskType} from "../../api/todolists-api";

type TodolistPropsType = {
    todolist: TodolistDomainType
}

export const Todolist = memo(({todolist}: TodolistPropsType) => {
    console.log('render todolist')
    const {id, filter, title} = todolist
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    const removeToDoList = useCallback(() => {
        dispatch(RemoveTodolistAC(id))
    }, [dispatch])

    const changeToDoListTitle = useCallback((newToDoListTitle: string) => {
        dispatch(ChangeTodolistTitleAC(id, newToDoListTitle))
    }, [dispatch])
    const addTask = useCallback((taskTitle: string) => {
        dispatch(addTaskAC(id, taskTitle))
    }, [dispatch])
    const changeTaskFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(todolistId, filter))
    }

    const onAllClickHandler = useCallback(() => {
        changeTaskFilter('all', id)
    }, [])
    const onActiveClickHandler = useCallback(() => {
        changeTaskFilter('active', id)
    }, [])
    const onCompletedClickHandler = useCallback(() => {
        changeTaskFilter('completed', id)
    }, [])

    const filtredTasks: TaskType[] = useMemo(()=> {
        if (filter === 'active') {
           return  tasks.filter(task => task.status === TaskStatuses.New )
        }
        if (filter === 'completed') {
           return  tasks.filter(task => task.status === TaskStatuses.Completed)
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
                                key={task.id}
                                todolistId={id}
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