export default function WalletDashboard({ spent = 0, wallet = {} }) {

    const allowanceValue = Number(wallet.allowance ?? 0);
    const balance = allowanceValue - spent;

    const percentage = allowanceValue
        ? (spent / allowanceValue) * 100
        : 0;

    return (
        <div className="h-full rounded-2xl p-5 mb-10 shadow [background:var(--wallet-card-bg)] text-white">

            <p className="text-sm opacity-80">
                Available Balance
            </p>

            <h2 className="text-5xl mt-2 font-semibold">
                ${balance.toFixed(2)}
            </h2>


            <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-white/15 p-4">
                    <p className="text-sm opacity-80">
                        Monthly Budget
                    </p>

                    <p className="text-lg">
                        ${allowanceValue.toFixed(2)}
                    </p>
                </div>


                <div className="rounded-xl bg-white/15 p-4">
                    <p className="text-sm opacity-80">
                        Spent
                    </p>

                    <p className="text-lg font-semibold">
                        ${spent.toFixed(2)}
                    </p>
                </div>

            </div>


            <div className="mt-2">

                <div className="flex justify-between text-sm mb-2">
                    <span>
                        Budget Used
                    </span>

                    <span>
                        {percentage.toFixed(0)}%
                    </span>
                </div>


                <div className="h-2 rounded-full bg-white/20 overflow-hidden">

                    <div
                        className="h-full rounded-full bg-white"
                        style={{
                            width: `${Math.min(percentage, 100)}%`
                        }}
                    />

                </div>

            </div>

        </div>
    );
}