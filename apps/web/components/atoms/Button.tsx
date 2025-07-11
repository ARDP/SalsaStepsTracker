"use client"

import React from "react"
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button"

export type ButtonVariant = "contained" | "outlined" | "text"

export interface ButtonProps extends MuiButtonProps {
  variant?: ButtonVariant
  children: React.ReactNode
}

export default function Button({
  variant = "contained",
  children,
  ...props
}: ButtonProps) {
  return (
    <MuiButton variant={variant} {...props}>
      {children}
    </MuiButton>
  )
}
