"use client"

import * as React from "react"
import Link from "next/link"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium  hover:transition-all duration-300 ease-in-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
    "rounded-xl",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm " +
          "hover:bg-primary/85 hover:shadow-md hover:shadow-primary/25 " +
          "active:scale-[0.98] active:shadow-none",

        destructive:
          "bg-destructive text-destructive-foreground shadow-sm " +
          "hover:bg-destructive/85 hover:shadow-md hover:shadow-destructive/25 " +
          "active:scale-[0.98]",

        outline:
          "border border-border bg-background text-foreground/80 shadow-sm " +
          "hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md hover:shadow-primary/20 " +
          "active:scale-[0.98]",

        secondary:
          "bg-secondary text-secondary-foreground shadow-sm " +
          "hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20 " +
          "active:scale-[0.98]",

        ghost:
          "bg-background hover:bg-primary/50 hover:text-white border hover:transition-all duration-300 ease-in-out text-foreground/80",

        link:
          "text-primary underline-offset-4 hover:underline hover:text-primary/80",

        pet:
          "bg-pet text-pet-foreground shadow-sm " +
          "hover:bg-pet/85 hover:shadow-md hover:shadow-pet/25 " +
          "active:scale-[0.98]",

        letter:
          "border border-success/30 bg-success/10 text-success " +
          "hover:bg-success hover:text-success-foreground hover:border-success hover:shadow-md hover:shadow-success/20 " +
          "active:scale-[0.98]",

        maps:
          "bg-maps/10 text-maps border border-maps/30 " +
          "hover:bg-maps hover:text-maps-foreground hover:border-maps hover:shadow-md hover:shadow-maps/25 hover:scale-[1.02] " +
          "active:scale-[0.98]",

        phone:
          "bg-phone/10 text-phone border border-phone/30 " +
          "hover:bg-phone hover:text-phone-foreground hover:border-phone hover:shadow-md hover:shadow-phone/25 hover:scale-[1.02] " +
          "active:scale-[0.98]",

        website:
          "bg-website/10 text-website border border-website/30 " +
          "hover:bg-website hover:text-website-foreground hover:border-website hover:shadow-md hover:shadow-website/25 hover:scale-[1.02] " +
          "active:scale-[0.98]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 px-6 has-[>svg]:px-4",
        xl: "h-12 px-8 text-base has-[>svg]:px-6",
        newsletter: "h-14 px-6 py-3.5 text-base has-[>svg]:px-4",
        action: "h-14 px-6 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
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
    <span
      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden="true"
    >
      {icon}
    </span>
  ) : null

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

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={props["aria-label"]}>
        {iconElement}
        {children}
      </Link>
    )
  }

  if (asChild) {
    return (
      <Slot className={classes} {...props}>
        {children}
      </Slot>
    )
  }

  return (
    <button data-slot="button" className={classes} {...props}>
      {iconElement}
      {children}
    </button>
  )
}

export { Button, buttonVariants }