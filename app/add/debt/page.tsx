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
import { DebtCategory, IncomeCategory } from "@/types/enums";
import { ActiveDebtSchema } from "@/types/typings";
import { nanoid } from "nanoid";
import { useDB } from "@/context/LocalDbContext";
import { levelsData } from "@/data/levels/levelsData";

interface AddIncomeProps {

}

const AddIncome: FC<AddIncomeProps> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('')
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<string>('')

    const { activeDebtCollection, setActiveDebtCollection, profile, updateProfile } = useDB();

    let baseScore = 10;

    // Handle form submission
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // function to submit

        if (title === '') {
            console.log("Please input a title");
            return;
        }

        if (amount === 0) {
            console.log("Please input an amount");
            return;
        }

        if (category === '') {
            console.log("Please input a category");
            return;
        }

        const data = {
            id: nanoid(),
            title: title,
            category: category,
            startAmount: amount,
            currentAmount: amount,
            createdAt: new Date()
        } as ActiveDebtSchema

        let currentCollection = activeDebtCollection;
        currentCollection.push(data);
        setActiveDebtCollection(currentCollection);

        console.log("ADDED DEBT SUCCESSFULLY");
        console.log(currentCollection);

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

            <PageTitle title="Create New Debt" backButton={true} />

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <Input
                    id="title"
                    type="string"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    disabled={isLoading}
                />

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
                        <SelectValue placeholder="Debt Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Object.values(DebtCategory).map((item, i) => (
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