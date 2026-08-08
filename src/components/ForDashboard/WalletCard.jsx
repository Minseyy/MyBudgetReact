export default function WalletCard({ wallet }) {
    const expected = Number(wallet.allowance || 0);
    const actual = Number(wallet.spent || 0);

    return (
        <div className="group relative min-h-64 w-full overflow-visible">

            <div className="absolute inset-y-0 left-0 w-full rounded-2xl bg-[#eadbc8] shadow-md"></div>

            <div className="absolute inset-y-0 left-0 w-[calc(100%-10px)] rounded-2xl bg-[#c99afb] shadow-md transition-all duration-300 group-hover:w-[calc(100%-25px)]"></div>

            <div className="absolute inset-y-0 left-0 w-[calc(100%-25px)] rounded-2xl p-6 text-white shadow-xl [background:var(--wallet-card-bg)] transition-all duration-300 group-hover:w-[calc(100%-50px)]">
                <h2 className="text-xl font-semibold">
                    Wallet Overview
                </h2>

                <div className="mt-6">

                    <p className="text-sm opacity-80">
                        Left to Spend
                    </p>

                    <p className="text-4xl font-semibold  text-shadow-lg">
                        ${(expected - actual).toFixed(2)}
                    </p>

                    <div className="mt-6 space-y-3 text-sm">

                        <div className="flex justify-between">
                            <span className="opacity-80">
                                Monthly Budget
                            </span>
                            <span>
                                ${expected.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="opacity-80">
                                Spent
                            </span>
                            <span>
                                ${actual.toFixed(2)}
                            </span>
                        </div>

                    </div>

                </div>

                <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-sm"></div>
                <div className="absolute bottom-4 right-8 h-20 w-20 rounded-full bg-white/15 blur-sm"></div>
                <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full border border-white/10"></div>
                <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full border border-white/10"></div>
                <div className="absolute bottom-6 right-6 h-24 w-24 rounded-full border border-white/15"></div>
            </div>

        </div>
    );
}