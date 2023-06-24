import { QuestionType } from "@/types/enums"
import { QuizSchema } from "@/types/typings"


export const adulthoodData: QuizSchema[] = [
    {
        type: QuestionType.mcq,
        question: "What is one of the most important aspects of setting long-term financial goals?",
        options: [
            "Creating a weekly/monthly budget",
            "Investing in high-risk ventures",
            "Overspending on unnecessary expenses",
            "Ignoring the need for savings"
        ],
        correct_answer: [0],
    },
    {
        type: QuestionType.mcq,
        question: "Which of the following is a recommended step for retirement planning?",
        options: [
            "Delaying retirement as long as possible",
            "Spending first and saving later",
            "Reviewing investments annually",
            "Relying solely on social security benefits"
        ],
        correct_answer: [2],
    },
    {
        type: QuestionType.sort,
        question: "Arrange the following steps for financial planning for retirement in the correct order:",
        options: [
            "Adjust investments as you get closer to retirement",
            "Have a budget",
            "Start Early",
            "Set up an annuity"
        ],
        correct_answer: [2, 1, 3, 0],
    }

]