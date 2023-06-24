// React
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

// Typings
import { QuizSchema, QuizItem } from "@/types/typings";

// Components
import DraggableList from "./DraggableList";
import NextButton from "./NextButton";

// Lib
import setQuizOptions from "@/lib/setQuizOptions";

interface QuizMatchProps {
    questionData: QuizSchema;
    setScore: Dispatch<SetStateAction<number>>
    onNextQuestion: () => void
}

const QuizMatch: FC<QuizMatchProps> = ({ questionData, setScore, onNextQuestion }) => {

    const [selectedOrder, setSelectedOrder] = useState<QuizItem[]>([]);


    // Check if answer is correct
    //
    const checkWin = () => {
        if (!questionData || !questionData.options || !questionData.options_right) return;
        let passed = true;

        for (let i = 0; i < questionData.options.length; i++) {
            if (selectedOrder[i].id !== questionData.correct_answer[i]) {
                passed = false;
                break;
            }
        }
        if (passed) setScore((prev) => prev + 1);

        onNextQuestion();
    }


    // Set order as defined by quiz options
    //
    useEffect(() => {
        if (!questionData || !questionData.options || !questionData.options_right) return;

        const rightOptions = setQuizOptions(questionData.options_right);

        setSelectedOrder(rightOptions);

    }, [questionData?.question, questionData]);


    return (
        <>
            <div className="mb-6 flex gap-10">

                <div className="flex flex-col gap-4">
                    {questionData.options.map((option, index) => (
                        <div key={index} className="bg-white p-3">
                            {option}
                        </div>
                    ))}
                </div>

                <DraggableList
                    items={selectedOrder}
                    setItems={setSelectedOrder}
                />
            </div>

            <NextButton onClick={checkWin} />
        </>
    )
}

export default QuizMatch;