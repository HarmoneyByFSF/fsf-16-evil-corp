'use client';

// React
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Typings
import { QuizSchema } from "@/types/typings";
import { QuestionType, Quiz } from "@/types/enums";
import QuizMcq from "./QuizMcq";
import QuizSort from "./QuizSort";
import QuizMatch from "./QuizMatch";
import { levelsData } from "@/data/levels/levelsData";
import { useDB } from "@/context/LocalDbContext";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

interface QuizManagerProps {
    data: any;
    quizName: Quiz
}

const QuizManager: FC<QuizManagerProps> = ({ data: quizData, quizName }) => {

    const [quizQuestions, setQuizQuestions] = useState<QuizSchema[]>(quizData);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<QuizSchema>();
    const [totalQuestions, setTotalQuestions] = useState<(number)>(0);

    const [score, setScore] = useState<(number)>(0);
    const [quizEnded, setQuizEnded] = useState<boolean>(false);

    let baseScore = 15;


    const { profile, createProfile, updateProfile } = useDB();

    const router = useRouter();

    // Set first question and total questions
    const setQuestion = () => {
        setCurrentQuestion(quizQuestions[0]);
        setTotalQuestions(quizQuestions.length);
    }


    // Go to next question or end quiz
    const onNextQuestion = () => {
        if (currentQuestionIndex + 1 < totalQuestions) {
            setCurrentQuestion(quizQuestions[currentQuestionIndex + 1]);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizEnded(true);
        }
    }

    // Restart Quiz
    const onRestartQuiz = () => {
        if (!quizQuestions) return;

        setCurrentQuestionIndex(0);
        setCurrentQuestion(quizQuestions[0]);
        setScore(0);
        setQuizEnded(false);
    };


    // Award points when quiz is completed
    const awardPoints = () => {
        if (score === 0 || !profile) return;

        const gainedXp = score * baseScore;
        const updatedXp = profile.xp + gainedXp;

        //check if reached next level        
        let updatedLevel = profile.level;

        while (levelsData[updatedLevel] && updatedXp >= levelsData[updatedLevel].minXp) {
            updatedLevel = levelsData[updatedLevel].level;
        }

        updateProfile(updatedLevel, updatedXp, quizName);

    }

    // UseEffect to set the first question
    useEffect(() => {
        setQuestion();
    }, []);

    // UseEffect to award points when quiz ends
    useEffect(() => {
        if (!quizEnded) return;
        awardPoints();
    }, [quizEnded]);

    const quiz = () => {

        return (
            <>
                <h1 className="mb-10 scroll-m-20 text-center text-lg sm:text-2xl tracking-tight">
                    {currentQuestion && currentQuestion.question}
                </h1>

                {/* If question is MCQ */}
                {currentQuestion && currentQuestion.type === QuestionType.mcq &&
                    <QuizMcq
                        questionData={currentQuestion}
                        setScore={setScore}
                        onNextQuestion={onNextQuestion}
                    />
                }

                {/* If question is SORT */}
                {currentQuestion && currentQuestion.type === QuestionType.sort &&
                    <QuizSort
                        questionData={currentQuestion}
                        setScore={setScore}
                        onNextQuestion={onNextQuestion}
                    />
                }

                {/* If question is MATCH */}
                {currentQuestion && currentQuestion.type === QuestionType.match &&
                    <QuizMatch
                        questionData={currentQuestion}
                        setScore={setScore}
                        onNextQuestion={onNextQuestion}
                    />
                }
            </>
        )
    }

    const userScore = () => {
        return (
            <div className="text-center">
                <h3 className="text-2xl mb-4">Your score: {score}/{totalQuestions}</h3>
                <div className="flex justify-center gap-4">
                    <Button onClick={onRestartQuiz}>
                        Restart Quiz
                    </Button>

                    <Link href='/' className={buttonVariants({ variant: "secondary" })}>
                        Quit Game
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="min-h-[calc(100vh_-_250px)] flex flex-col justify-center">
                <div className="container md:max-w-[735px]">
                    {quizEnded ? userScore() : quiz()}
                </div>
            </div>
        </>
    );
}

export default QuizManager;