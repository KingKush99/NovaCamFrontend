import GlobalHeader from '@/components/GlobalHeader';
import MiniSlots from '@/components/MiniSlots';
import AIChatbot from '@/components/AIChatbot';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import Footer from '@/components/Footer';

export default function CamsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-fuchsia-500/30">
            <GlobalHeader />
            <main className="container mx-auto px-4 py-6 pb-24">
                {children}
            </main>
            <MiniSlots />
            <AIChatbot />
            <AgeVerificationModal />
            <Footer />
        </div>
    );
}
