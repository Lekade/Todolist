import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {AddItemForm, AddItemFormType} from './AddItemForm';
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {ReduxStoreProviderAndThemeDecorator} from "../../store/decorators/ReduxStoreProviderDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    addItem:{
      description: 'Button clicked inside form',
      // action: 'clicked' // способ № 1
    }
  },
  // способ № 2
  args: {
    addItem: fn()
  },
  decorators: [ReduxStoreProviderAndThemeDecorator]

  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};
export default meta;
type Story = StoryObj<typeof meta>;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const AddItemFormStory: Story = {
  // способ № 3
  // args: {
  //   addItem: fn() // можно еще action('clicked')
  // }
}

const AddItemFormError = memo(({addItem}: AddItemFormType) => {
  const [inputText, setInputText] = useState('')
  const [error, setError] = useState(true)
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

export const AddItemFormErrorStory: Story = {
  render: (args) => <AddItemFormError addItem={args.addItem}/>
}