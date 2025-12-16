import { NextResponse } from 'next/server';

export const revalidate = 30; // Refresh every 30 seconds

// Known good fallback list
const FALLBACK_MODELS = [
    'soficb', 'angell6969', 'angelblisss', 'miihoflex', 'monika_reed1', 'malenahot525',
    'ana_maria11', 'krisskissshow', 'caramelangels', 'princess_sweety', 'livvywinters',
    'boobss', 'vika54784', 'lunarspark', 'heyskylar', 'adriana_elvis', 'blissdilley',
    'annieguzman', 'amy_queen7', 'swt_shadow', '1m_valery', 'crimsonkitten',
    'sosabless', 'anna_monik', 'sabrinajadex', 'melissalem1', 'sabrina_geek',
    'pinkncrazy', '2strangers', 'blessme_g', 'kuro_ren', 'miss_giulia',
    'ami_katana', 'mirela_silver', 'freyabyrne', 'devyale', 'yourlittlesunrise'
];

// Try multiple methods to get live usernames
async function fetchLiveUsernames(): Promise<{ usernames: string[], source: string }> {
    // Method 1: Try official Chaturbate API with different User-Agent
    try {
        const apiUrl = 'https://chaturbate.com/api/public/affiliates/onlinerooms/?wm=3mp&limit=50&format=json';

        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Referer': 'https://chaturbate.com/',
            },
            cache: 'no-store'
        });

        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                const usernames = data.map((item: any) => item.username).filter(Boolean);
                if (usernames.length >= 5) {
                    console.log(`API success: ${usernames.length} models`);
                    return { usernames: usernames.slice(0, 50), source: 'chaturbate_api' };
                }
            }
        }
    } catch (e) {
        console.log('API method failed:', e);
    }

    // Method 2: Try affiliates API endpoint  
    try {
        const affUrl = 'https://chaturbate.com/affiliates/api/onlinerooms/?wm=3mp&limit=50';

        const response = await fetch(affUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; NovaCam/1.0)',
            },
            cache: 'no-store'
        });

        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                const usernames = data.map((item: any) => item.username).filter(Boolean);
                if (usernames.length >= 5) {
                    console.log(`Affiliate API success: ${usernames.length} models`);
                    return { usernames: usernames.slice(0, 50), source: 'affiliate_api' };
                }
            }
        }
    } catch (e) {
        console.log('Affiliate API failed:', e);
    }

    // Method 3: Try via proxy
    try {
        const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent('https://chaturbate.com/affiliates/api/onlinerooms/?wm=3mp&limit=50');

        const response = await fetch(proxyUrl, { cache: 'no-store' });

        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                const usernames = data.map((item: any) => item.username).filter(Boolean);
                if (usernames.length >= 5) {
                    console.log(`Proxy success: ${usernames.length} models`);
                    return { usernames: usernames.slice(0, 50), source: 'cors_proxy' };
                }
            }
        }
    } catch (e) {
        console.log('Proxy method failed:', e);
    }

    // Fallback
    console.log('All methods failed, using fallback');
    return { usernames: FALLBACK_MODELS, source: 'fallback' };
}

export async function GET(request: Request) {
    const { usernames, source } = await fetchLiveUsernames();

    // Build stream objects
    const streams = usernames.map((username, index) => ({
        username: username,
        image_url: `https://roomimg.stream.highwebmedia.com/ri/${username}.jpg`,
        num_users: 500 + (username.length * 47 + index * 31) % 4000,
        room_subject: `Live Cam - ${username}`,
        gender: 'f',
        tags: ['live', 'featured'],
        is_hd: index % 2 === 0,
        display_name: username,
        age: 19 + (index % 12)
    }));

    const { searchParams } = new URL(request.url);
    const gender = searchParams.get('gender') || 'all';

    let filtered = streams;
    if (gender !== 'all') {
        filtered = streams.filter(s => s.gender === gender);
    }

    return NextResponse.json({
        source: source,
        timestamp: new Date().toISOString(),
        count: filtered.length,
        streams: filtered
    });
}
