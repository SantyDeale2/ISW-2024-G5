import React, { useEffect, useState } from "react";

const useHome = () => {
  const [budgetList, setBudgetList] = useState<IBudgetData[] | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("budgetList");
    const status = localStorage.getItem("status");

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

      if (!status) {
        const statusData = { value: "Registrado", id: "" };
        localStorage.setItem("status", JSON.stringify(statusData));
      }

      setBudgetList(budgetlist);
      localStorage.setItem("budgetList", JSON.stringify(budgetlist));
    }
  }, []);

  const system = { budgetList };

  return { system };
};

interface IBudgetData {
  id: string;
  name: string;
  rating: number;
  budget: number;
  pickUpDate: Date;
}

export default useHome;
