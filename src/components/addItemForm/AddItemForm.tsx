import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export type AddItemFormType = {
    addItem: (itemTitle: string) => void
}

export const AddItemForm = memo(({addItem}: AddItemFormType) => {
    console.log('render addItemForm')
    const [inputText, setInputText] = useState('')
    const [error, setError] = useState(false)
    const ChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
        setError(false)
    }
    const addItemHandler = () => {
        if (inputText.trim()) {
            error && setError(false)
            addItem(inputText.trim())
            setInputText('')
        } else {
            setError(true)
        }
    }
    const keyDownAddTaskInput = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addItemHandler()
    }

    const buttonStyles = {
        maxWidth: '38px',
        minWidth: '38px',
        minHeight: '38px',
        maxHeight: '38px'
    }

    return (
        <>
            <div>
                <TextField
                    error={!!error}
                    id="outlined-basic"
                    label={error ? 'The field is required' : "Entar at title"}
                    variant="outlined"
                    onChange={ChangeInputHandler}
                    onKeyDown={keyDownAddTaskInput}
                    value={inputText}
                    size="small"
                />
                <Button sx={buttonStyles} variant="contained" onClick={addItemHandler} size="small">+</Button>
            </div>
        </>
    );
});