import { FC } from "react";
import { moneyEssentialsData } from "@/data/quizzes/money-essentials";
import QuizManager from "@/components/Quiz/QuizManager";
import { Quiz } from "@/types/enums";

interface TheQuizProps {

}

const TheQuiz: FC<TheQuizProps> = () => {

    return (
        <>
            <QuizManager data={moneyEssentialsData} quizName={Quiz.moneyEssentials} />
        </>
    );
}

export default TheQuiz;