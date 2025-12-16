'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import StreamGrid from '@/components/StreamGrid';
import { FaSearch, FaGlobeAmericas, FaTag, FaCoins } from 'react-icons/fa';

function CamsContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'All';
    const region = searchParams.get('region');

    // Affiliate params (Only for non-tag links if requested, but base URL handles tags purely)
    const affQueryParams = '?tour=LQps&campaign=QvtQPh&track=default';
    const baseUrl = 'https://chaturbate.com';

    // Sidebar Filter State (Search only)
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm) {
            window.open(`${baseUrl}/tag/${searchTerm}/`, '_blank');
        }
    };

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const TAGS_PER_PAGE = 50;

    // User's Expanded Tags List (from screenshots)
    const tags = [
        // Original & Image 0
        'leather', 'bwc', 'cumshow', 'perverted', 'bigballs', 'fetish', 'turkish', 'hentai', 'fitness', 'japanese',
        'bigpussy', 'bi', 'chinese', 'alpha', 'jeans', 'shorthair', 'horny', 'roleplay', 'married', 'precum', 'sex',
        'kinky', 'porn', 'cut', 'messy', 'cameltoe', 'nylon', 'student', 'boots', 'slim', 'crossdresser', 'redhair',
        'nonnude', 'legs', 'domination', 'russian', 'ginger', 'saggyboobs', 'lush', 'armpits', 'longtongue', 'erotic', 'dadbod',

        // Image 1
        'belly', 'brazilian', 'asmr', 'tattoos', 'spit', 'colombia', 'biceps', 'smallboobs', 'smoking', 'black',
        'handjob', 'creamy', 'shaved', 'lingerie', 'ssbbw', 'nipples', 'abs', 'domi', 'bigdildo', 'dominant',
        'beard', 'naked', 'dp', 'cashmaster', 'pornstar', 'snowbunny', 'sexy', 'lesbians', 'thickcock', 'bigbelly',
        'bisexual', 'masturbate', 'deutsch', 'threesome', 'pump', 'smalldick', 'orgasm', 'footfetish', 'sub',
        'african', 'hugeboobs', 'edge',

        // Image 2
        'valorant', 'gamer', 'fuck', 'innocent', 'cougar', 'foreskin', 'hung', 'masturbation', 'exxxotica', 'tiny',
        'mom', 'yoga', 'bondage', 'boobs', 'curly', 'interracial', 'model', 'girls', 'shower', 'drink', 'college',
        'fat', 'muscleworship', 'hugecock', 'naturalbigtits', 'piercings', 'sensual', 'bulge', 'emo', 'facial',
        'leagueoflegends', 'facefuck', 'smoker', 'nude', 'small', 'cuck', 'longlegs', 'tits', 'asshole', 'cumface',
        'transgirl', 'bigtoys',

        // Image 3
        'pinkpussy', 'private', 'wet', 'naughty', 'chat', 'germany', 'hotwife', 'oil', 'thick', 'longnails',
        'india', 'whore', 'dominatrix', 'girlnextdoor', 'smallass', 'canadian', 'flex', 'filipina', 'sloppy',
        'striptease', 'milkboobs', 'naturalboobs', 'toes', 'athletic', 'bodybuilder', 'squirtshow', 'dom',
        'latin', 'big', 'muscular', 'cfnm', 'dilf', 'hot', 'talk', 'pierced', '19', 'livesex', 'lovensecontrol',
        'showcum', 'blackdick', 'english', 'futa', 'gag',

        // Image 4
        'cock', 'fuckface', 'spank', 'boy', 'doublepenetration', 'ohmibod', 'satin', 'bignaturalboobs',
        'bignaturaltits', 'bull', 'interactivetoy', 'voyeur', 'colombian', 'cam2cam', 'colombiana', 'hypno',
        'verbal', 'cumshot', 'fleshlight', 'hardcore', 'ride', 'bigsquirt', 'blond', 'fingerpussy', 'gloves',
        'gothic', 'sexymilf', 'singlemom', 'biglips', 'gamergirl', 'pussyplay', 'creamypussy', 'cumslut',
        'stocking', 'breastmilk', 'cam', 'couples',

        // New Images (13-16)
        'hetero', 'hush', 'jock', 'older', 'privateopen', 'sexydance', 'suck', 'swap', 'allnatural', 'assplay',
        'australia', 'bigcocks', 'brat', 'buttplug', 'dildoplay', 'hotlegs', 'lips', 'milkyboobs', 'mixed',
        'mommyboobs', 'nylonfeet', 'perfectass', 'show', 'spanks', 'stud', 'switch', 'tinytits', 'whitecock',
        'american', 'analshow', 'beauty', 'cowgirl', 'curved', 'cutegirl', 'fuckpussy', 'girlfriendmaterial',
        'goal', 'handsome', 'hunk', 'jerking',

        'kissing', 'latincouple', 'naturalbody', 'nature', 'niceass', 'passwordshow', 'petitegirl', 'pm', 'puffy',
        'rock', 'sexyass', 'sexylatina', 'sloppyblowjobs', 'solo', 'str8', 'sweet', 'tickle', 'tight', 'translatina',
        '24', 'alternativegirl', 'asianbeauty', 'bicurious', 'bigboob', 'bigcumload', 'bigcumshot', 'body', 'brazil',
        'controltoy', 'culo', 'cumgoal', 'curve', 'dildoshow', 'flirt', 'goodgirl', 'happy', 'hardnipples', 'hotdance',
        'lactate', 'makemecum',

        'milfs', 'mtf', 'obey', 'puppy', 'pvtshow', 'sexytits', 'shygirl', 'smooth', 'tokenkeno', 'twinkyoung',
        'america', 'asiancock', 'beautifulsmile', 'bigdickasian', 'bigdicks', 'bigmuscles', 'blowjobs', 'busty',
        'cumshots', 'curious', 'curvygoddess', 'curvypetite', 'cutesmile', 'dancer', 'dirtygirl', 'domi2', 'domme',
        'ebonygirl', 'exotic', 'feed', 'flexing', 'food', 'girlfriendexperience', 'humiliate', 'interactive',
        'juicyass', 'long',

        'lovenseon', 'lovensesexmachine', 'matured', 'miss', 'naughtygirl', 'nice', 'nicemusic', 'nightparty',
        'nippleclamps', 'now', 'ohmybody', 'oiled', 'persian', 'pink', 'poledance', 'princess', 'pussyhairy',
        'real', 'sexymuscles', 'showfeet', 'slimthick', 'suckdick', 'sugardaddy', 'tgirl', 'thickthighs', 'titties',
        'university', 'upskirt', 'wife', 'woman', 'youngbeauty', '23', '25', 'barelylegal', 'beer', 'bigblack',
        'bigdildos', 'blackcock', 'butt'
    ];

    const totalPages = Math.ceil(tags.length / TAGS_PER_PAGE);
    const startIndex = (currentPage - 1) * TAGS_PER_PAGE;
    const currentTags = tags.slice(startIndex, startIndex + TAGS_PER_PAGE);

    const regions = [
        { id: 'north-american', name: 'North America', slug: 'north-american-cams' },
        { id: 'south-american', name: 'South America', slug: 'south-american-cams' },
        { id: 'euro-russian', name: 'Europe/Russia', slug: 'euro-russian-cams' },
        { id: 'asian', name: 'Asia', slug: 'asian-cams' },
        { id: 'other', name: 'Other', slug: 'other-region-cams' }
    ];

    return (
        <div className="text-white">

            {/* Header / Title */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
                        {region ? region.replace('-', ' ') : category} Cams
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        Featured Live Streams
                    </p>
                </div>
            </div>

            <div className="flex gap-6 flex-col lg:flex-row">

                {/* Main Content */}
                <div className="flex-1 order-2 lg:order-1">
                    <div className="flex-1 order-2 lg:order-1">
                        <StreamGrid category={category} />
                    </div>
                </div>

                {/* Sidebar Filters (External Links) */}
                <aside className="w-full lg:w-64 space-y-6 order-1 lg:order-2 shrink-0">
                    {/* Search */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
                        <form onSubmit={handleSearch} className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search tags..."
                                className="w-full bg-zinc-950 border border-zinc-800 rounded pl-9 pr-2 py-2 text-sm focus:border-cyan-500 focus:outline-none text-white"
                            />
                        </form>
                    </div>

                    {/* Regions */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                        <h3 className="font-bold text-xs uppercase text-zinc-500 mb-3 flex items-center gap-2"><FaGlobeAmericas /> Regions</h3>
                        <div className="flex flex-wrap gap-2">
                            {regions.map(r => (
                                <a
                                    key={r.id}
                                    href={`${baseUrl}/${r.slug}/${affQueryParams}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs px-2 py-1 rounded bg-zinc-950 border border-zinc-800 hover:border-cyan-500 hover:text-cyan-500 text-zinc-400 transition-colors"
                                >
                                    {r.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                        <h3 className="font-bold text-xs uppercase text-zinc-500 mb-3 flex items-center gap-2">
                            <FaTag /> Popular Tags <span className="text-[10px] ml-auto">Page {currentPage} / {totalPages}</span>
                        </h3>
                        <div className="flex flex-wrap gap-1 mb-3 min-h-[200px] content-start">
                            {currentTags.map(tag => (
                                <a
                                    key={tag}
                                    href={`${baseUrl}/tag/${tag}/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-400 hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                                >
                                    {tag}
                                </a>
                            ))}
                        </div>
                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="text-xs font-bold text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
                            >
                                &lt; Prev
                            </button>
                            <span className="text-[10px] text-zinc-500">
                                {startIndex + 1}-{Math.min(startIndex + TAGS_PER_PAGE, tags.length)} of {tags.length}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="text-xs font-bold text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
                            >
                                Next &gt;
                            </button>
                        </div>
                    </div>

                    {/* Private Show Price */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                        <h3 className="font-bold text-xs uppercase text-zinc-500 mb-3 flex items-center gap-2"><FaCoins /> Pvt Tokens/Min</h3>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                            {[6, 12, 18, 30, 42, 60, 90].map(p => (
                                <a
                                    key={p}
                                    href={`${baseUrl}/${p}-tokens-per-minute-private-cams/${affQueryParams}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-zinc-950 border border-zinc-800 py-1 px-2 rounded hover:text-white text-zinc-400 text-center hover:border-fuchsia-500 transition-colors"
                                >
                                    {p}+ tks
                                </a>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    );
}

export default function CamsPage() {
    return (
        <Suspense fallback={<div className="bg-zinc-950 flex items-center justify-center text-white h-64">Loading...</div>}>
            <CamsContent />
        </Suspense>
    );
}
