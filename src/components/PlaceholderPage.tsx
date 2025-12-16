import GlobalHeader from '@/components/GlobalHeader';
import Footer from '@/components/Footer';
import { FaGamepad, FaTrophy, FaStore, FaShoppingCart } from 'react-icons/fa';

export default function PlaceholderPage({ title, icon: Icon, description }: { title: string, icon: any, description: string }) {
    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
            <GlobalHeader />
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border-2 border-fuchsia-500/30 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
                    <Icon className="text-5xl text-fuchsia-500" />
                </div>
                <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                    {title}
                </h1>
                <p className="text-xl text-gray-400 max-w-lg mb-8">
                    {description}
                </p>
                <button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
                    Coming Soon
                </button>
            </div>
            <Footer />
        </div>
    );
}
