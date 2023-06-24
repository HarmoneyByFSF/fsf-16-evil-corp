'use client'
import { ActiveDebtSchema, DebtPaymentSchema, ExpenseSchema, IncomeSchema, SavingsSchema, UserProfile } from "@/types/typings";
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { nanoid } from 'nanoid'
import { DebtCategory, ExpenseCategory, FromWallet, Quiz, SavingsCategory } from "@/types/enums";

type LocalDbContextType = {
    isLoading: boolean;
    incomeCollection: IncomeSchema[]
    setIncomeCollection: any;
    expenseCollection: ExpenseSchema[],
    setExpenseCollection: any,
    savingsCollection: SavingsSchema[],
    setSavingsCollection: any,
    debtPaymentCollection: DebtPaymentSchema[],
    setDebtPaymentCollection: any,
    activeDebtCollection: ActiveDebtSchema[]
    setActiveDebtCollection: any;

    activeBudgetPlan: string | null;
    setActiveBudgetPlan: any;

    currentBalance: number
    savingsBalance: number
    // emergencyBalance: number
    // retirementBalance: number

    profile: UserProfile | null;
    createProfile: (username: string) => void;
    updateProfile: (level?: number, xp?: number, quiz_completed?: Quiz) => void
}

type LocalDbProviderProps = {
    children: React.ReactNode;
};

// Create new context
//
const LocalDbContext = createContext<LocalDbContextType | null>(null);


// Hook to access context
//
export const useDB = (): LocalDbContextType => {
    const context = useContext(LocalDbContext);

    if (!context) {
        throw new Error('Hook must be used within LocalDB context');
    }

    return context;
};


export const LocalDbProvider: React.FC<LocalDbProviderProps> = ({ children }: any) => {

    // States
    //
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentBalance, setCurrentBalance] = useState<number>(0);
    const [savingsBalance, setSavingsBalance] = useState<number>(0);

    // Define Collections
    //TODO: get ref to currentBalances at the beginning of each month. (find earliest for the month)

    const [incomeCollection, setIncomeCollection] = useLocalStorage<IncomeSchema[]>('incomeCollection', new Array);
    const [expenseCollection, setExpenseCollection] = useLocalStorage<ExpenseSchema[]>('expenseCollection', new Array);
    const [savingsCollection, setSavingsCollection] = useLocalStorage<SavingsSchema[]>('savingsCollection', new Array);
    const [debtPaymentCollection, setDebtPaymentCollection] = useLocalStorage<DebtPaymentSchema[]>('debtPaymentCollection', new Array);
    const [activeDebtCollection, setActiveDebtCollection] = useLocalStorage<ActiveDebtSchema[]>('activeDebtCollection', new Array);

    // Budget Plan
    const [activeBudgetPlan, setActiveBudgetPlan] = useLocalStorage<string | null>('activeBudgetPlan', null);

    // Profile
    const [profile, setProfile] = useLocalStorage<UserProfile | null>('profile', null);


    //Need balances for currentBalance, savings, emergency, retirement
    const calculateCurrentBalance = useCallback(() => {
        let allIncome: number = 0;
        let allExpenses: number = 0;
        let allSavings: number = 0;
        let allDebtPayments: number = 0;

        // All income
        for (let i = 0; i < incomeCollection.length; i++) {
            allIncome += incomeCollection[i].amount;
        }

        // All expenses
        for (let i = 0; i < expenseCollection.length; i++) {
            if (expenseCollection[i].fromWallet === FromWallet.current) {
                allExpenses += expenseCollection[i].amount;
            }
        }

        // All savings
        for (let i = 0; i < savingsCollection.length; i++) {
            if (savingsCollection[i].fromWallet === FromWallet.current) {
                allSavings += savingsCollection[i].amount;
            }
        }

        // All debt payments
        for (let i = 0; i < debtPaymentCollection.length; i++) {
            if (debtPaymentCollection[i].fromWallet === FromWallet.current) {
                allDebtPayments += debtPaymentCollection[i].amount;
            }
        }

        let balance = allIncome - (allExpenses + allDebtPayments + allSavings);
        setCurrentBalance(balance);
    }, [incomeCollection, expenseCollection, savingsCollection, debtPaymentCollection]);

    const calculateSavingsBalance = useCallback(() => {
        // take all savings
        // remove expenses taken from savings

        // All savings
        let allSavings = 0;
        let allSavingsExpenses = 0;
        let allDebtPaymentsFromSavings = 0;
        for (let i = 0; i < savingsCollection.length; i++) {
            if (savingsCollection[i].category === SavingsCategory.savings) {
                allSavings += savingsCollection[i].amount;
            }
        }

        // All expenses taken from savings
        for (let i = 0; i < expenseCollection.length; i++) {
            if (expenseCollection[i].fromWallet === FromWallet.savings) {
                // console.log("expenses amount: " + expenseCollection[i].amount);
                allSavingsExpenses += expenseCollection[i].amount;
            }
        }

        // All debt payments
        for (let i = 0; i < debtPaymentCollection.length; i++) {
            if (debtPaymentCollection[i].fromWallet === FromWallet.savings) {
                allDebtPaymentsFromSavings += debtPaymentCollection[i].amount;

            }
        }

        setSavingsBalance(allSavings - (allSavingsExpenses + allDebtPaymentsFromSavings));
    }, [savingsCollection, expenseCollection]);


    const createProfile = (username: string) => {
        if (profile !== null) {
            console.log("User already has a profile");
            // toast.error("User already has a profile");
            return;
        }

        const data = {
            username: username,
            level: 1,
            xp: 0,
            quizzes_completed: []
        } as UserProfile

        setProfile(data);

        console.log(data);

    }

    const updateProfile = (level?: number, xp?: number, quiz_completed?: Quiz) => {
        if (!profile) {
            console.log("Profile not found");
            // toast.error("User profile not found");
            return;
        }

        // If quiz has already been completed, no need to add it again.
        let quizzesCompleted: string[] = profile.quizzes_completed;

        if (quiz_completed && !quizzesCompleted.includes(quiz_completed)) {
            quizzesCompleted.push(quiz_completed);
        }

        const data = {
            username: profile.username,
            level: level,
            xp: xp,
            quizzes_completed: quizzesCompleted
        } as UserProfile

        setProfile(data);

        console.log(data);

    }

    useEffect(() => {
        // setIncomeCollection(new Array())
        // setSavingsCollection(new Array())
        // setExpenseCollection(new Array())
        // setActiveDebtCollection(new Array())
        // setDebtPaymentCollection(new Array());


        calculateCurrentBalance();
        calculateSavingsBalance();
    }, [calculateCurrentBalance, calculateSavingsBalance]);


    const contextValue: LocalDbContextType = {
        isLoading,
        incomeCollection,
        setIncomeCollection,
        expenseCollection,
        setExpenseCollection,
        savingsCollection,
        setSavingsCollection,
        debtPaymentCollection,
        setDebtPaymentCollection,
        activeDebtCollection,
        setActiveDebtCollection,

        activeBudgetPlan,
        setActiveBudgetPlan,

        currentBalance,
        savingsBalance,
        // emergencyBalance,
        // retirementBalance

        profile,
        createProfile,
        updateProfile
    }

    return (
        <LocalDbContext.Provider value={contextValue}>
            {children}
        </LocalDbContext.Provider>
    )
}