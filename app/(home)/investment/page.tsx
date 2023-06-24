import { FC } from "react";
import { investmentData } from "@/data/quizzes/investment";
import QuizManager from "@/components/Quiz/QuizManager";
import { Quiz } from "@/types/enums";

interface TheQuizProps {

}

const TheQuiz: FC<TheQuizProps> = () => {

    return (
        <>
            <QuizManager data={investmentData} quizName={Quiz.investment} />
        </>
    );
}

export default TheQuiz;