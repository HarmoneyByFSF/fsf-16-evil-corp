'use client'

import { FC, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress"
import Image from "next/image";
import { useDB } from "@/context/LocalDbContext";
import { levelsData } from "@/data/levels/levelsData";
import numberWithCommas from "@/lib/number-with-commas";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
interface HeaderProps {

}

const Header: FC<HeaderProps> = () => {

    const { profile, createProfile, currentBalance } = useDB();
    const [username, setUsername] = useState<string>("User");
    const [level, setLevel] = useState<number>(1);
    const [currentXp, setCurrentXp] = useState<number>(0);
    const [nextXp, setNextXp] = useState<number>(0);
    const [xpBar, setXpBar] = useState<number>(0);

    const [newUser, setNewUser] = useState<string>('');

    const getProfile = () => {
        if (profile) {
            setUsername(profile.username)
            setLevel(profile.level);
            setCurrentXp(profile.xp);
            const nextMinXp = levelsData[profile.level].minXp
            setNextXp(nextMinXp);

            //calculate xp bar
            const currentMinXp = levelsData[profile.level - 1].minXp
            const percentage = (profile.xp - currentMinXp) / (nextMinXp - currentMinXp);
            setXpBar(percentage * 100);

        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createProfile(newUser);
    }


    useEffect(() => {
        getProfile();
    }, [profile]);

    return (
        <>
            <header className="relative">
                <div className="container">
                    <div className="flex justify-between pt-4 md:pt-6">

                        {/* Profile */}


                        <Dialog>
                            <DialogTrigger>
                                <div className="h-[40px] sm:h-[50px] p-1 backdrop-blur-sm bg-black/40 rounded-full flex items-center">
                                    <figure className="relative w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]">
                                        <Image src="https://api.multiavatar.com/Starcrasher.png" width={100} height={100} alt="" />
                                    </figure>
                                    <div className="pl-2 pr-3 flex items-center">
                                        <div className="pr-4 border-r border-white border-opacity-10">
                                            <div className="text-[14px] sm:text-[16px] font-bold mb-[-3px]">{username}</div>
                                            <div className="text-[10px] sm:text-[12px] font-bold sm:font-semibold">{level}</div>
                                        </div>
                                        <div className="pl-3">
                                            <div className="text-[10px] sm:text-[12px] font-bold mb-1">{currentXp + " / " + nextXp + " XP"}</div>
                                            <Progress className="h-[6px] bg-white/10" value={xpBar} />
                                        </div>
                                    </div>
                                </div>
                            </DialogTrigger>

                            {!profile &&
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="mb-6">Create Profile</DialogTitle>

                                        <div>


                                            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                                                <Input
                                                    type="string"
                                                    onChange={(e) => setNewUser(e.target.value)}
                                                    placeholder="Username"
                                                />

                                                <Button type="submit">
                                                    Create
                                                </Button>
                                            </form>


                                        </div>

                                    </DialogHeader>
                                </DialogContent>
                            }
                        </Dialog>

                        {/* Balance */}
                        <div className="h-[40px]  sm:h-[50px] px-5 p-1 backdrop-blur-sm bg-black/40 rounded-full flex flex-col justify-center">
                            <div className="text-[10px] font-bold sm:font-medium mb-[-3px]">My Balance</div>
                            <div className="text-[14px] sm:text-[16px] font-bold sm:font-semibold">{"Rs " + numberWithCommas(currentBalance)}</div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;