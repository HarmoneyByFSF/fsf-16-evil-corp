'use client'

import { FC, useEffect, useState } from "react";


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
import { ActiveDebtSchema, DebtPaymentSchema, ExpenseSchema } from "@/types/typings";
import { useDB } from "@/context/LocalDbContext";
import GetNatureOfExpense from "@/lib/expense-nature";
import { levelsData } from "@/data/levels/levelsData";

interface AddDebtsProps {

}

const AddDebts: FC<AddDebtsProps> = () => {
    // States
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [amount, setAmount] = useState<number>(0);
    const [wallet, setWallet] = useState<string | null>(null);
    const [debt, setDebt] = useState<string | null>(null);



    // Hooks
    const { debtPaymentCollection, setDebtPaymentCollection, activeDebtCollection, setActiveDebtCollection, currentBalance, savingsBalance, profile, updateProfile } = useDB();

    let baseScore = 50;

    // Handle form submission 
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if amount is not 0
        if (!amount || amount === 0) {
            console.log("Please input a number");
            //TODO: Add Toast
            return;
        }

        // Check if a debt has been selected
        if (!debt) {
            console.log("Please select debt");
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
        }

        // Check balance first if transaction is possible
        if (amount > walletBalance) {
            console.log("NOT ENOUGH IN BALANCE");
            // TODO: "add toast"
            return;
        }

        const data = {
            id: nanoid(),
            amount: amount,
            debtRelated: getActiveDebt()?.id,
            fromWallet: wallet,
            createdAt: new Date()
        } as DebtPaymentSchema;

        let currentCollection = debtPaymentCollection;
        currentCollection.push(data);
        setDebtPaymentCollection(currentCollection);

        console.log("ADDED DEBT PAYMENT SUCCESSFULLY");
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
        }
    }

    console.log("active debts: ", activeDebtCollection);
    console.log("debt payments: ", debtPaymentCollection);

    const getActiveDebt = () => {
        // Get Debt data
        for (let i = 0; i < activeDebtCollection.length; i++) {
            if (activeDebtCollection[i].title === debt) {
                return activeDebtCollection[i] as ActiveDebtSchema;
            }
        }
    }

    return (
        <div className="container">

            <PageTitle title="Pay Debts" backButton={true} />

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <Input
                    id="amount"
                    type="number"
                    onChange={(e) => setAmount(e.target.valueAsNumber)}
                    placeholder="Amount"
                    disabled={isLoading}
                />

                <Select
                    onValueChange={(e) => setDebt(e)}
                >
                    <SelectTrigger className="w-full" >
                        <SelectValue placeholder="Choose Debt To Pay" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {activeDebtCollection.map((item, i) => (
                                <SelectItem key={i} value={item.title}>{item.title}</SelectItem>
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

export default AddDebts;