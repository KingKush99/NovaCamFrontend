'use client';

import { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function AgeVerificationModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasAgreed = localStorage.getItem('age-verified');
        if (!hasAgreed) {
            setIsOpen(true);
        }
    }, []);

    const handleAgree = () => {
        localStorage.setItem('age-verified', 'true');
        setIsOpen(false);
    };

    const handleExit = () => {
        window.location.href = 'https://www.google.com';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-zinc-800 p-4 border-b border-zinc-700 text-center">
                    <h2 className="text-xl font-bold text-white uppercase flex items-center justify-center gap-2">
                        <FaExclamationTriangle className="text-orange-500" />
                        You must be over 18 and agree to the terms below before continuing:
                    </h2>
                </div>

                {/* Content */}
                <div className="p-6 text-zinc-300 text-sm space-y-4 max-h-[60vh] overflow-y-auto">
                    <p>
                        This website contains information, links, images and videos of sexually explicit material (collectively, the "Sexually Explicit Material"). Do NOT continue if: (i) you are not at least 18 years of age or the age of majority in each and every jurisdiction in which you will or may view the Sexually Explicit Material, whichever is higher (the "Age of Majority"), (ii) such material offends you, or (iii) viewing the Sexually Explicit Material is not legal in each and every community where you choose to view it.
                    </p>
                    <p>
                        By choosing to enter this website you are affirming under oath and penalties of perjury pursuant to Title 28 U.S.C. § 1746 and other applicable statutes and laws that all of the following statements are true and correct:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>I have attained the Age of Majority in my jurisdiction;</li>
                        <li>The sexually explicit material I am viewing is for my own personal use and I will not expose any minors to the material;</li>
                        <li>I desire to receive/view sexually explicit material;</li>
                        <li>I believe that as an adult it is my inalienable constitutional right to receive/view sexually explicit material;</li>
                        <li>I believe that sexual acts between consenting adults are neither offensive nor obscene;</li>
                        <li>The viewing, reading and downloading of sexually explicit materials does not violate the standards of any community, town, city, state or country where I will be viewing, reading and/or downloading the Sexually Explicit Materials;</li>
                        <li>I am solely responsible for any false disclosures or legal ramifications of viewing, reading or downloading any material appearing on this site. I further agree that neither this website nor its affiliates will be held responsible for any legal ramifications arising from any fraudulent entry into or use of this website.</li>
                    </ul>

                    <div className="font-bold text-red-500 text-center mt-4 border border-red-500/30 bg-red-500/10 p-3 rounded">
                        THIS SITE ACTIVELY COOPERATES WITH LAW ENFORCEMENT IN ALL INSTANCES OF SUSPECTED ILLEGAL USE OF THE SERVICE, ESPECIALLY IN THE CASE OF UNDERAGE USAGE OF THE SERVICE.
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-zinc-800 p-6 border-t border-zinc-700 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={handleExit}
                        className="w-full sm:w-48 px-6 py-3 rounded bg-white text-black font-bold hover:bg-zinc-200 transition-colors uppercase"
                    >
                        Exit
                    </button>
                    <button
                        onClick={handleAgree}
                        className="w-full sm:w-48 px-6 py-3 rounded bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors uppercase shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                    >
                        I Agree
                    </button>
                </div>

                <div className="bg-zinc-900 p-2 text-center">
                    <div className="flex justify-center gap-2 opacity-50 grayscale">
                        {/* Placeholders for compliance logos */}
                        <div className="h-8 w-20 bg-zinc-700 rounded"></div>
                        <div className="h-8 w-20 bg-zinc-700 rounded"></div>
                        <div className="h-8 w-20 bg-zinc-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
