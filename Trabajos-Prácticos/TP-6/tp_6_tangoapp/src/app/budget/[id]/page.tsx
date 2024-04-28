"use client";
import Button from "@/components/Button";
import RatingStars from "@/components/RatingStars";
import useBudgets from "@/components/hooks/useBudgets";
import PaymentModal from "@/components/modals/PaymentModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { utils } from "@/components/utils/utils";
import { useRouter } from "next/navigation";
import React from "react";

const BudgetSelected = () => {
  const { actions, system } = useBudgets();
  const router = useRouter();

  return (
    <div className="px-[20px] md:px-[30px] xl:px-[50px] 2xl:px-[60px] w-full py-5">
      <PaymentModal open={false} />
      <SuccessModal
        open={system.modals.success.show}
        onClose={() => router.push("/budget")}
        onClickButton={() => router.push("/budget")}
        textButton="Finalizar"
      >
        Se ha registrado el pedido correctamente!
      </SuccessModal>
      {system.actualBudget ? (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <span className="text-4xl font-semibold">
              {system.actualBudget.name}
            </span>
            <div className="flex gap-1 items-center">
              <RatingStars rating={system.actualBudget.rating} />
              <span>{system.actualBudget.rating}</span>
            </div>
          </div>

          <div className="flex gap-4 mt-10 text-lg font-semibold">
            <span className="w-[15rem]">Fecha de Retiro: </span>
            <span>
              {utils.formatDateToString(system.actualBudget.pickUpDate)}
            </span>
          </div>
          <div className="flex gap-4 mt-5 text-lg font-semibold">
            <span className="w-[15rem]">Entrega del Traslado: </span>
            <span>???????????????????????</span>
          </div>

          {system.status?.value !== "Confirmado" ? (
            <>
              <div className="flex flex-col mt-10 gap-4">
                <span className="text-2xl font-semibold">Importe</span>
                <div className="flex gap-20">
                  <span className="text-lg font-semibold">
                    $ {system.actualBudget.budget}
                  </span>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="credit"
                          checked={system.paymentOption === "credit"}
                          onChange={actions.handlePaymentOptionChange}
                        />
                        Tarjeta Crédito/Débito
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="cash_pickup"
                          checked={system.paymentOption === "cash_pickup"}
                          onChange={actions.handlePaymentOptionChange}
                        />
                        Efectivo al Retirar
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="cash_delivery"
                          checked={system.paymentOption === "cash_delivery"}
                          onChange={actions.handlePaymentOptionChange}
                        />
                        Efectivo contra Entrega
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  className="primary-button w-fit"
                  type="button"
                  onClick={
                    system.paymentOption === "credit"
                      ? () => console.log("Implementar Pago")
                      : () => actions.handleConfirmPayment()
                  }
                >
                  {system.paymentOption === "credit" ? "Pagar" : "Confirmar"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col mt-10 gap-4">
                <span className="text-2xl font-semibold">Importe</span>
                <div className="flex gap-20">
                  <span className="text-lg font-semibold">
                    $ {system.actualBudget.budget}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>NO SE HA ENCONTRADO NINGUN PEDIDO CON ESE ID</div>
      )}
    </div>
  );
};

export default BudgetSelected;
