import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../button/Button";

type AddItemFormType = {
    addItem: (itemTitle: string) => void
}

const AddItemForm = ({addItem}:AddItemFormType ) => {
    const [inputText, setInputText] = useState('')
    const[error, setError] = useState(false)
    const ChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setInputText(e.currentTarget.value)
        setError(false)
    }
    const addItemHandler = () => {
        if(inputText.trim()){
            setError(false)
            addItem(inputText.trim())
            setInputText('')
        }else {
            setError(true)
        }
    }
    const keyDownAddTaskInput = (e:KeyboardEvent<HTMLInputElement>) =>{
        e.key === 'Enter' && addItemHandler()
    }
    return (
        <>
            <div>
                <input className={error ? 'error-input' : ''} onChange={ChangeInputHandler} onKeyDown={keyDownAddTaskInput} value={inputText} />
                <Button onClickHandler={addItemHandler} title='+'/>
            </div>
            {error && <div className='error'>The field is required</div>}
        </>
    );
};

export default AddItemForm;