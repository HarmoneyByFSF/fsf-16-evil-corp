import { FC } from "react";
import { youthData } from "@/data/quizzes/youth";
import QuizManager from "@/components/Quiz/QuizManager";
import { Quiz } from "@/types/enums";

interface TheQuizProps {

}

const TheQuiz: FC<TheQuizProps> = () => {

    return (
        <>
            <QuizManager data={youthData} quizName={Quiz.youth} />
        </>
    );
}

export default TheQuiz;