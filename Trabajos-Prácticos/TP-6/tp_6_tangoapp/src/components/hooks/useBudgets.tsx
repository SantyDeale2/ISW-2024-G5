import React, { useEffect, useState } from "react";
import RatingStars from "../RatingStars";
import { useRouter } from "next/navigation";

const useBudgets = () => {
  const [actualBudget, setActualBudget] = useState<IBudgetData | null>(null);
  const [paymentOption, setPaymentOption] = useState("cash_pickup");
  const [modals, setModals] = useState({
    success: { show: false },
    loading: { show: true },
  });
  const [budgetList, setBudgetList] = useState<IBudgetData[] | null>(null);
  const [status, setStatus] = useState<IStatusData | null>(null);
  const [transporterId, setTransporterId] = useState("");

  const router = useRouter();

  useEffect(() => {
    const currentUrl = window.location.href;
    const budgetId = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    setTransporterId(budgetId);

    const statusLocalStorage = localStorage.getItem("status");

    if (!statusLocalStorage) {
      const statusData = { value: "Registrado", id: "" };
      localStorage.setItem("status", JSON.stringify(statusData));
    } else {
      const parsedStatus = JSON.parse(statusLocalStorage);

      if (parsedStatus.id !== "" && parsedStatus.id !== budgetId) {
        router.push("/budget");
      }

      setStatus(parsedStatus);
    }

    setTimeout(() => {
      let parsedData;

      const storedData = localStorage.getItem("budgetList");

      if (!storedData || storedData.length === 0) {
        const budgetlist = [
          {
            id: "381c668b-47aa-465a-91fb-d375b146f68e",
            name: "Camila Campos",
            rating: 3.6,
            budget: 200000,
            pickUpDate: new Date(),
          },
          {
            id: "d9ee6a90-37b5-4f88-82eb-177a300a7d5b",
            name: "Florencia Vargas",
            rating: 2.3,
            budget: 80000,
            pickUpDate: new Date(),
          },
          {
            id: "e84b6b9d-3d8c-4d34-8d8b-8a3b7450f571",
            name: "El TUTE",
            rating: 5.0,
            budget: 10000,
            pickUpDate: new Date(),
          },
        ];

        setBudgetList(budgetlist);
        localStorage.setItem("budgetList", JSON.stringify(budgetlist));
      } else {
        parsedData = JSON.parse(storedData);
        setBudgetList(parsedData);
      }

      const selectedBudget = parsedData.find(
        (budget: IBudgetData) => budget.id === budgetId
      );

      if (selectedBudget) {
        setActualBudget(selectedBudget);
      }
    }, 1000);
  }, []);

  const actions = {
    handlePaymentOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentOption(event.target.value);
    },
    handleConfirmPayment: () => {
      actions.enviarEmail();
      const statusData = { value: "Confirmado", id: transporterId };
      localStorage.setItem("status", JSON.stringify(statusData));
      setModals({
        ...modals,
        success: { show: true },
      });
    },
    enviarEmail: async () => {
      const msg = {
        to: "test@example.com", // Change to your recipient
        from: "test@example.com", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      };
      try {
        const response = await fetch("send-messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            msg,
          }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
      }
    },
  };

  const system = { budgetList, actualBudget, paymentOption, modals, status };

  return { actions, system };
};

export default useBudgets;

interface IBudgetData {
  id: string;
  name: string;
  rating: number;
  budget: number;
  pickUpDate: Date;
}

interface IStatusData {
  id: string;
  value: string;
}
