'use client';

import Box from "../ui/box";

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
import { ExpenseCategory, IncomeCategory } from '@/types/enums';
import { useDB } from '@/context/LocalDbContext';
import WidgetTitle from "../WidgetTitle";

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {

    const { expenseCollection, incomeCollection } = useDB();

    const expensePerCategory = (category: ExpenseCategory) => {
        let total = 0;
        for (let i = 0; i < expenseCollection.length; i++) {
            if (expenseCollection[i].category === category)
                total += expenseCollection[i].amount;
        }

        return total;
    }

    const incomePerCategory = (category: IncomeCategory) => {
        let total = 0;
        for (let i = 0; i < incomeCollection.length; i++) {
            if (incomeCollection[i].category === category)
                total += incomeCollection[i].amount;
        }

        return total;
    }


    const expenseData = {
        labels: Object.values(ExpenseCategory),
        datasets: [
            {
                label: 'Amount (Rs)',
                data: [
                    expensePerCategory(ExpenseCategory.housing),
                    expensePerCategory(ExpenseCategory.transportation),
                    expensePerCategory(ExpenseCategory.food),
                    expensePerCategory(ExpenseCategory.entertainment),
                    expensePerCategory(ExpenseCategory.health),
                    expensePerCategory(ExpenseCategory.selfcare),
                    expensePerCategory(ExpenseCategory.other),
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(40, 255, 64, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(40, 255, 64, 1)',

                ],
                borderWidth: 0,
            },
        ],
    };

    const incomeData = {
        labels: Object.values(IncomeCategory),
        datasets: [
            {
                label: 'Amount (Rs)',
                data: [
                    incomePerCategory(IncomeCategory.salary),
                    incomePerCategory(IncomeCategory.bonus),
                    incomePerCategory(IncomeCategory.wage),
                    incomePerCategory(IncomeCategory.comission),
                    incomePerCategory(IncomeCategory.profit),
                    incomePerCategory(IncomeCategory.pension)
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',

                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>

            <WidgetTitle title="Analytics" desc="Visualize your data" />

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                <Box className="mt-3">
                    {/* <Pie data={expenseData} /> */}
                    <Doughnut data={expenseData} />
                </Box>
                <Box className="mt-3">
                    {/* <Pie data={expenseData} /> */}
                    <Doughnut data={incomeData} />
                </Box>
            </div>
        </div>
    )
}

export default Charts;