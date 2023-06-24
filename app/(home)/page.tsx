'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { quizList } from "@/data/quizzes/quiz-list";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";

import slugify from 'react-slugify';
import WidgetTitle from "@/components/WidgetTitle";
import Box from "@/components/ui/box";

const QuizPage = () => {
    return (
        <div className="container">

            <WidgetTitle title="Select Quiz" />

            <div className="mt-4 w-full grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {!quizList && [...Array(6)].map((e, i) => (
                    <div key={i} className="flex items-center space-x-4 mb-10">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-3">
                            <Skeleton className="h-2 w-[250px]" />
                            <Skeleton className="h-2 w-[200px]" />
                            <Skeleton className="h-2 w-[100px]" />
                        </div>
                    </div>
                ))}

                {quizList && quizList.map((quiz, i) => (
                    <Box key={i} className="flex justify-between items-center">
                        <h4>{quiz.title}</h4>
                        <Link href={`/${slugify(quiz.title, { delimiter: '' })}`} className={buttonVariants({ variant: "secondary" })}>
                            Start Quiz
                        </Link>
                    </Box>
                ))}
            </div>

        </div>
    );
}

export default QuizPage;