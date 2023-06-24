// React
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

// Typings
import { QuizSchema, QuizItem } from "@/types/typings";

// Components
import DraggableList from "./DraggableList";
import NextButton from "./NextButton";

// Lib
import setQuizOptions from "@/lib/setQuizOptions";


interface QuizSortProps {
    questionData: QuizSchema;
    setScore: Dispatch<SetStateAction<number>>
    onNextQuestion: () => void
}

const QuizSort: FC<QuizSortProps> = ({ questionData, setScore, onNextQuestion }) => {


    const [selectedOrder, setSelectedOrder] = useState<QuizItem[]>([]);


    // Check if answer is correct
    //
    const checkWin = () => {
        if (!questionData || !questionData.options) return;

        let passed = true;
        // let correctAnswer: number[] = questionData.correctAnswer;

        for (let i = 0; i < questionData.options.length; i++) {
            if (selectedOrder[i].id != questionData.correct_answer[i]) {
                passed = false;
                break;
            }
        }

        if (passed) setScore((prev) => prev + 1);

        onNextQuestion();
    }

    // Initialize options as defined in the question data
    //
    useEffect(() => {
        if (!questionData || !questionData.options) return;

        const options = setQuizOptions(questionData.options);

        setSelectedOrder(options);

    }, [questionData?.options, questionData]);


    return (
        <>

            <div>
                <DraggableList
                    items={selectedOrder}
                    setItems={setSelectedOrder}
                />

                <NextButton onClick={checkWin} />
            </div>
        </>
    )

}

export default QuizSort;