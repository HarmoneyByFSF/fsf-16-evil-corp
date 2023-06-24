import { QuestionType } from "@/types/enums"
import { QuizSchema } from "@/types/typings"


export const moneyEssentialsData: QuizSchema[] = [
    {
        type: QuestionType.mcq,
        question: "Money management is about understanding the difference between needs and wants and spending money wisely without incurring unnecessary debt.",
        options: [
            "True",
            "False"
        ],
        correct_answer: [0]
    },
    {
        type: QuestionType.mcq,
        question: "What should be the first step in managing our money as individuals or families?",
        options: [
            "Seeking professional advice",
            "Creating a budget",
            "Investing windfall earning",
            "Saving for retirement"
        ],
        correct_answer: [1]
    },
    {
        type: QuestionType.mcq,
        question: "Why is budgeting essential?",
        options: [
            "To spend money recklessly",
            "To understand the money going in and out of your household",
            "To accumulate debt unnecessarily",
            "To ignore financial goals and needs"
        ],
        correct_answer: [1]
    },
    {
        type: QuestionType.sort,
        question: "Arrange the following steps in the correct order for effective budgeting",
        options: [
            "Consider the income stream and expenses for a chosen time period.",
            "Use leftover money as savings for unexpected events or future goals.",
            "Create a plan for spending and saving money according to needs and wants.",
            "Allocate money for basic needs first before prioritizing luxuries.",
        ],
        correct_answer: [2, 0, 3, 1]

    }





    // {
    //     type: QuestionType.mcq,
    //     question: "What is the primary purpose of investing?",
    //     options: [
    //         "To protect your money",
    //         "To achieve financial goals",
    //         "To avoid taxes",
    //         "To accumulate debt"
    //     ],
    //     correct_answer: [1]
    // },
    // {
    //     type: QuestionType.sort,
    //     question: "What are the steps to taking a loan?",
    //     options: [
    //         "Apply",
    //         "Determine Amount",
    //         "Research",
    //         "Gather Documents"
    //     ],
    //     correct_answer: [2, 1, 3, 0]
    // },
    // {
    //     type: QuestionType.sort,
    //     question: "Understanding the responsibilities and potential __ 1 __ associated with borrowing money is essential for making informed __ 2 __ and __ 3 __ the loan effectively. With careful __ 4 __ and responsible financial management, taking out a loan can be a valuable tool in reaching our objectives.",
    //     options: [
    //         "planning",
    //         "risks",
    //         "managing",
    //         "decisions"
    //     ],
    //     correct_answer: [1, 3, 2, 0]
    // },
    // {
    //     type: QuestionType.mcq,
    //     question: "How does an insurance cover work?",
    //     options: [
    //         "option 1",
    //         "If something goes wrong which is covered by the policy, you can make a claim and may be indemnified for your loss.",
    //         "option 3",
    //         "option 4"
    //     ],
    //     correct_answer: [1],

    // },
    // {
    //     type: QuestionType.match,
    //     question: "Why take an insurance cover?",
    //     options: [
    //         "A",
    //         "D",
    //         "C",
    //         "B"
    //     ],
    //     options_right: [
    //         "B",
    //         "A",
    //         "C",
    //         "D"
    //     ],
    //     correct_answer: [1, 3, 2, 0],
    // }
]