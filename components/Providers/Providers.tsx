'use client'

import { FC } from "react";
import { LocalDbProvider } from "@/context/LocalDbContext";


interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <LocalDbProvider>
            {children}
        </LocalDbProvider>
    );
}

export default Providers;