import { cva } from "class-variance-authority"

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-[2px] active:shadow-none",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:bg-primary/90 hover:-translate-y-0.5",
                destructive: "bg-destructive text-destructive-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:bg-destructive/90 hover:-translate-y-0.5",
                outline: "border-[3px] border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:bg-muted hover:-translate-y-0.5",
                secondary: "bg-secondary text-secondary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:bg-secondary/80 hover:-translate-y-0.5",
                ghost: "hover:bg-muted hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export const badgeVariants = cva(
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)
