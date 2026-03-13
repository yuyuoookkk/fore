export default function Footer() {
    return (
        <footer className="relative z-20 bg-[#020202] text-white py-12 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-2xl font-bold uppercase">Fore</div>
                <div className="flex gap-8 text-sm opacity-50">
                    <a href="#" className="hover:opacity-100">Instagram</a>
                    <a href="#" className="hover:opacity-100">Twitter</a>
                    <a href="#" className="hover:opacity-100">LinkedIn</a>
                </div>
                <div className="text-xs opacity-30">
                    &copy; 2024 Fore Coffee. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
