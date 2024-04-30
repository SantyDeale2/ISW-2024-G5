"use client";
import BudgetList from "@/components/BudgetList";
import useBudgets from "@/components/hooks/useBudgets";
import React from "react";

const Order = () => {
  const { system } = useBudgets();

  return (
    <div className="px-[20px] md:px-[30px] xl:px-[50px] 2xl:px-[60px] w-full py-5">
      <div className="flex flex-col gap-10 h-full">
        <span className="font-bold text-2xl md:text-3xl lg:text-5xl">
          Cotizaciones
        </span>
        {system.budgetList && <BudgetList list={system.budgetList} />}
      </div>
    </div>
  );
};

export default Order;
