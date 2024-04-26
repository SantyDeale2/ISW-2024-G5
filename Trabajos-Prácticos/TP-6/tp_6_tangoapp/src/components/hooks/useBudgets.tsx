import React, { useEffect, useState } from "react";

const useBudgets = () => {
  const [actualBudget, setActualBudget] = useState<IBudgetData | null>(null);
  const [paymentOption, setPaymentOption] = useState("credit");
  const [modals, setModals] = useState({
    success: { show: false },
  });

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

  useEffect(() => {
    const currentUrl = window.location.href;
    const budgetId = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

    const selectedBudget = budgetlist.find((budget) => budget.id === budgetId);

    if (selectedBudget) {
      setActualBudget(selectedBudget);
    }
  }, []);

  const actions = {
    renderStars: (rating: number) => {
      const stars = [];
      const filled = Math.floor(rating);
      const fraction = rating - filled;
      const fullStarWidth = 100 / 5;

      for (let i = 0; i < filled; i++) {
        stars.push(
          <span key={i} className="text-yellow-400 text-4xl">
            &#9733;
          </span>
        );
      }

      let lastStarFraction = 0;
      if (fraction > 0 && fraction < 1) {
        lastStarFraction = fraction * fullStarWidth;
      } else if (fraction >= 1) {
        lastStarFraction = fullStarWidth;
      }

      if (lastStarFraction > 0) {
        const style = {
          width: `${lastStarFraction}%`,
          overflow: "hidden",
        };
        stars.push(
          <span
            key="fraction"
            className="text-yellow-400 text-4xl"
            style={style}
          >
            &#9733;
          </span>
        );
      }
      return stars;
    },
    handlePaymentOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentOption(event.target.value);
    },
    handleConfirmPayment: () => {
      setModals({
        ...modals,
        success: { show: true },
      });
    },
  };

  const system = { budgetlist, actualBudget, paymentOption, modals };

  return { actions, system };
};

export default useBudgets;

interface IBudgetData {
  name: string;
  rating: number;
  budget: number;
  pickUpDate: Date;
}
