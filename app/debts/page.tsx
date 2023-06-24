'use client'

import { FC } from "react";
import Link from "next/link";

import PageTitle from "@/components/PageTitle";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button";
import { useDB } from "@/context/LocalDbContext";
import numberWithCommas from "@/lib/number-with-commas";

interface AddIncomeProps {

}

const AddIncome: FC<AddIncomeProps> = () => {

    const { activeDebtCollection, debtPaymentCollection } = useDB();

    const getDebtPayments = (id: string) => {
        //initial - all payments made
        let totalPaid = 0;

        for (let i = 0; i < debtPaymentCollection.length; i++) {
            if (debtPaymentCollection[i].debtRelated === id) {
                totalPaid += debtPaymentCollection[i].amount
            }
        }

        return totalPaid;
    }

    return (
        <div className="container">

            <PageTitle
                title="My Debts"
                actionButton={true}
                actionButtonTitle="Create New Debt"
                actionButtonUrl="/add/debt"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {activeDebtCollection.map((debt, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <CardTitle>{debt.title}</CardTitle>
                            <CardDescription>{debt.category}</CardDescription>
                        </CardHeader>
                        <CardContent>

                            <div className="grid grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Initial Loan
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {"Rs " + numberWithCommas(debt.startAmount)}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Outstanding
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {"Rs " + numberWithCommas(debt.startAmount - getDebtPayments(debt.id))}

                                    </p>
                                </div>
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Link href="/add/debt-payment" className={buttonVariants({ variant: "secondary" })}>
                                Log Payment
                            </Link>
                        </CardFooter>
                    </Card>
                ))}

                {/* <Card>
                    <CardHeader>
                        <CardTitle>MCB Personal</CardTitle>
                        <CardDescription>Home Loan</CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="grid grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Initial Loan
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Rs 200, 000
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Outstanding
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Rs 200, 000
                                </p>
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Link href="/add/debt-payment" className={buttonVariants({ variant: "secondary" })}>
                            Log Payment
                        </Link>
                    </CardFooter>
                </Card>


                <Card>
                    <CardHeader>
                        <CardTitle>CIM Credit</CardTitle>
                        <CardDescription>Home Loan</CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="grid grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Initial Loan
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Rs 200, 000
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Outstanding
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Rs 200, 000
                                </p>
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Link href="/add/debt-payment" className={buttonVariants({ variant: "secondary" })}>
                            Log Payment
                        </Link>
                    </CardFooter>
                </Card> */}
            </div>

        </div>
    );
}

export default AddIncome;