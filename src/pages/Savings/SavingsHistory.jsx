import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HistoryPage from "../History";
import {
    deleteSavings,
    updateSavings
} from "../../services/savingsService";
import { useState } from "react";
import SlideUpModal from "../../components/SlideUpModal";
import AddDepositsForm from "../../components/ForSavingsPage/AddDepositsForm";
import DeleteModal from "../../components/DeleteModal";

export default function SavingsHistory({
    savings = [],
    savingTotal = 0,
    goals = []
}) {
    const [editingSaving, setEditingSaving] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [deletingSaving, setDeletingSaving] = useState(null);

    // -------------------------
    // EDIT
    // -------------------------
    const handleEdit = (saving) => {
        setEditingSaving(saving);
        setOpenModal(true);
    };

    // -------------------------
    // DELETE - OPEN MODAL
    // -------------------------
    const handleDeleteClick = (saving) => {
        console.log("🗑️ DELETE CLICKED");
        console.log("Saving:", saving);
        console.log("Saving ID:", saving?.id);

        setDeletingSaving(saving);
    };

    // -------------------------
    // DELETE - CONFIRM
    // -------------------------
    const handleConfirmDelete = async (saving) => {
        console.log("🔥 CONFIRM DELETE");
        console.log("Saving:", saving);
        console.log("ID:", saving?.id);

        if (!saving?.id) {
            console.error("❌ No saving ID found");
            return;
        }

        try {
            await deleteSavings(saving.id);

            console.log("✅ DELETE SUCCESS");

            // Close delete modal
            setDeletingSaving(null);

        } catch (error) {
            console.error("❌ DELETE ERROR:", error);
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <HistoryPage
                    records={savings}
                    total={savingTotal}
                    totalLabel="Total Savings"
                    title="Savings History"
                    searchPlaceholder="🔍︎ Search savings category..."
                    searchField="goalId"
                    backRoute="/savings"

                    // IMPORTANT:
                    // This opens the custom delete modal
                    onDelete={handleDeleteClick}

                    // Opens the edit modal
                    onEdit={handleEdit}

                    columns={[
                        {
                            header: "Date",
                            key: "date",
                        },
                        {
                            header: "Savings Category",
                            key: "goalId",
                            render: (goalId) => {
                                const goal = goals.find(
                                    (goal) => goal.id === goalId
                                );

                                return goal ? goal.name : "-";
                            },
                        },
                        {
                            header: "Amount",
                            key: "amount",
                            render: (value) =>
                                `$${Number(value).toFixed(2)}`,
                        },
                    ]}
                />
            </main>

            {/* EDIT / ADD MODAL */}
            <SlideUpModal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditingSaving(null);
                }}
                title={editingSaving ? "Edit Savings" : "Add Savings"}
            >
                <AddDepositsForm
                    goals={goals}
                    saving={editingSaving}
                    onClose={() => {
                        setOpenModal(false);
                        setEditingSaving(null);
                    }}
                />
            </SlideUpModal>

            {/* DELETE MODAL */}
            <DeleteModal
                isOpen={!!deletingSaving}
                onClose={() => setDeletingSaving(null)}
                onDelete={handleConfirmDelete}
                title="Delete Savings"
                record={deletingSaving}
                details={[
                    {
                        label: "Date",
                        key: "date",
                    },
                    {
                        label: "Goal",
                        key: "goalId",
                        render: (goalId) => {
                            const goal = goals.find(
                                (goal) => goal.id === goalId
                            );

                            return goal ? goal.name : "-";
                        },
                    },
                    {
                        label: "Amount",
                        key: "amount",
                        render: (amount) =>
                            `$${Number(amount).toFixed(2)}`,
                    },
                ]}
            />

            <Footer />
        </div>
    );
}