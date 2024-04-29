import React, { useState } from "react";
import BasicModal from "../BasicModal";
import Button from "../Button";
import "../../styles/PaymentModal.css";


const PaymentModal = ({ open, onClose, onClickButton }: IPaymentModal) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [documentType, setDocumentType] = useState("DNI");
  const [document, setDocument] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const [nameError, setNameError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [documentError, setDocumentError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [securityCodeError, setSecurityCodeError] = useState("");

  return (
    <BasicModal open={open} size="md" onClose={onClose}>
      <div className="container">
        <span className="font-bold text-3xl">Detalle de Pago con Tarjeta</span>
        <div className="input-group-full">
          <div className="input-field">
            <label className="label">
              Número de Tarjeta:
              <input
                className="input-line"
                type="text"
                value={cardNumber}
                onChange={(e) => {
                  setCardNumber(e.target.value);
                  if (
                    e.target.value.length === 12 &&
                    e.target.value !== "123456789123"
                  ) {
                    setCardNumberError("Número de tarjeta incorrecto");
                  } else {
                    setCardNumberError("");
                  }
                }}
                placeholder="Número de Tarjeta"
                required
                maxLength={12}
              />
              {cardNumberError && (
                <span className="error">{cardNumberError}</span>
              )}
            </label>
          </div>
        </div>

        <div className="row">
          <label className="label">
            Nombre del titular:
            <input
              className="input-line input-large"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value !== "Camila") {
                  setNameError("Nombre incorrecto");
                } else {
                  setNameError("");
                }
              }}
              placeholder="Nombre"
              required
            />
            {nameError && <span className="error">{nameError}</span>}
          </label>
          <label className="label">
            Tipo de Documento:
            <select
              className="input-line input-extra-small"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              required
            >
              <option value="DNI">DNI</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </label>
          <label className="label">
            Documento:
            <input
              className="input-line input-medium"
              type="number"
              value={document}
              onChange={(e) => {
                setDocument(e.target.value);
                if (
                  e.target.value.length === 8 &&
                  e.target.value !== "123456789"
                ) {
                  setDocumentError("Documento incorrecto");
                } else {
                  setDocumentError("");
                }
              }}
              placeholder="Documento"
              required
              maxLength={8} //
            />
            {documentError && <span className="error">{documentError}</span>}
          </label>
        </div>
        <div className="input-group">
          <div className="row-Fecha">
            <div className="input-field">
              <label className="label">Fecha de Vencimiento:</label>
              <input
                className="input-line"
                type="text"
                maxLength={5}
                onChange={(e) => {
                  let input = e.target.value;
                  // Solo permite números y la barra (/)
                  const regex = /^[0-9/]*$/;
                  if (!regex.test(input)) {
                    return;
                  }
                  if (input.length === 2 && !input.includes("/")) {
                    input = input + "/";
                  }
                  setExpiryDate(input);
                  if (input.length === 5) {
                    const [month, year] = input.split("/");
                    const numMonth = Number(month);
                    const numYear = Number(year);
                    if (numMonth > 12 || numMonth < 1 || year.length !== 2) {
                      setExpiryDateError("Fecha de vencimiento incorrecta");
                    } else {
                      setExpiryDateError("");
                    }
                  }
                }}
                placeholder="MM/AA"
                required
                value={expiryDate}
              />
              {expiryDateError && (
                <span className="error">{expiryDateError}</span>
              )}
            </div>
            <div className="input-field">
              <label className="label">Código de Seguridad:</label>
              <input
                className="input-line"
                type="text"
                value={securityCode}
                onChange={(e) => {
                  setSecurityCode(e.target.value);
                  if (e.target.value.length === 3 && e.target.value !== "123") {
                    setSecurityCodeError("Código de seguridad incorrecto");
                  } else {
                    setSecurityCodeError("");
                  }
                }}
                placeholder="Código de Seguridad"
                required
                maxLength={3} //
              />
              {securityCodeError && (
                <span className="error">{securityCodeError}</span>
              )}
            </div>
          </div>
        </div>

        <Button
          className="primary-button mt-[10px]"
          type={undefined}
          onClick={onClickButton}
        >
          Confirmar
        </Button>
      </div>
    </BasicModal>
  );
};

export default PaymentModal;

interface IPaymentModal {
  open: boolean;
  onClose: () => void;
  onClickButton: () => void;
  children?: React.ReactNode;
}
