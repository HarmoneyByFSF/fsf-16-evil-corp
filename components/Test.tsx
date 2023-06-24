'use client'

import { FC } from "react";

interface TestProps {
    data: any;
}

const Test: FC<TestProps> = ({ data }) => {

    console.log(data);


    return (
        <>
            <p>{data.name}</p>
        </>
    );
}

export default Test;