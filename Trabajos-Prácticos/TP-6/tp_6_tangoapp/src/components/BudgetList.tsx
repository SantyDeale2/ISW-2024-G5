"use client";
import React from "react";
import useBudgets from "./hooks/useBudgets";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const BudgetList = () => {
  const { actions, system } = useBudgets();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 h-full">
      {system.budgetList ? (
        <>
          {system.budgetList.map((budget: IBudgetData, index: number) => (
            <div
              key={index}
              className="border-[3px] rounded-lg w-full p-4 flex justify-between border-[#011638]"
            >
              <div className="flex flex-col gap-5">
                <span className="font-semibold text-3xl">{budget.name}</span>
                <span className="text-2xl">$ {budget.budget}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex gap-1 items-center">
                  {actions.renderStars(budget.rating)}
                  <span>{budget.rating}</span>
                </div>
                <Button
                  className="primary-button w-fit"
                  type="button"
                  onClick={() => router.push(`budget/${budget.id}`)}
                >
                  Seleccionar
                </Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 h-full">
          <Spinner className="size-[80px]" />
          <span className="text-2xl">Cargando Cotizaciones...</span>
        </div>
      )}
    </div>
  );
};

export default BudgetList;

interface IBudgetData {
  id: string;
  name: string;
  rating: number;
  budget: number;
}
