import { FC } from "react";
import { useRouter } from 'next/navigation';
import { Button, buttonVariants } from "./ui/button";
import { TbArrowBack, TbArrowLeft } from "react-icons/tb";
import Link from "next/link";


interface PageTitleProps {
    title: string;
    backButton?: boolean;
    actionButton?: boolean;
    actionButtonTitle?: string;
    actionButtonUrl?: string;
}

const PageTitle: FC<PageTitleProps> = ({
    title,
    backButton = false,
    actionButton = false,
    actionButtonTitle,
    actionButtonUrl
}) => {

    // init router
    const router = useRouter()


    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex">
                {backButton &&
                    <Button onClick={() => router.back()} variant='ghost' size='icon'>
                        <TbArrowLeft size={24} strokeWidth={1} />
                    </Button>
                }
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    {title}
                </h2>
            </div>

            {actionButton &&
                <Link href={`${actionButtonUrl}`} className={buttonVariants({ variant: "default" })}>
                    {actionButtonTitle || 'Link Title'}
                </Link>
            }
        </div>
    );
}

export default PageTitle;