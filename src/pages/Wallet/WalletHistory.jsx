import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HistoryPage from "../History";
import DeleteModal from "../../components/DeleteModal";
import AddIncomeForm from "../../components/ForWalletPage/AddIncomeForm";
import { deleteIncome, updateIncome } from "../../services/incomeService";

export default function WalletHistory({
    incomes = [],
    incomeTotal = 0,
}) {
    const [editingIncome, setEditingIncome] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [deletingIncome, setDeletingIncome] = useState(null);

    // EDIT
    const handleEdit = (income) => {
        setEditingIncome(income);
        setOpenModal(true);
    }

    const handleDeleteClick = (income) => {
        console.log("🗑️ DELETE CLICKED");
        console.log("Income:", income);
        console.log("Income ID:", income?.id);
        setDeletingIncome(income);
    };

    const handleConfirmDelete = async (income) => {
        console.log("🔥 CONFIRM DELETE");
        console.log("Income:", income);
        console.log("ID:", income?.id);

        if (!income?.id) {
            console.error("❌ No income ID found");
            return;
        }

        try {
            await deleteIncome(income.id);

            console.log("✅ DELETE SUCCESS");

            setDeletingIncome(null);
        } catch (error) {
            console.error("❌ DELETE ERROR:", error);
            alert("Failed to delete income. Please try again.");
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <HistoryPage
                    records={incomes}
                    total={incomeTotal}
                    totalLabel="Total Income"
                    title="Income History"
                    searchPlaceholder="🔍︎ Search income source..."
                    searchField="source"
                    backRoute="/wallet"
                    onDelete={handleConfirmDelete}
                    onEdit={updateIncome}
                    onEditClick={handleEdit}
                    onDeleteClick={handleDeleteClick}
                    columns={[
                        {
                            header: "Date",
                            key: "date",
                        },
                        {
                            header: "Source",
                            key: "source",
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

            <Footer />
        </div>
    );
}
