//React
import React from 'react';

// Utils
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from "@/lib/utils"

const boxVariants = cva(
    'shrink-0 relative',
    {
        variants: {
            variant: {
                solid: 'backdrop-blur-sm bg-black/30',
                border: 'border border-border-light dark:border-border-dark',
                white: 'bg-white dark:bg-neutral-900'
            },
            rounded: {
                default: 'rounded-lg',
                xl: 'rounded-xl'
            },
            space: {
                default: 'p-4',
                sm: 'p-2'
            }
        },
        defaultVariants: {
            variant: 'solid',
            rounded: 'default',
            space: 'default'
        }
    }
)

export interface Props
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> { }


const Box = ({ className, children, variant, rounded, space, ...props }: Props) => {
    return (
        <div className={cn(boxVariants({ className, variant, rounded, space }))} {...props}>
            {children}
        </div>
    )
}

export default Box;