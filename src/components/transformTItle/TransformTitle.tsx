import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";
import Input from '@mui/material/Input';

type TransformTitleType = {
    title: string
    changeTitle: (newTitle: string) => void
    style?: string
}

export const TransformTitle = ({title, changeTitle, style}: TransformTitleType) => {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState<string>(title)
    const editModeHandler = () => {
        setEditMode(!editMode)
        changeTitle(inputValue)
    }
    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (
        editMode
            ? <Input defaultValue="Error" value={inputValue} onChange={changeInputHandler} onBlur={editModeHandler} autoFocus/>
            : <Title className={style} onDoubleClick={editModeHandler}>{title}</Title>
    );
};


const Title = styled.h3`
  display: inline-block;
`
