'use client'

import { FC, useState } from "react";


import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import { IncomeCategory } from "@/types/enums";
import { nanoid } from "nanoid";
import { IncomeSchema } from "@/types/typings";
import { useDB } from "@/context/LocalDbContext";
import { levelsData } from "@/data/levels/levelsData";

interface AddIncomeProps {

}

const AddIncome: FC<AddIncomeProps> = () => {
    // States
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<string | null>('');

    // Hooks
    const { incomeCollection, setIncomeCollection, currentBalance, profile, updateProfile } = useDB();

    let baseScore = 20;

    // Handle form submission 
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Check if amount is not 0
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


        const data = {
            id: nanoid(),
            amount: amount,
            category: category,
            createdAt: new Date()
        } as IncomeSchema;

        let currentCollection = incomeCollection;
        currentCollection.push(data);
        setIncomeCollection(currentCollection);

        console.log("ADDED INCOME SUCCESSFULLY");
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



    return (
        <div className="container">

            <PageTitle title="Add Income" backButton={true} />

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
                        <SelectValue placeholder="Select source of income" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Object.values(IncomeCategory).map((item, i) => (
                                <SelectItem key={i} value={item}>{item}</SelectItem>
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

export default AddIncome;