import React, { ChangeEvent, memo, useState } from "react"
import styled from "styled-components"
import Input from "@mui/material/Input"

type TransformTitleType = {
  title: string
  changeTitle: (newTitle: string) => void
  style?: string
  disabled?: boolean
}

export const TransformTitle = memo(({ title, changeTitle, style, disabled }: TransformTitleType) => {
  console.log("render transformTitle")
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState<string>(title)
  const editModeHandler = () => {
    if (editMode) {
      changeTitle(inputValue)
    }
    if (!disabled) {
      setEditMode(!editMode)
    }
  }
  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return editMode ? (
    <Input value={inputValue} onChange={changeInputHandler} onBlur={editModeHandler} autoFocus />
  ) : (
    <Title className={style} onDoubleClick={editModeHandler}>
      {title}
    </Title>
  )
})

const Title = styled.h3`
  display: inline-block;
`
