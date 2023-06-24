import { IncomeCategory, ExpenseCategory, SavingsCategory, DebtCategory, ExpenseWallet, ExpenseNature, FromWallet, Quiz } from "./enums";

export type IncomeSchema = {
    id: string
    amount: number;
    category: IncomeCategory;
    createdAt: Date;
}

export type ExpenseSchema = {
    id: string
    amount: number;
    category: ExpenseCategory;
    nature: ExpenseNature // need or want
    fromWallet: FromWallet;
    createdAt: Date;
}

export type SavingsSchema = {
    id: string
    amount: number;
    category: SavingsCategory;
    fromWallet: FromWallet;
    createdAt: Date;
}

export type DebtPaymentSchema = {
    id: string
    amount: number;
    debtRelated: string, // id of debt related
    fromWallet: FromWallet
    createdAt: Date;
}

export type ActiveDebtSchema = {
    id: string;
    title: string;
    category: DebtCategory;
    startAmount: number;
    currentAmount: number;
    createdAt: Date;
}


/**
 * Quiz
 * 
 */
export type QuizSchema = {
    type: QuestionType;
    question: string;
    options: string[];
    options_right?: string[];
    correct_answer: number[];
}

export interface QuizItem {
    id: number
    content: string
}

/**
 * Gamification
 * 
 */

export type UserProfile = {
    username: string;
    level: number;
    xp: number;
    quizzes_completed: string[];
}
export interface level {
    level: number;
    minXp: number;
}
