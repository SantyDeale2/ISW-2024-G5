import BudgetList from "@/components/BudgetList";
import useBudgets from "@/components/hooks/useBudgets";
import React from "react";

const Budget = () => {
  return (
    <div className="px-[20px] md:px-[30px] xl:px-[50px] 2xl:px-[60px] w-full py-5">
      <div className="flex flex-col gap-10">
        <span className="font-bold text-5xl">Cotizaciones</span>
        <BudgetList />
      </div>
    </div>
  );
};

export default Budget;
