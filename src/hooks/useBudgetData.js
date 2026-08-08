import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export default function useBudgetData() {
  const [data, setData] = useState(null);

  const calculateTotal = (data) => {
    return data.reduce((sum, x) => sum + Number(x.amount), 0);
  };

  useEffect(() => {
    async function loadData() {
      const [transactions, incomes, deposits, wallet, goals] =
        await Promise.all([
          fetchData("transactions"),
          fetchData("incomes"),
          fetchData("deposits"),
          fetchData("wallet"),
          fetchData("goals"),
        ]);

      const incomeTotal = calculateTotal(incomes);
      const expenseTotal = calculateTotal(transactions);
      const savingTotal = calculateTotal(deposits);
      const goalTotal = calculateTotal(goals);
      const walletEntries = Object.entries(wallet).map(([key, value]) => ({
        key,
        value: Number(value),
      }));

      setData({
        incomes,
        transactions,
        incomeTotal,
        expenseTotal,
        savingTotal,
        goalTotal,
        deposits,
        goals,
        walletEntries,
        wallet,
      });
    }
    loadData();
  }, []);

  async function fetchData(path) {
    const snapshot = await get(ref(db, path));

    const value = snapshot.val();

    if (!value) return [];

    if (path === "wallet") {
      return value;
    }

    return Object.entries(value).map(([id, item]) => ({
      id,
      ...item,
    }));
  }
  return data;
}
