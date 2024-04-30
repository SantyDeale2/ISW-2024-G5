"use client";
import React from "react";
import useBudgets from "./hooks/useBudgets";
import Button from "./Button";
import { useRouter } from "next/navigation";
import RatingStars from "./RatingStars";
import Spinner from "./Spinner";

const BudgetList = ({ list, parentSystem, parentActions }: IBudgetList) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 h-full">
      {list ? (
        <>
          {list.map((budget: IBudgetData, index: number) => (
            <div key={index}>
              <div className="border-[3px] rounded-lg w-full p-4 flex justify-between border-[#011638]">
                <div className="flex flex-col gap-5">
                  <span className="font-semibold text-xl md:text-2xl lg:text-3xl">
                    {budget.name}
                  </span>
                  <span className="text-lg md:text-2xl">$ {budget.budget}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex gap-1 items-center">
                    <RatingStars rating={budget.rating} />
                    <span>{budget.rating}</span>
                  </div>

                  {parentSystem.actualOrder?.idBudget === budget.id ? (
                    <Button
                      className="primary-button w-fit"
                      type="button"
                      onClick={() =>
                        parentActions.handleViewDetails(
                          budget.id,
                          budget.idOrder
                        )
                      }
                    >
                      Ver Detalle
                    </Button>
                  ) : (
                    <Button
                      className="primary-button w-fit"
                      type="button"
                      onClick={() =>
                        router.push(`/budget/${budget.id}/${budget.idOrder}`)
                      }
                    >
                      Seleccionar
                    </Button>
                  )}
                </div>
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
  pickUpDate: Date;
  deliveryDate: Date;
  idOrder: string;
}

interface IBudgetList {
  list: IBudgetData[];
  parentSystem: any;
  parentActions: any;
}
