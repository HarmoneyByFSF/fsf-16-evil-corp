// React
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

// Typings
import { QuizSchema } from "@/types/typings";
import NextButton from "./NextButton";
import RadioCard from "./RadioCard";

interface QuizMcqProps {
    questionData: QuizSchema;
    setScore: Dispatch<SetStateAction<number>>;
    onNextQuestion: () => void;
}

const QuizMcq: FC<QuizMcqProps> = ({ questionData, setScore, onNextQuestion }) => {

    const [selectedOption, setSelectedOption] = useState<number | null>(null);


    const onOptionChange = (index: number) => {
        setSelectedOption(index);
    };

    const checkWin = () => {

        if (selectedOption === questionData.correct_answer[0]) {
            setScore((prev) => prev + 1);
        }

        onNextQuestion();
    };

    useEffect(() => {

        setSelectedOption(null);

    }, [questionData?.question]);

    return (
        <>
            <div className="mb-10 grid grid-cols-2 gap-4">
                {questionData.options.map((option: any, index: any) => (
                    <RadioCard
                        key={index}
                        checked={selectedOption === index}
                        onChange={() => onOptionChange(index)}
                        className=""
                    >
                        {option}
                    </RadioCard>
                ))}
            </div>

            <NextButton onClick={checkWin} />
        </>
    );
}

export default QuizMcq;