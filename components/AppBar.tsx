'use client';


import { FC } from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";

import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { TbBook, TbBuildingBank, TbCertificate, TbCoins, TbDeviceGamepad2, TbDotsVertical, TbHome2, TbPlus, TbTargetArrow, TbTrophy, TbUser } from "react-icons/tb";




const AppBar: FC = () => {

    // Get current path
    const pathname = usePathname()

    // Menu Items
    const menu = [
        {
            url: '/',
            title: "Quiz Game",
            icon: <TbDeviceGamepad2 size={24} strokeWidth={1} />
        },
        {
            url: '/achievements',
            title: "Achievements",
            icon: <TbTrophy size={24} strokeWidth={1} />
        },
        {
            url: '/finances',
            title: "My Finances",
            icon: <TbCoins size={24} strokeWidth={1} />
        },
        {
            url: '/debts',
            title: "My Debts",
            icon: <TbBuildingBank size={24} strokeWidth={1} />
        }
    ]

    return (
        <div className={`AppBar fixed bottom-6 left-0 z-50 w-full flex justify-center
            ${pathname === '/money-essentials' && 'hidden'}
            ${pathname === '/youth' && 'hidden'}
            ${pathname === '/adulthood' && 'hidden'}
            ${pathname === '/investment' && 'hidden'}
        `}>
            <div className="h-14 pl-4 pr-2 rounded-full flex gap-4 items-center justify-evenly backdrop-blur-sm bg-black/60">
                {menu.map((menu, i) => (
                    <TooltipProvider key={i}>
                        <Tooltip >
                            <TooltipTrigger className="h-full">
                                <Link href={menu.url} className={`relative w-11 h-full flex items-center justify-center transition-all duration-300 ${pathname === menu.url ? 'text-hm-accent' : 'text-white hover:text-hm-accent'}`}>
                                    {menu.icon}
                                    {pathname === menu.url &&
                                        <span className="absolute top-[75%] left-1/2 w-[8px] h-[8px] ml-[-4px] text-[4px]">&#x25CF;</span>
                                    }
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white">
                                {menu.title}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}

                {/* Add New */}


                <DropdownMenu>


                    <DropdownMenuTrigger asChild className=" outline-none">
                        <div className="h-full flex items-center">
                            <Button variant='secondary' className="ml-2 w-10 h-10 px-0 rounded-full bg-emerald-400 hover:bg-emerald-400 text-black">
                                <TbPlus size={18} strokeWidth={1.5} />
                            </Button>
                        </div>
                    </DropdownMenuTrigger>


                    <DropdownMenuContent align="end" className="bg-black rounded-2xl border-none text-white p-2">
                        <DropdownMenuItem>
                            <Link href='/add/income' className="flex w-full items-center py-1">
                                {/* <TbPlus size={20} strokeWidth={1} className="mr-4" /> */}
                                <span className="text-md">Add Income</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href='/add/expense' className="flex w-full items-center py-1">
                                {/* <TbDeviceGamepad2 size={20} strokeWidth={1} className="mr-4" /> */}
                                <span>Add Expense</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href='/add/savings' className="flex w-full items-center py-1">
                                {/* <TbDeviceGamepad2 size={20} strokeWidth={1} className="mr-4" /> */}
                                <span>Add Savings</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <Link href='/add/debt-payment' className="flex w-full items-center py-1">
                                <span>Log Debt Payment</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>

                </DropdownMenu>

            </div>
        </div>
    )
}

export default AppBar;