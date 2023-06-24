'use client'

import Charts from "@/components/Finances/Charts";
import MyBudgetPlan from "@/components/Finances/MyBudgetPlan";

const Home = () => {
    return (
        <div className="container">
            <div className="mb-6">
                <MyBudgetPlan />
            </div>
            <Charts />
        </div>
    );
}

export default Home;