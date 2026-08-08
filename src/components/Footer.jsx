export default function Footer() {
    return (
        <footer className="mt-12 border-t border-[#E8D0CD] py-6">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

                <p className="text-sm text-[#6b6375]">
                    © 2026 MyBudget. All rights reserved.
                </p>

                {/* <div className="flex gap-6 text-sm text-[#6b6375]">
                    <a
                        href="#"
                        className="hover:text-purple-600 transition"
                    >
                        Privacy
                    </a>

                    <a
                        href="#"
                        className="hover:text-purple-600 transition"
                    >
                        Terms
                    </a>

                    <a
                        href="#"
                        className="hover:text-purple-600 transition"
                    >
                        Contact
                    </a>
                </div> */}

            </div>
        </footer>
    );
}