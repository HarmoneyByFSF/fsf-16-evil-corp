import { FC, MouseEventHandler } from "react";
import { Button } from "../ui/button";
import { TbArrowNarrowRight } from "react-icons/tb";

interface NextButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>
}

const NextButton: FC<NextButtonProps> = ({ onClick }) => {
    return (
        <div className="flex justify-center">
            <Button onClick={onClick} size='lg' className="rounded-full" variant='secondary'>
                Next
                <TbArrowNarrowRight size={24} strokeWidth={1.5} className="ml-2" />
            </Button>
        </div>
    );
}

export default NextButton;