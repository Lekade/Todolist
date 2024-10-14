import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

export type AddItemFormType = {
  addItem: (itemTitle: string) => Promise<any>
  disabled?: boolean
}

export const AddItemForm = memo(({ addItem, disabled }: AddItemFormType) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)
  const ChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(null)
  }
  const addItemHandler = () => {
    const trimTitle = title.trim()
    if (trimTitle) {
      if (trimTitle.length > 100) {
        return setError("You have more than 100 characters")
      }
      error && setError(null)
      addItem(trimTitle).then(() => setTitle(""))
    } else {
      setError("The field is required")
    }
  }
  const keyDownAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && addItemHandler()
  }

  const buttonStyles = {
    maxWidth: "38px",
    minWidth: "38px",
    minHeight: "38px",
    maxHeight: "38px",
  }

  return (
    <>
      <div>
        <TextField
          error={!!error}
          disabled={disabled}
          id="outlined-basic"
          label={error ? error : "Entar at title"}
          variant="outlined"
          onChange={ChangeInputHandler}
          onKeyDown={keyDownAddItemHandler}
          value={title}
          size="small"
        />
        <Button disabled={disabled} sx={buttonStyles} variant="contained" onClick={addItemHandler} size="small">
          +
        </Button>
      </div>
    </>
  )
})
