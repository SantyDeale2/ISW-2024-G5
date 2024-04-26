import React from "react";
import BasicModal from "../BasicModal";

const PaymentModal = ({ open }: IPaymentModal) => {
  return (
    <BasicModal open={open} size="md">
      <div className="mb-[20px] flex w-full flex-col items-center justify-center px-[40px] gap-4">
        <span className="font-bold text-3xl">Detalle de Pago con Tarjeta</span>
      </div>
    </BasicModal>
  );
};

export default PaymentModal;

interface IPaymentModal {
  open: boolean;
}
