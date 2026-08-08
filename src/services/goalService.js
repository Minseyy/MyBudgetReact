import { ref, push } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export async function addGoal(goal) {
    const goalsRef = ref(db, "goals");

    const newGoalRef = await push(goalsRef, goal);

    return newGoalRef.key;
}

export async function removeGoal(id) {
    const goalRef = ref(db, `goals/${id}`);
    await remove(goalRef);
}

export async function updateGoal(id, goal) {
    const goalRef = ref(db, `goals/${id}`);
    await update(goalRef, goal);
}