import React from 'react';
import {FilterValuesType, TaskType} from "../../App";
import AddItemForm from "../addItemForm/addItemForm";
import {TransformTitle} from "../transformTItle/TransformTitle";
import {Task} from "../task/Task";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import ButtonGroup from "@mui/material/ButtonGroup";

type PropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (taskTitle: string, todoListId: string) => void
    changeStatusTask: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeToDoList: (todoListId: string) => void
    changeToDoListTitle: (newToDoListTitle: string, todoListId: string) => void
    changeTaskTitle: (newTaskTitle: string, taskId: string, todoListId: string) => void
}

export const Todolist = ({
                             todoListId,
                             title,
                             tasks,
                             removeTask,
                             changeTaskFilter,
                             addTask,
                             changeStatusTask,
                             filter,
                             removeToDoList,
                             changeToDoListTitle,
                             changeTaskTitle
                         }: PropsType) => {
    const removeToDoListHandler = () => {
        removeToDoList(todoListId)
    }
    const addTaskHandler = (taskTitle: string) => {
        addTask(taskTitle, todoListId)
    }
    const changeToDoListTitleHandler = (newToDoListTitle: string) => {
        changeToDoListTitle(newToDoListTitle, todoListId)
    }
    const changeTaskTitleHandler = (newTaskTitle: string, taskId: string) => {
        changeTaskTitle(newTaskTitle, taskId, todoListId)
    }
    const changeStatusTaskHandler = (taskId: string, isDone: boolean) => {
        changeStatusTask(taskId, isDone, todoListId)
    }


    return (
        <div className='todolist'>
            <TitleTodolistBlock>
                <TransformTitle changeTitle={newTitle => changeToDoListTitleHandler(newTitle)} title={title}/>
                <IconButton aria-label="delete" onClick={removeToDoListHandler} size="large">
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </TitleTodolistBlock>
            <AddItemForm addItem={(itemTitle) => addTaskHandler(itemTitle)}/>
            {
                tasks.length === 0
                    ? <p>Your taskslist is empty</p> :
                    <TasksContainer>
                        {tasks.map(task => {
                            return <Task
                                key={task.taskId}
                                taskId={task.taskId}
                                isDone={task.isDone}
                                title={task.title}
                                changeStatusTask={isDone => changeStatusTaskHandler(task.taskId, isDone)}
                                changeTaskTitleHandler={newTaskTitle => changeTaskTitleHandler(newTaskTitle, task.taskId)}
                                removeTask={() => removeTask(task.taskId, todoListId)}
                            />
                        })}
                    </TasksContainer>
            }
            <ButtonGroup sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Button onClick={() => changeTaskFilter('all', todoListId)} variant={filter === 'all' ? "outlined" : "contained"} color={"primary"}>All</Button>
                <Button onClick={() => changeTaskFilter('active', todoListId)} variant={filter === 'active' ? "outlined" : "contained"} color={'primary'}>Active</Button>
                <Button onClick={() => changeTaskFilter('completed', todoListId)} variant={filter === 'completed' ? "outlined" : "contained"} color={ 'primary'}>Completed</Button>
            </ButtonGroup>
        </div>
    )
}


const TasksContainer = styled.ul`
  padding-left: 0;
`
const TitleTodolistBlock = styled.div`
    margin-bottom: 25px;
`



