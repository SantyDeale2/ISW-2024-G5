import React, { useEffect, useState } from "react";
import RatingStars from "../RatingStars";
import { useRouter } from "next/navigation";

const useBudgets = () => {
  const [modals, setModals] = useState({
    loading: { show: true },
    details: { show: false },
  });
  const [budgetList, setBudgetList] = useState<IBudgetData[] | null>(null);
  const [actualOrder, setActualOrder] = useState<IOrderData | null>(null);

  const [budgetSelected, setBudgetSelected] = useState<IBudgetData | null>(
    null
  );
  const [orderSelected, setOrderSelected] = useState<IOrderData | null>(null);

  function randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  function randomPickUpDate() {
    const currentDate = new Date();
    const randomDays = Math.floor(Math.random() * 4) + 1;
    const pickUpDate = new Date(currentDate);
    pickUpDate.setDate(currentDate.getDate() + randomDays);
    return pickUpDate;
  }

  useEffect(() => {
    const currentUrl = window.location.href;
    const orderId = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

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
            pickUpDate: randomPickUpDate(),
            deliveryDate: new Date(),
            idOrder: "7d271fef-8ab4-4f7d-933f-7b4c6b6b8554",
            email: "camilacampossaldarriaga@gmail.com",
          },
          {
            id: "d9ee6a90-37b5-4f88-82eb-177a300a7d5b",
            name: "Florencia Vargas",
            rating: 2.3,
            budget: 80000,
            pickUpDate: randomPickUpDate(),
            deliveryDate: new Date(),
            idOrder: "7d271fef-8ab4-4f7d-933f-7b4c6b6b8554",
            email: "florenciavargas567@gmail.com",
          },
          {
            id: "e84b6b9d-3d8c-4d34-8d8b-8a3b7450f571",
            name: "El TUTE",
            rating: 5.0,
            budget: 10000,
            pickUpDate: randomPickUpDate(),
            deliveryDate: new Date(),
            idOrder: "7d271fef-8ab4-4f7d-933f-7b4c6b6b8554",
            email: "matihayden@gmail.com",
          },
          {
            id: "e84b6b9d-3d8c-4d34-8d8b-8a3ef50f571",
            name: "Juan Capdevila",
            rating: 1.4,
            budget: 9000,
            pickUpDate: randomPickUpDate(),
            deliveryDate: new Date(),
            idOrder: "7d271fef-8ab4-4f7d-933f-7b4c6b6b8554",
            email: "juanca@gmail.com",
          },
          {
            id: "381c668b-47aa-465a-91fb-d375b146f68e",
            name: "Camila Campos",
            rating: 3.6,
            budget: 300000,
            pickUpDate: randomPickUpDate(),
            deliveryDate: new Date(),
            idOrder: "6a0c06b8-eae5-44cc-97e4-2aa35bb1cb0f",
            email: "camilacampossaldarriaga@gmail.com",
          },
          {
            id: "d9ee6a90-37b5-4f88-82eb-177a300a7d5b",
            name: "Florencia Vargas",
            rating: 2.3,
            budget: 100000,
            pickUpDate: randomPickUpDate(),
            deliveryDate: new Date(),
            idOrder: "6a0c06b8-eae5-44cc-97e4-2aa35bb1cb0f",
            email: "florenciavargas567@gmail.com",
          },
          {
            id: "e84b6b9d-3d8c-4d34-8d8b-8a3b7450f571",
            name: "El TUTE",
            rating: 5.0,
            budget: 30000,
            pickUpDate: randomPickUpDate(),
            deliveryDate: new Date(),
            idOrder: "6a0c06b8-eae5-44cc-97e4-2aa35bb1cb0f",
            email: "matihayden@gmail.com",
          },
          {
            id: "e84b6b9d-3d8c-4d34-8d8b-8a3ef50f571",
            name: "Juan Capdevila",
            rating: 1.4,
            budget: 27000,
            pickUpDate: randomPickUpDate(),
            deliveryDate: new Date(),
            idOrder: "6a0c06b8-eae5-44cc-97e4-2aa35bb1cb0f",
            email: "juanca@gmail.com",
          },
          {
            id: "381c668b-47aa-465a-91fb-d375b146f68e",
            name: "Camila Campos",
            rating: 3.6,
            budget: 1000,
            pickUpDate: randomPickUpDate(),
            deliveryDate: new Date(),
            idOrder: "4b5f8f21-fb6f-4941-bc0f-fa1fcf8a25a6",
            email: "camilacampossaldarriaga@gmail.com",
          },
          {
            id: "d9ee6a90-37b5-4f88-82eb-177a300a7d5b",
            name: "Florencia Vargas",
            rating: 2.3,
            budget: 2000,
            pickUpDate: randomPickUpDate(),
            deliveryDate: new Date(),
            idOrder: "4b5f8f21-fb6f-4941-bc0f-fa1fcf8a25a6",
            email: "florenciavargas567@gmail.com",
          },
          {
            id: "e84b6b9d-3d8c-4d34-8d8b-8a3b7450f571",
            name: "El TUTE",
            rating: 5.0,
            budget: 200,
            pickUpDate: randomPickUpDate(),
            deliveryDate: new Date(),
            idOrder: "4b5f8f21-fb6f-4941-bc0f-fa1fcf8a25a6",
            email: "matihayden@gmail.com",
          },
          {
            id: "e84b6b9d-3d8c-4d34-8d8b-8a3ef50f571",
            name: "Juan Capdevila",
            rating: 1.4,
            budget: 5000,
            pickUpDate: randomPickUpDate(),
            deliveryDate: new Date(),
            idOrder: "4b5f8f21-fb6f-4941-bc0f-fa1fcf8a25a6",
            email: "juanca@gmail.com",
          },
        ];

        budgetlist.forEach((item) => {
          const pickUpDate = item.pickUpDate;

          const deliveryDate = new Date(pickUpDate);
          deliveryDate.setDate(deliveryDate.getDate() + 7);

          item.deliveryDate = randomDate(
            deliveryDate,
            new Date(deliveryDate.getTime() + 7 * 24 * 60 * 60 * 1000)
          );
        });

        const filteredBudgetList = budgetlist.filter(
          (budget: IBudgetData) => budget.idOrder === orderId
        );

        setBudgetList(filteredBudgetList);
        localStorage.setItem("budgetList", JSON.stringify(budgetlist));
      } else {
        parsedData = JSON.parse(storedData);

        const filteredBudgetList = parsedData.filter(
          (budget: IBudgetData) => budget.idOrder === orderId
        );

        setBudgetList(filteredBudgetList);
      }

      const storedDataOrder = localStorage.getItem("orderList");
      if (storedDataOrder) {
        parsedData = JSON.parse(storedDataOrder);

        const filteredOrderList = parsedData.filter(
          (order: IOrderData) => order.id === orderId
        );

        setActualOrder(filteredOrderList[0]);
      }

      setModals({
        ...modals,
        loading: { show: false },
      });
    }, 1000);
  }, []);

  const actions = {
    handleViewDetails: (budgetId: string, orderId: string) => {
      let parsedData;

      const storedDataBudget = localStorage.getItem("budgetList");
      if (storedDataBudget) {
        parsedData = JSON.parse(storedDataBudget);
        const filteredBudgetList = parsedData.filter(
          (budget: IBudgetData) =>
            budget.idOrder === orderId && budget.id === budgetId
        );

        setBudgetSelected(filteredBudgetList[0]);
      }

      const storedDataOrder = localStorage.getItem("orderList");
      if (storedDataOrder) {
        parsedData = JSON.parse(storedDataOrder);

        const filteredOrderList = parsedData.filter(
          (order: IOrderData) => order.id === orderId
        );

        setOrderSelected(filteredOrderList[0]);
      }

      setModals({
        ...modals,
        details: {
          show: true,
        },
      });
    },
    handleCloseDetailModal: () => {
      setModals({
        ...modals,
        details: {
          show: false,
        },
      });
    },
  };

  const system = {
    budgetList,
    modals,
    actualOrder,
    budgetSelected,
    orderSelected,
  };

  return { system, actions };
};

export default useBudgets;

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

interface IOrderData {
  id: string;
  serie: string;
  status: string;
  idBudget: string;
  paymentMethod: string;
  number: string;
}
