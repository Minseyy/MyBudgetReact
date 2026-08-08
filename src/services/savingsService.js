import { ref, push, remove, update } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export async function addSavings(saving) {
    const depositsRef = ref(db, "deposits");
    const newDepositRef = await push(depositsRef, saving);

    return newDepositRef.key;
}

export async function deleteSavings(id) {
    const depositRef = ref(db, `deposits/${id}`);
    await remove(depositRef);
}

export async function updateSavings(id, saving) {
    const depositRef = ref(db, `deposits/${id}`);
    await update(depositRef, saving);
}