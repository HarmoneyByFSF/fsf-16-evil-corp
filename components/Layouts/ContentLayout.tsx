import { FC } from "react";

interface ContentLayoutProps {
    children: React.ReactNode;
}

const ContentLayout: FC<ContentLayoutProps> = ({ children }) => {
    return (
        <div className="mt-10">
            {children}
        </div>
    );
}

export default ContentLayout;