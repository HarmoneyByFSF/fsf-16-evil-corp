import { QuestionType } from "@/types/enums"
import { QuizSchema } from "@/types/typings"


export const investmentData: QuizSchema[] = [
    {
        type: QuestionType.mcq,
        question: "What are the two broad types of insurance?",
        options: [
            "Long-term insurance and short-term insurance",
            "Life insurance and health insurance",
            "Motor insurance and property insurance",
            "General insurance and investment insurance"
        ],
        correct_answer: [2]
    },
    {
        type: QuestionType.mcq,
        question: "How does insurance help in managing risks?",
        options: [
            "By eliminating all risks completely",
            "By transferring part of the risk to the insurer/insurance company",
            "By increasing the likelihood of risks occurring",
            "By guaranteeing a profit in case of risks"
        ],
        correct_answer: [2, 1, 3, 0]
    },
    {
        type: QuestionType.sort,
        question: "Understanding the responsibilities and potential __ 1 __ associated with borrowing money is essential for making informed __ 2 __ and __ 3 __ the loan effectively. With careful __ 4 __ and responsible financial management, taking out a loan can be a valuable tool in reaching our objectives.",
        options: [
            "planning",
            "risks",
            "managing",
            "decisions"
        ],
        correct_answer: [1, 3, 2, 0]
    }
]