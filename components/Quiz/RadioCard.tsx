// React
import React from 'react';

// Utils
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from "@/lib/utils"
import { TbCheck } from 'react-icons/tb';

const radioVariants = cva(
    'radio relative cursor-pointer select-none flex-1 flex items-center py-3 px-4 text-sm font-semibold ',
    {
        variants: {
            variant: {
                default: '',
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
)

export interface Props
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof radioVariants> { }


const RadioCard = ({ children, className, variant, ...props }: Props) => {
    return (
        <div className="flex items-center backdrop-blur-3xl bg-black/20 rounded-xl">
            <label className={cn(radioVariants({ className, variant }))}>
                <input type="radio" {...props} className='hidden' />
                <Checkmark />
                {children}
            </label>
        </div>
    )
}

const Checkmark = () => {
    return (
        <span className="checkmark shrink-0 inline-block w-5 h-5 mr-4 rounded-full border border-white opacity-20 overflow-hidden">
            <TbCheck strokeWidth={2} className='checkmark-icon hidden w-full h-full p-[2px] text-black' />
        </span>
    )
}

export default RadioCard;