"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        primary: "",

        // Soft-filled secondary invitation
        soft: "bg-muted text-foreground hover:bg-muted/80",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean

  /** 
   * If provided, the Button will navigate via router.push
   * and render as a real <button> (NOT an <a>)
   * This fixes Lighthouse contrast false-positives.
   */
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, href, onClick, ...props },
    ref
  ) => {
    const router = useRouter()

    const resolvedVariant = variant ?? "default"
    const Comp = asChild && !href ? Slot : "button"

    // WCAG-safe primary lock (dark green)
    const primaryLock =
      resolvedVariant === "default" || resolvedVariant === "primary"
        ? "bg-[hsl(var(--primary-cta))] text-[hsl(var(--primary-cta-foreground))] hover:bg-[hsl(var(--primary-cta)/0.9)]"
        : undefined

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      if (onClick) onClick(e)
      if (href) router.push(href)
    }

    return (
      <Comp
        ref={ref}
        onClick={href ? handleClick : onClick}
        className={cn(
          buttonVariants({ variant: resolvedVariant, size }),
          className,
          primaryLock
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
