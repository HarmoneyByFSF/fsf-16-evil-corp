/**
 * Income Enums
 * 
 */

export enum IncomeCategory {
    salary = "Salary",
    bonus = "Bonus",
    wage = "Wages",
    comission = "Commission",
    profit = "Profit",
    pension = "Pension"
}

/**
 * Expense Enums
 * 
 */

export enum ExpenseCategory {
    housing = "Housing",
    transportation = "Transportation",
    food = "Food",
    health = "Health",
    entertainment = "Entertainment",
    selfcare = "Self Care",
    other = "Other"
}

export enum ExpenseNature {
    need = "Need",
    want = "Want"
}

export enum FromWallet {
    current = "Current Balance",
    savings = "Savings",
    // emergency = "Emergency Funds",
    // retirement = "Retirement Account"

}

/**
 * Savings Enums
 * 
 */

export enum SavingsCategory {
    savings = "Savings",
    // emergency = "Emergency Funds",
    // retirement = "Retirement Funds"
}

/**
 * Debt Enums
 */

export enum DebtCategory {
    creditCard = "Credit Card",
    homeLoan = "Home Loan",
    studentLoan = "Student Loan",
    personalLoan = "Personal Loan",

}

/**
 * Budget Plans
 * percentages divided between Needs / Wants / Savings
 */

export enum BudgetPlan {
    fiftyThirtyTwenty = "50 / 30 / 20",
    sixtyThirtyTen = "60 / 30 / 10",
    seventyTwentyTen = "70 / 20 / 10",
    thirds = "Rule of Thirds", // a third each
}

export enum Month {
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december
}


/**
 * Quiz - Question
 * 
 */
export enum QuestionType {
    mcq = "mcq",
    sort = "sort",
    match = "match"
}

export enum Quiz {
    moneyEssentials = "Money Essentials",
    youth = "Youth",
    adulthood = "Adulthood",
    investment = "Investment"
}