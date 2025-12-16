import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    try {
        // Fetch video context from Chaturbate API
        // This endpoint returns stream details including HLS URL
        const res = await fetch(`https://chaturbate.com/api/chatvideocontext/${username}/`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': `https://chaturbate.com/${username}/`,
            },
            next: { revalidate: 0 } // No cache for live streams
        });

        if (!res.ok) {
            throw new Error(`Chaturbate API error: ${res.status}`);
        }

        const data = await res.json();

        // Extract HLS source
        // Format: "hls_source": "https://edgeN-region.stream.highwebmedia.com/..."
        const hlsUrl = data.hls_source;

        if (!hlsUrl) {
            // Stream might be offline or private
            return NextResponse.json({
                error: 'Stream not available',
                offline: true,
                raw: data
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            url: hlsUrl,
            username
        });

    } catch (error) {
        console.error('Stream fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch stream' }, { status: 500 });
    }
}
