import React, { ChangeEvent, useState } from "react";
import BasicModal from "../BasicModal";
import Button from "../Button";
import { useForm } from "react-hook-form";
import DatePicker from "../DatePicker";
import useCardPayment from "../hooks/useCardPayment";
import ErrorModal from "./ErrorModal";
import LoadingModal from "./LoadingModal";
import SuccessModal from "./SuccessModal";

const PaymentModal = ({
  open,
  onClose,
  budgetData,
  orderData,
}: IPaymentModal) => {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: "all" });

  const { actions, system } = useCardPayment({ budgetData, orderData });

  return (
    <BasicModal open={open} size="md" onClose={onClose}>
      <ErrorModal
        open={system.modals.error.show}
        message={system.modals.error.message}
        onClose={actions.handleCloseErrorModal}
      />

      <LoadingModal open={system.modals.loading.show}>
        <span className="font-semibold text-2xl">
          Verificando datos de tarjeta...
        </span>
      </LoadingModal>

      <SuccessModal
        open={system.modals.success.show}
        onClose={actions.handleSucessModal}
        onClickButton={actions.handleSucessModal}
        textButton="Finalizar"
      >
        Pago registrado correctamente!
      </SuccessModal>

      <form className="px-[40px] mb-[5%]" onSubmit={actions.onSubmit}>
        <span className="font-bold text-2xl">Detalle de Pago con Tarjeta</span>
        <div className="flex flex-col mt-10 gap-4">
          <div className="flex flex-col">
            <span>Nombre Completo*</span>
            <input
              className="primary-input"
              placeholder="Juan Perez..."
              type="text"
              {...register("name", {
                required: true,
                minLength: 3,
              })}
            />
            {errors["name"]?.type === "required" && (
              <p className="text-sm text-[red]">
                El campo del nombre es requerido
              </p>
            )}
            {errors["name"]?.type === "minLength" && (
              <p className="text-sm text-[red]">
                El nombre debe tener un mínimo de 3 caracteres
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <span>Número de Tarjeta*</span>
            <input
              className="primary-input"
              placeholder="4444 4444 4444 4444"
              type="text"
              maxLength={19}
              onInput={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value.replace(/\D/g, "");
                const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                event.target.value = formattedValue;
              }}
              {...register("number", {
                required: true,
                minLength: 19,
              })}
            />

            {errors["number"]?.type === "required" && (
              <p className="text-sm text-[red]">
                El campo del número de tarjeta es requerido
              </p>
            )}
            {errors["number"]?.type === "minLength" && (
              <p className="text-sm text-[red]">
                El número de la tarjeta debe tener una longitud de 16 números
              </p>
            )}
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-[45%]">
              <span>Pin de Seguridad*</span>
              <input
                className="primary-input"
                placeholder="XXX"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={3}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const inputValue = event.target.value;
                  const numericValue = inputValue.replace(/\D/g, "");
                  event.target.value = numericValue;
                }}
                {...register("pin", {
                  required: true,
                  minLength: 3,
                })}
              />

              {errors["pin"]?.type === "required" && (
                <p className="text-sm text-[red]">El campo pin es requerido</p>
              )}
              {errors["pin"]?.type === "minLength" && (
                <p className="text-sm text-[red]">
                  El pin debe tener 3 números
                </p>
              )}
            </div>
            <div className="flex flex-col w-[45%]">
              <span>Fecha de Expiración*</span>
              <input
                className="primary-input"
                placeholder="MM/YY"
                maxLength={5}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const input = event.target as HTMLInputElement;
                  const trimmedValue = input.value.replace(/\s/g, "");
                  const formattedValue = trimmedValue
                    .replace(/\D/g, "")
                    .replace(/(\d{2})(\d{1,2})/, "$1/$2");
                  input.value = formattedValue;
                }}
                {...register("expirationDate", {
                  required: true,
                  pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                })}
              />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-[20%]">
              <span>Tipo de Documento*</span>
              <select
                className="primary-input"
                value={system.documentType}
                onChange={(e) => actions.setDocumentType(e.target.value)}
                name="document-type"
                required
              >
                <option value="dni">DNI</option>
                <option value="pasaporte">Pasaporte</option>
              </select>
            </div>
            <div className="flex flex-col w-[60%]">
              <span>Número de Documento*</span>
              {system.documentType === "dni" ? (
                <>
                  <input
                    className="primary-input"
                    placeholder="Número de DNI"
                    type="text"
                    pattern="[0-9]*"
                    maxLength={10}
                    {...register("document-number", {
                      required: true,
                      minLength: 6,
                    })}
                    onInput={(e: ChangeEvent<HTMLInputElement>) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                  />
                  {errors["document-number"]?.type === "required" && (
                    <p className="text-sm text-[red]">
                      El campo número de documento es requerido
                    </p>
                  )}
                  {errors["document-number"]?.type === "minLength" && (
                    <p className="text-sm text-[red]">
                      El campo número de documento debe tener al menos 6
                      carácteres
                    </p>
                  )}
                </>
              ) : (
                <>
                  <input
                    className="primary-input"
                    placeholder="Número de Pasaporte"
                    type="text"
                    maxLength={10}
                    pattern="[a-zA-Z0-9]{1,10}"
                    {...register("document-number", {
                      required: true,
                      minLength: 5,
                    })}
                    onInput={(e: ChangeEvent<HTMLInputElement>) => {
                      e.target.value = e.target.value.toUpperCase();
                    }}
                  />
                  {errors["document-number"]?.type === "required" && (
                    <p className="text-sm text-[red]">
                      El campo número de pasaporte es requerido
                    </p>
                  )}
                  {errors["document-number"]?.type === "minLength" && (
                    <p className="text-sm text-[red]">
                      El campo número de pasaporte debe tener al menos 5
                      carácteres
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Button className="primary-button" type="submit">
            Confirmar
          </Button>
        </div>
      </form>
    </BasicModal>
  );
};

export default PaymentModal;

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
}

interface IBudgetData {
  id: string;
  name: string;
  rating: number;
  budget: number;
  pickUpDate: Date;
  idOrder: string;
  email: string;
}
