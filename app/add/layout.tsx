import ContentLayout from "@/components/Layouts/ContentLayout";
import { FC } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <ContentLayout>
            {children}
        </ContentLayout>
    )
}

export default Layout;