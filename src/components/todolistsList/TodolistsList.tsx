import React, {useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../addItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "../todolist/Todolist";
import {addTodolist, getTodolists, TodolistDomainType} from "../../store/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../store/Store";

export const TodolistsList = () => {
    console.log('render TodolistsList')

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const dispatch = useAppDispatch();

    const addTodolistHandler = useCallback( (titleTodoList: string) => {
        dispatch(addTodolist(titleTodoList))
    }, [dispatch])

    useEffect(()=>{
        dispatch(getTodolists())
    },[])


    return (
        <>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolistHandler}/>
            </Grid>
            <Grid container spacing={4}>
                {todolists.map(tl => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper elevation={6} sx={{p: '30px'}}>
                                <Todolist
                                    todolist={tl}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
};