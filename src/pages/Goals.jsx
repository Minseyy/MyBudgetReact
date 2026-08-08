import Navbar from "@/components/Navbar";
import GoalsGrid from "../components/GoalsGrid";
import StatsCard from "../components/StatsCard";

export default function Goals({ goals = [], savingsTotal = 0 }) {
        const [openModal, setOpenModal] = useState(false);

    return (
        <div className="min-h-screen">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8 ">

                <h1 className="text-4xl font-bold mb-8">
                    Goals
                </h1>
            </main>


            <div className="mx-auto container ">
                <h2>Goals Overview</h2>
                {/* Stats card */}
                <div className="grid grid-cols-3 align-items-center gap-5">
                    <StatsCard title="Total Savings" value={savingsTotal}/>
                    <StatsCard title="Total Goals" value={goals.length}/>
                    <StatsCard title="Overall Progress" value={savingsTotal}/>  
                </div>

                {/* Goals Grid */}
                <div className="">
                    <GoalsGrid goals={goals} deposits={deposits} />
                </div>
            </div>
        </div>
    );
}