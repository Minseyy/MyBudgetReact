import { useEffect, useState, useMemo } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";

function useFirebaseList(path) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const dataRef = ref(db, path);
        return onValue(
            dataRef,
            (snapshot) => {
                const value = snapshot.val();
                setItems(value ? Object.entries(value).map(([id, item]) => ({ id, ...item })) : []);
            },
            (error) => console.error(`onValue error for ${path}:`, error)
        );
    }, [path]);
    return items;
}

export default function useBudgetData() {
    const transactions = useFirebaseList("transactions");
    const incomes = useFirebaseList("incomes");
    const deposits = useFirebaseList("deposits");
    const goals = useFirebaseList("goals");

    const [wallet, setWallet] = useState({});
    useEffect(() => {
        return onValue(
            ref(db, "wallet"),
            (snapshot) => setWallet(snapshot.val() ?? {}),
            (error) => console.error("onValue error for wallet:", error)
        );
    }, []);

    const calculateTotal = (items) =>
        items.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    return useMemo(() => ({
        transactions,
        incomes,
        deposits,
        wallet,
        goals,
        incomeTotal: calculateTotal(incomes),
        expenseTotal: calculateTotal(transactions),
        savingTotal: calculateTotal(deposits),
        goalTotal: calculateTotal(goals),
    }), [transactions, incomes, deposits, wallet, goals]);
}