import React, { memo } from "react"
import Button from "@mui/material/Button"
import { ButtonProps } from "@mui/material/Button/Button"

type MemoPropsType = {} & ButtonProps

export const MemoButton = memo(({ children, ...props }: MemoPropsType) => {
  console.log("return button")
  return <Button {...props}>{children}</Button>
})
