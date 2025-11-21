// components/ui/button.tsx - Optimizado para Next.js 15
"use client"

import * as React from "react"
import Link from "next/link"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "bg-background hover:bg-success/50 hover:text-white border hover:transition-ease-in-out text-foreground/80",
        link: "text-primary underline-offset-4 hover:underline",
        letter: "bg-success/80 hover:bg-success/50 hover:text-white border hover:transition-ease-in-out",
        maps: "bg-cyan-600 hover:bg-cyan-700 focus-visible:ring-cyan-500 text-white hover:scale-[1.02]",
        phone: "bg-green-600 hover:bg-green-700 focus-visible:ring-green-500 text-white hover:scale-[1.02]",
        website: "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500 text-white hover:scale-[1.02]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-md px-8 has-[>svg]:px-6",
        newsletter: "h-[3.5rem] px-5.5 py-3.5 has-[>svg]:px-4",
        action: "h-14",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
  external?: boolean
  icon?: React.ReactNode
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  href,
  external = false,
  icon,
  children,
  ...props
}: ButtonProps) {
  const classes = cn("group", buttonVariants({ variant, size, className }))

  const iconElement = icon ? (
    <div className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
      {icon}
    </div>
  ) : null

  // Si hay href y es externo, usar <a>
  if (href && external) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={props["aria-label"]}
      >
        {iconElement}
        {children}
      </Link>
    )
  }

  // Si hay href y es interno, usar Link de Next.js
  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={props["aria-label"]}
      >
        {iconElement}
        {children}
      </Link>
    )
  }

  // Si asChild está activado, usar Slot (debe tener UN solo hijo React element)
  if (asChild) {
    return (
      <Slot className={classes} {...props}>
        {children}
      </Slot>
    )
  }

  // Renderizar botón normal
  return (
    <button
      data-slot="button"
      className={classes}
      {...props}
    >
      {iconElement}
      {children}
    </button>
  )
}

export { Button, buttonVariants }