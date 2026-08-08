export default function StatsCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
        {icon}
      </div>
    </div>
  );
}