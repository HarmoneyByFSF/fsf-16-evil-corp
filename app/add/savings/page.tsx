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
import { FromWallet, SavingsCategory } from "@/types/enums";
import { nanoid } from "nanoid";
import { SavingsSchema } from "@/types/typings";
import { useDB } from "@/context/LocalDbContext";
import { levelsData } from "@/data/levels/levelsData";

interface AddSavingsProps {

}

const AddSavings: FC<AddSavingsProps> = () => {
    // States
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<string | null>('');
    const [fromWallet, setFromWallet] = useState<string | null>('');

    // Hooks
    const { savingsCollection, setSavingsCollection, currentBalance, profile, updateProfile } = useDB();

    let baseScore = 30;

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
        // if (!category) {
        //     console.log("Please choose a category");
        //     //TODO: Add Toast
        //     return;
        // }


        const data = {
            id: nanoid(),
            amount: amount,
            // category: category,
            category: SavingsCategory.savings,
            fromWallet: FromWallet.current,
            createdAt: new Date()
        } as SavingsSchema;

        let currentCollection = savingsCollection;
        currentCollection.push(data);
        setSavingsCollection(currentCollection);

        console.log("ADDED SAVINGS SUCCESSFULLY");
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

            <PageTitle title="Add Savings" backButton={true} />

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <Input
                    id="amount"
                    type="number"
                    onChange={(e) => setAmount(e.target.valueAsNumber)}
                    placeholder="Amount"
                    disabled={isLoading}
                />

                {/* <Select
                    onValueChange={(e) => setCategory(e)}
                >
                    <SelectTrigger className="w-full" >
                        <SelectValue placeholder="Add To" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Object.values(SavingsCategory).map((item, i) => (
                                <SelectItem key={i} value={item}>{item}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select> */}

                <Select
                    onValueChange={(e) => setFromWallet(e)}
                >
                    <SelectTrigger className="w-full" >
                        <SelectValue placeholder="From Wallet" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={FromWallet.current}>{FromWallet.current}{" (Rs " + currentBalance + ")"}</SelectItem>

                            {/* {Object.values(FromWallet).map((item, i) => (
                                <SelectItem key={i} value={item}>{item}</SelectItem>
                            ))} */}
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

export default AddSavings;