import React, { ChangeEvent, memo, useState } from "react"
import styled from "styled-components"
import Input from "@mui/material/Input"

type Props = {
  title: string
  changeTitle: (newTitle: string) => void
  style?: string
  disabled?: boolean
}

export const TransformTitle = memo(({ title, changeTitle, style, disabled }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState<string>(title)
  const editModeHandler = () => {
    if (editMode) {
      changeTitle(newTitle)
    }
    if (!disabled) {
      setEditMode(!editMode)
    }
  }
  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  return editMode ? (
    <Input value={newTitle} onChange={changeTitleHandler} onBlur={editModeHandler} autoFocus />
  ) : (
    <Title className={style} onDoubleClick={editModeHandler}>
      {title}
    </Title>
  )
})

const Title = styled.h3`
  display: inline-block;
`
