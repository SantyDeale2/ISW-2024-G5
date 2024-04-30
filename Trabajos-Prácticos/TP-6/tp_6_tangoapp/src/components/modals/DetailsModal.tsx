import React, { ChangeEvent, useState } from "react";
import BasicModal from "../BasicModal";
import Button from "../Button";
import { useForm } from "react-hook-form";
import useCardPayment from "../hooks/useCardPayment";
import ErrorModal from "./ErrorModal";
import LoadingModal from "./LoadingModal";
import SuccessModal from "./SuccessModal";
import { utils } from "../utils/utils";

const DetailsModal = ({
  open,
  onClose,
  budgetData,
  orderData,
}: IPaymentModal) => {
  const { actions, system } = useCardPayment({ budgetData, orderData });

  return (
    <BasicModal open={open} size="md" onClose={onClose}>
      <LoadingModal open={system.modals.loading.show}>
        <span className="font-semibold text-2xl">
          Cargando detalles de la cotización...
        </span>
      </LoadingModal>

      {budgetData && orderData && (
        <div className="px-[40px] gap-4 mb-[3%] flex flex-col">
          <span className="font-bold text-xl md:text-2xl">
            Detalle de la Cotización
          </span>

          <div className="flex flex-col">
            <span>Nombre del Transportista</span>
            <span className="text-sm">{budgetData?.name}</span>
          </div>

          <div className="flex flex-col">
            <span>Fecha de Retiro</span>
            <span className="text-sm">
              {utils.formatDateToString(budgetData!.pickUpDate)}
            </span>
          </div>

          <div className="flex flex-col">
            <span>Fecha de Entrega</span>
            <span className="text-sm">
              {utils.formatDateToString(budgetData!.deliveryDate)}
            </span>
          </div>

          <div className="flex flex-col">
            <span>Importe de Pago</span>
            <span className="text-sm">$ {budgetData?.budget}</span>
          </div>

          <div className="flex flex-col">
            <span>Forma de Pago</span>
            <span className="text-sm">{orderData?.paymentMethod}</span>
          </div>

          {orderData?.number !== "" && (
            <div className="flex flex-col">
              <span>Número de Comprobante</span>
              <span className="text-sm">{orderData?.number}</span>
            </div>
          )}
        </div>
      )}
    </BasicModal>
  );
};

export default DetailsModal;

interface IPaymentModal {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  budgetData: IBudgetData | null;
  orderData: IOrderData | null;
}

interface IOrderData {
  id: string;
  serie: string;
  status: string;
  idBudget: string;
  paymentMethod: string;
  number: string;
}

interface IBudgetData {
  id: string;
  name: string;
  rating: number;
  budget: number;
  pickUpDate: Date;
  deliveryDate: Date;
  idOrder: string;
  email: string;
}
