"use client"

import React from "react"
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField"

export type TextFieldProps = MuiTextFieldProps

export default function TextField(props: TextFieldProps) {
  return (
    <MuiTextField variant="outlined" fullWidth margin="normal" {...props} />
  )
}
