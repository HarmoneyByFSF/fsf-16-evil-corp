'use client'

import { FC, useState } from "react";


import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import { ExpenseCategory, FromWallet } from "@/types/enums";
import { nanoid } from "nanoid";
import { ExpenseSchema } from "@/types/typings";
import { useDB } from "@/context/LocalDbContext";
import GetNatureOfExpense from "@/lib/expense-nature";
import { levelsData } from "@/data/levels/levelsData";

interface AddExpensesProps {

}

const AddExpenses: FC<AddExpensesProps> = () => {
    // States
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<string | null>(null);
    const [wallet, setWallet] = useState<string | null>(null);

    let baseScore = 20;


    // Hooks
    const { expenseCollection, setExpenseCollection, currentBalance, savingsBalance, profile, updateProfile } = useDB();

    // Handle form submission 
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if amount is not 0
        if (!amount || amount === 0) {
            console.log("Please input a number");
            //TODO: Add Toast
            return;
        }

        // Check if category has been added
        if (!category) {
            console.log("Please choose a category");
            //TODO: Add Toast
            return;
        }

        // Check if wallet has been chosen
        if (!wallet) {
            console.log("Please choose a spending wallet");
            //TODO: Add Toast
            return;
        }

        let walletBalance: number = 0;

        switch (wallet) {
            case FromWallet.current:
                walletBalance = currentBalance;
                break;

            case FromWallet.savings:
                walletBalance = savingsBalance
                break;

            // case FromWallet.emergency:
            //     walletBalance = emergencyBalance
            //     break;
            // case FromWallet.retirement:
            //     walletBalance = retirementBalance
            //     break;
        }

        // Check balance first if transaction is possible
        if (amount > walletBalance) {
            console.log("NOT ENOUGH IN BALANCE");
            TODO: "add toast"
            return;
        }

        const data = {
            id: nanoid(),
            amount: amount,
            category: category,
            nature: GetNatureOfExpense(category),
            fromWallet: wallet,
            createdAt: new Date()
        } as ExpenseSchema;

        let currentCollection = expenseCollection;
        currentCollection.push(data);
        setExpenseCollection(currentCollection);

        console.log("ADDED EXPENSE SUCCESSFULLY");
        // TODO: Add toast successful
        awardPoints();
    }

    const awardPoints = () => {
        if (!profile) return;

        const updatedXp = profile.xp + baseScore;

        //check if reached next level        
        let updatedLevel = profile.level;

        while (levelsData[updatedLevel] && updatedXp >= levelsData[updatedLevel].minXp) {
            updatedLevel = levelsData[updatedLevel].level;
        }

        updateProfile(updatedLevel, updatedXp);

    }

    function displayBalance(option: string) {
        switch (option) {
            case FromWallet.current:
                return currentBalance;
            case FromWallet.savings:
                return savingsBalance
            // case FromWallet.emergency:
            //     return emergencyBalance
            // case FromWallet.retirement:
            //     return retirementBalance
        }
    }



    return (
        <div className="container">

            <PageTitle title="Add Expenses" backButton={true} />

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <Input
                    id="amount"
                    type="number"
                    onChange={(e) => setAmount(e.target.valueAsNumber)}
                    placeholder="Amount"
                    disabled={isLoading}
                />

                <Select
                    onValueChange={(e) => setCategory(e)}
                >
                    <SelectTrigger className="w-full" >
                        <SelectValue placeholder="Select expense category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Object.values(ExpenseCategory).map((item, i) => (
                                <SelectItem key={i} value={item}>{item + " (" + GetNatureOfExpense(item) + ")"}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(e) => setWallet(e)}
                >
                    <SelectTrigger className="w-full" >
                        <SelectValue placeholder="Spending from" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Object.values(FromWallet).map((item, i) => (
                                <SelectItem key={i} value={item}>{item}{" (Rs " + displayBalance(item) + ")"}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button type="submit">
                    Add
                </Button>
            </form>

        </div>
    );
}

export default AddExpenses;