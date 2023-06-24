'use client';

// React
import { useCallback, useEffect, useState } from "react";
import { TbStar, TbStarFilled, TbTrophy, TbTrophyFilled } from "react-icons/tb";
import { levelsData } from "@/data/levels/levelsData";
import { QuizSchema } from "@/types/typings";
import { useDB } from "@/context/LocalDbContext";
import { Quiz } from "@/types/enums";
import Box from "@/components/ui/box";
import WidgetTitle from "@/components/WidgetTitle";


const QuizPage = () => {

    const { profile } = useDB();
    const [quizzesCompleted, setQuizzesCompleted] = useState<string[]>([]);
    const [playerLevel, setPlayerLevel] = useState<number>(1);

    const getQuizzes = () => {
        if (profile) {
            setQuizzesCompleted(profile.quizzes_completed);
            setPlayerLevel(profile.level);
        }
    }

    useEffect(() => {
        getQuizzes();
    }, [profile]);

    return (
        <div className="container">

            <WidgetTitle title="Quiz Completed" />

            <div className="mt-4 mb-6 grid grid-cols-2 gap-2">
                {Object.values(Quiz).map((quiz, i) => (
                    <Box key={i} space='sm' className={`flex items-center gap-2 ${quizzesCompleted.includes(quiz) ? ' opacity-100' : ' opacity-30'}`}>
                        <div className={`w-8 h-8 flex justify-center items-center rounded-full bg-black/10 ${quizzesCompleted.includes(quiz) ? 'text-2xl text-yellow-500' : 'text-white'}`}>
                            {quizzesCompleted.includes(quiz) ? <TbTrophyFilled /> : <TbTrophy />}
                        </div>
                        <span className="text-xs">{quiz}</span>
                    </Box>
                ))}
            </div>

            <WidgetTitle title="Trophies" />

            <div className="mt-4 grid grid-cols-2 gap-2">
                {levelsData.map((level) => (
                    <Box key={level.level} space='sm' className={`flex items-center gap-2 ${playerLevel >= level.level ? ' opacity-100' : ' opacity-30'}`}>

                        <div className={`w-8 h-8 flex justify-center items-center rounded-full bg-black/10 ${playerLevel >= level.level ? 'text-2xl text-yellow-500' : 'text-white'}`}>
                            {playerLevel >= level.level ? <TbTrophyFilled /> : <TbTrophy />}
                        </div>
                        Level {level.level}
                    </Box>
                ))}
            </div>

            {/* <div className="flex flex-col w-full grid sm:grid-cols-2 gap-2">
                <div>
                    {Object.values(Quiz).map((quiz, i) => (
                        <div key={i}>
                            {quiz + " Quiz"}
                            {quizzesCompleted.includes(quiz) ? <TbStarFilled /> : <TbStar />}
                        </div>
                    ))}
                </div>

                <div>

                    {levelsData.map((level) => (
                        <div key={level.level}>
                            Reached Level {level.level}
                            {playerLevel >= level.level ? <TbStarFilled /> : <TbStar />}
                        </div>
                    ))}
                </div>

            </div> */}
        </div>
    );
}

export default QuizPage;