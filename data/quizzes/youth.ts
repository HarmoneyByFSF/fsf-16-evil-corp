import { QuestionType } from "@/types/enums"
import { QuizSchema } from "@/types/typings"


export const youthData: QuizSchema[] = [
    {
        type: QuestionType.mcq,
        question: "What are some good money habits that can help you save, invest, and avoid debt?",
        options: [
            "Spending before saving",
            "Living above your means",
            "Practicing money-saving habits",
            "To accumulate debt"
        ],
        correct_answer: [2]
    },
    {
        type: QuestionType.mcq,
        question: "Which of the following is NOT a commonly used type of investment?",
        options: [
            "Stocks",
            "Real Estate",
            "Bonds",
            "Credit Cards"
        ],
        correct_answer: [3]

    },

    {
        type: QuestionType.sort,
        question: "What are the steps to taking a loan?",
        options: [
            "Start saving small, effortless amounts",
            "Live below your means.",
            "Set concrete savings goals.",
            "Establish a savings habit while you are young."
        ],
        correct_answer: [3, 0, 1, 2]
    },


]

