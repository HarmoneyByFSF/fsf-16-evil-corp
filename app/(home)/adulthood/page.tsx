import { FC } from "react";
import { adulthoodData } from "@/data/quizzes/adulthood";
import QuizManager from "@/components/Quiz/QuizManager";
import { Quiz } from "@/types/enums";

interface TheQuizProps {

}

const TheQuiz: FC<TheQuizProps> = () => {

    return (
        <>
            <QuizManager data={adulthoodData} quizName={Quiz.adulthood} />
        </>
    );
}

export default TheQuiz;