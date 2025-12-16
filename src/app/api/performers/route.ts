import { NextResponse } from 'next/server';

// Affiliate codes
const TOUR = 'LQps';
const CAMPAIGN = 'QvtQPh';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gender = searchParams.get('gender') || '';
    const limit = parseInt(searchParams.get('limit') || '50');

    try {
        // Fetch the Chaturbate page and extract usernames
        let url = 'https://chaturbate.com/';

        if (gender === 'f') url = 'https://chaturbate.com/female-cams/';
        else if (gender === 'm') url = 'https://chaturbate.com/male-cams/';
        else if (gender === 'c') url = 'https://chaturbate.com/couple-cams/';
        else if (gender === 't') url = 'https://chaturbate.com/trans-cams/';

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            },
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const html = await response.text();

        // Extract usernames from the HTML
        // Chaturbate uses data-room="username" or href="/username/" patterns
        const usernameRegex = /data-room="([a-zA-Z0-9_]+)"/g;
        const usernames: string[] = [];
        let match;

        while ((match = usernameRegex.exec(html)) !== null && usernames.length < limit) {
            const username = match[1].toLowerCase();
            if (username && !usernames.includes(username) && username.length > 2) {
                usernames.push(username);
            }
        }

        // If data-room didn't work, try href pattern
        if (usernames.length < 10) {
            const hrefRegex = /href="\/([a-zA-Z0-9_]{3,20})\/"/g;
            while ((match = hrefRegex.exec(html)) !== null && usernames.length < limit) {
                const username = match[1].toLowerCase();
                // Filter out common non-user paths
                const excludePatterns = ['affiliates', 'accounts', 'support', 'security', 'terms', 'privacy', 'dmca', 'apps', 'female', 'male', 'couple', 'trans', 'tags', 'api', 'in'];
                if (username && !usernames.includes(username) && !excludePatterns.includes(username)) {
                    usernames.push(username);
                }
            }
        }

        // Return the list of live performers
        return NextResponse.json({
            success: true,
            count: usernames.length,
            performers: usernames.map(username => ({
                username,
                thumbnail: `https://roomimg.stream.highwebmedia.com/ri/${username}.jpg`,
                affiliateLink: `https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}&track=embed&room=${username}`
            }))
        });

    } catch (error) {
        console.error('Error fetching performers:', error);

        // Fallback to well-known active performers
        const fallbackPerformers = [
            'mel_tahan', 'lindamei', 'emma_roberts77', 'sasha_divine', 'anna_monik',
            'wetdream111', 'sexycarmen', 'hotnatalia', 'ameliequeeen', 'ellaa91'
        ];

        return NextResponse.json({
            success: false,
            error: 'Failed to fetch live data, using fallback',
            count: fallbackPerformers.length,
            performers: fallbackPerformers.map(username => ({
                username,
                thumbnail: `https://roomimg.stream.highwebmedia.com/ri/${username}.jpg`,
                affiliateLink: `https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}&track=embed&room=${username}`
            }))
        });
    }
}
