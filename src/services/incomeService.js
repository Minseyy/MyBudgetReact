import { ref, push } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export async function addIncome(income) {
    const incomesRef = ref(db, "incomes");

    const newIncomeRef = await push(incomesRef, income);

    return newIncomeRef.key;
}

export async function deleteIncome(id) {
    const incomeRef = ref(db, `incomes/${id}`);
    await remove(incomeRef);
}

export async function updateIncome(id, income) {
    const incomeRef = ref(db, `incomes/${id}`);
    await update(incomeRef, income);
}