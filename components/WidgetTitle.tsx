import { FC } from "react";

interface WidgetTitleProps {
    title: string;
    desc?: string;
}

const WidgetTitle: FC<WidgetTitleProps> = ({ title, desc }) => {
    return (
        <div>
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {title}
            </h3>
            {desc && <p className="text-xs">{desc}</p>}
        </div>
    );
}

export default WidgetTitle;