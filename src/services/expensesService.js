import { ref, push } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export async function addExpense(expense) {
    const expensesRef = ref(db, "expenses");

    const newExpenseRef = await push(expensesRef, expense);

    return newExpenseRef.key;
}

export async function removeExpense(id) {
    const expenseRef = ref(db, `expenses/${id}`);
    await remove(expenseRef);
}

export async function updateExpense(id, expense) {
    const expenseRef = ref(db, `expenses/${id}`);
    await update(expenseRef, expense);
}