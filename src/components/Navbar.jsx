import { Link } from "react-router-dom";
import { useState } from "react";
import settings from "../assets/settings.png";
import signature from "../assets/signature.png";
import walletIcon from "../assets/wallet.png";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (

        <nav className=" bg-[var(--navbar-bg)] shadow">
            <div className="mx-auto container flex items-center justify-between h-20">

                <div className="flex items-start">
                    {/* Left Logo */}
                    <Link
                        to="/"
                        className=""
                    >
                        <img src={signature} alt="Home Icon" className="h-12 pt-1" />

                    </Link>
                </div>





                {/* Right */}
                <div className="flex items-center gap-6 justify-end ">
                    <button
                        className="text-2xl focus:outline-none"
                        id="navbar-button"
                        onClick={() => setOpen(prev => !prev)}
                        aria-label="Toggle navigation"
                    >
                        <i
                            className={`fa-solid fa-bars inline-block transition-transform duration-1000 ${open ? "rotate-90" : "rotate-0"
                                }`}
                        />


                    </button>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/settings"
                            className="hover:text-purple-600 transition"
                        >
                            <img src={settings} alt="Settings" className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>




            <div
                className={`overflow-hidden transition-all duration-1000 ease-in-out 
                    ${open
                        ? "max-h-48 opacity-100 translate-y-0 bg-[var(--navbar-expanded-bg)] p-10"
                        : "max-h-0 opacity-0 -translate-y-4"
                    }`}
            >
                <div className="flex justify-center items-center">
                    <ul className="flex flex-row text-center justify-center items-center gap-12 font-medium px-4 py-4 text-lg">

                        {[
                            {
                                path: "/wallet",
                                icon: "fa-wallet",
                                color: "#B077EC",
                                label: "Wallet"
                            },
                            {
                                path: "/savings",
                                icon: "fa-piggy-bank",
                                color: "#F7C678",
                                label: "Savings"
                            },
                            {
                                path: "/expenses",
                                icon: "fa-file-invoice-dollar",
                                color: "#9EE5FF",
                                label: "Expenses"
                            },
                            {
                                path: "/goals",
                                icon: "fa-arrow-trend-up",
                                color: "#FFB4C2",
                                label: "Goals"
                            }
                        ].map((item) => (
                            <li
                                key={item.path}
                                className="group flex flex-col items-center gap-2"
                            >
                                <Link
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className="transition-transform duration-300 group-hover:-translate-y-1"
                                >
                                    <i className={`
                                            fa-solid ${item.icon}
                                            text-7xl
                                            transition-all duration-300
                                            group-hover:scale-110
                                            group-hover:brightness-90
                                        `}
                                        style={{ color: item.color }}
                                    />
                                </Link>

                                <p className="text-sm font-medium
                                        transition-all duration-300
                                        group-hover:-translate-y-1
                                        group-hover:[color:var(--item-color)]"
                                    style={{"--item-color": item.color}}>
                                    {item.label}
                                </p>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </nav>
    );
}