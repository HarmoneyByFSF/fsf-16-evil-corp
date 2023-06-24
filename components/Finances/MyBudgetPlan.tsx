'use client'

import { FC, useEffect, useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useDB } from "@/context/LocalDbContext";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { TbSettings } from "react-icons/tb";
import { BudgetPlan, ExpenseNature, FromWallet } from "@/types/enums";
import Box from "../ui/box";
import WidgetTitle from "../WidgetTitle";
import SepVert from "../SepVert";
import numberWithCommas from "@/lib/number-with-commas";

interface MyBudgetPlanProps {

}

const MyBudgetPlan: FC<MyBudgetPlanProps> = () => {

    const { activeBudgetPlan, setActiveBudgetPlan, incomeCollection, savingsBalance, activeDebtCollection, debtPaymentCollection, expenseCollection, savingsCollection } = useDB();

    const [needsBalance, setNeedsBalance] = useState<number>(0);
    const [wantsBalance, setWantsBalance] = useState<number>(0);
    const [savingsOrDebtBalance, setSavingsOrDebtBalance] = useState<number>(0);
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [planDescrition, setPlanDescription] = useState<string>("Please choose a budget plan to get started.");

    const [needExpenses, setNeedExpenses] = useState<number>(0);
    const [wantExpenses, setWantExpenses] = useState<number>(0);
    const [savingsOrDebtExpenses, setSavingsOrDebtExpenses] = useState<number>(0);



    const chooseBudgetPlan = (plan: string) => {
        //TODO: calculate with all income for the month or year.

        let sumIncome = 0;

        for (let i = 0; i < incomeCollection.length; i++) {
            sumIncome += incomeCollection[i].amount;
        }

        setTotalIncome(sumIncome);
        console.log(sumIncome);


        let needs: number = 0;
        let wants: number = 0;
        let savingsOrDebt: number = 0;

        switch (plan) {
            case BudgetPlan.fiftyThirtyTwenty:
                //show preview of balance
                needs = 0.5 * sumIncome;
                wants = 0.3 * sumIncome;
                savingsOrDebt = 0.2 * sumIncome;
                break;
            case BudgetPlan.sixtyThirtyTen:
                //show preview of balance
                needs = 0.6 * sumIncome;
                wants = 0.3 * sumIncome;
                savingsOrDebt = 0.1 * sumIncome;
                break;
            case BudgetPlan.seventyTwentyTen:
                //show preview of balance
                needs = 0.7 * sumIncome;
                wants = 0.2 * sumIncome;
                savingsOrDebt = 0.1 * sumIncome;
                break;
            case BudgetPlan.thirds:
                //show preview of balance
                needs = 0.34 * sumIncome;
                wants = 0.33 * sumIncome;
                savingsOrDebt = 0.33 * sumIncome;
                break;
        }


        // Set 
        setActiveBudgetPlan(plan);
        setNeedsBalance(Math.floor(needs));
        setWantsBalance(Math.floor(wants));
        setSavingsOrDebtBalance(Math.floor(savingsOrDebt));
    }

    const getTotalOutstandingDebt = () => {
        // active - all payments
        let totalActiveDebt = 0;
        let totalPaidDebt = 0;

        for (let i = 0; i < activeDebtCollection.length; i++) {
            totalActiveDebt += activeDebtCollection[i].startAmount
        }

        for (let i = 0; i < debtPaymentCollection.length; i++) {
            totalPaidDebt += debtPaymentCollection[i].amount
        }

        return totalActiveDebt - totalPaidDebt

    }

    const budgetPlanDescription = () => {
        if (activeBudgetPlan) {
            setPlanDescription("Your spending limits based on your total income: " + totalIncome);
        }
    }

    const totalExpensesByNature = (nature: ExpenseNature) => {
        let total = 0;
        for (let i = 0; i < expenseCollection.length; i++) {
            if (expenseCollection[i].nature === nature) {
                total += expenseCollection[i].amount
            }
        }

        switch (nature) {
            case ExpenseNature.need:
                setNeedExpenses(total);
                return;
            case ExpenseNature.want:
                setWantExpenses(total);
                return;
        }
    }

    const getTotalSentToSavingsAndDebt = () => {
        // All expenses taken from savings
        let allSavingsFromCurrent = 0;
        let allDebtPaymentsFromCurrent = 0;


        for (let i = 0; i < savingsCollection.length; i++) {
            if (savingsCollection[i].fromWallet === FromWallet.current) {
                allSavingsFromCurrent += savingsCollection[i].amount;
            }
        }

        // All debt payments
        for (let i = 0; i < debtPaymentCollection.length; i++) {
            if (debtPaymentCollection[i].fromWallet === FromWallet.current) {
                allDebtPaymentsFromCurrent += debtPaymentCollection[i].amount;

            }
        }

        setSavingsOrDebtExpenses(allSavingsFromCurrent + allDebtPaymentsFromCurrent);
    }

    useEffect(() => {
        if (activeBudgetPlan) {
            chooseBudgetPlan(activeBudgetPlan);
            budgetPlanDescription();
        }
        totalExpensesByNature(ExpenseNature.need);
        totalExpensesByNature(ExpenseNature.want);
        getTotalSentToSavingsAndDebt();
    }, [totalIncome, activeBudgetPlan,]);

    return (
        <>
            <div className="mb-3 flex items-center justify-between">

                <WidgetTitle title="Budget Recommendation" desc={planDescrition} />

                <Dialog>
                    <DialogTrigger>
                        <div className="p-2">
                            <TbSettings size={20} strokeWidth={1} />
                        </div>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Choose your budget plan</DialogTitle>
                            <p className="mb-6">Percentage split between Needs / Wants / Savings & Debts</p>

                            <div className="flex flex-col gap-4">
                                <Card className="flex justify-between items-center p-4">
                                    <div>
                                        <CardTitle>{BudgetPlan.fiftyThirtyTwenty}</CardTitle>
                                    </div>
                                    <Button onClick={() => chooseBudgetPlan(BudgetPlan.fiftyThirtyTwenty)} size='sm' disabled={activeBudgetPlan === BudgetPlan.fiftyThirtyTwenty}>
                                        {activeBudgetPlan === BudgetPlan.fiftyThirtyTwenty ? 'Selected' : 'Select'}
                                    </Button>
                                </Card>

                                <Card className="flex justify-between items-center p-4">
                                    <div>
                                        <CardTitle>{BudgetPlan.seventyTwentyTen}</CardTitle>
                                    </div>
                                    <Button onClick={() => chooseBudgetPlan(BudgetPlan.seventyTwentyTen)} size='sm' disabled={activeBudgetPlan === BudgetPlan.seventyTwentyTen}>
                                        {activeBudgetPlan === BudgetPlan.seventyTwentyTen ? 'Selected' : 'Select'}
                                    </Button>
                                </Card>

                                <Card className="flex justify-between items-center p-4">
                                    <div>
                                        <CardTitle>{BudgetPlan.sixtyThirtyTen}</CardTitle>
                                    </div>
                                    <Button onClick={() => chooseBudgetPlan(BudgetPlan.sixtyThirtyTen)} size='sm' disabled={activeBudgetPlan === BudgetPlan.sixtyThirtyTen}>
                                        {activeBudgetPlan === BudgetPlan.sixtyThirtyTen ? 'Selected' : 'Select'}
                                    </Button>
                                </Card>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="sm:flex sm:gap-2">
                <Box className="mb-2 sm:mb-0 flex justify-between items-center flex-1">
                    <div>
                        <span className="block text-[10px] text-neutral-400">My Needs</span>
                        <h6 className="text-[14px] font-semibold">
                            {needsBalance ? <span>Rs {needsBalance.toLocaleString()}</span> : <span>Rs 0</span>}
                        </h6>
                        <span className="text-[12px] font-semibold">Spent : {needExpenses}</span>
                    </div>

                    <SepVert />

                    <div>
                        <span className="block text-[10px] text-neutral-400">My Wants</span>
                        <h6 className="text-[14px] font-semibold">
                            {wantsBalance ? <span>Rs {wantsBalance.toLocaleString()}</span> : <span>Rs 0</span>}
                        </h6>
                        <span className="text-[12px] font-semibold">Spent : {wantExpenses}</span>
                    </div>

                    <SepVert />

                    <div>
                        <span className="block text-[10px] text-neutral-400">Savings/Debt</span>
                        <h6 className="text-[14px] font-semibold">
                            {savingsOrDebtBalance ? <span>Rs {savingsOrDebtBalance.toLocaleString()}</span> : <span>Rs 0</span>}
                        </h6>
                        <span className="text-[12px] font-semibold">Sent: {savingsOrDebtExpenses}</span>
                    </div>
                </Box>

                <Box className="flex items-center justify-around flex-1">
                    <div>
                        <span className="block text-[10px] text-neutral-400">My Savings</span>
                        <h6 className="text-[14px] font-semibold">
                            {savingsBalance ? <span>{"Rs " + numberWithCommas(savingsBalance)}</span> : <span>Rs 0</span>}
                        </h6>
                    </div>

                    <SepVert />

                    <div>
                        <span className="block text-[10px] text-neutral-400">My Debts</span>
                        <h6 className="text-[14px] font-semibold">
                            {savingsBalance ? <span>{"Rs " + numberWithCommas(getTotalOutstandingDebt())}</span> : <span>Rs 0</span>}
                        </h6>
                    </div>
                </Box>
            </div>
        </>
    )
}

export default MyBudgetPlan;