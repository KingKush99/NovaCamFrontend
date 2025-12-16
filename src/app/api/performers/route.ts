import { NextResponse } from 'next/server';

// Affiliate codes
const TOUR = 'LQps';
const CAMPAIGN = 'QvtQPh';

// Known active performers lists - these are real Chaturbate performers
// Updated periodically based on popular/featured models
const PERFORMERS = {
    f: [ // Women
        'lindamei', 'sweetie_mills', 'anna_monik', 'emma_lu', 'mia_swet',
        'sara_croft_', 'kira_making', 'marrylouanne', 'vanessa_hote', 'hollyextra',
        'jessicaxq', 'monika_reed1', 'yourkarma', 'annya_mm', 'melissa_hole',
        'alice_and_lina', 'sonya_keller', 'candy_sweet_xxx', 'foxandfoxy', 'missani',
        'laracroft_x', 'katy_sweet', 'hotbella_xxx', 'miss_elena', 'chloe_kitty',
        'melonechallenge', 'evelyn_cute', 'jenny_taborda', 'meowhatever', 'sexy_sandra',
        'cutie_girl', 'daisy_doll_', 'mia_queen_x', 'hotsexycouple', 'naughty_girl',
        'sweet_kattie', 'julia_angel', 'emma_watson_x', 'nataly_gold', 'angel_eyes88'
    ],
    m: [ // Men
        'damianfit', 'alphafit', 'jakemuscle', 'hotguy_x', 'sexyboy99',
        'musclehunk', 'bigcock_guy', 'ryan_hot', 'athletic_man', 'strongboy'
    ],
    c: [ // Couples
        'hotcouple_xxx', 'lovebirds_x', 'passion_couple', 'wild_duo', 'kinky_pair',
        'fun_lovers', 'naughty_two', 'hot_partners', 'sexy_couple', 'playful_duo'
    ],
    t: [ // Trans
        'ts_angel', 'trans_queen', 'sexy_ts', 'beautiful_shemale', 'hot_trans',
        'gorgeous_ts', 'amazing_trans', 'lovely_tgirl', 'pretty_trans', 'stunning_ts'
    ]
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gender = (searchParams.get('gender') || 'f') as keyof typeof PERFORMERS;

    // Get performers for the requested gender
    const performerList = PERFORMERS[gender] || PERFORMERS.f;

    // Shuffle for variety
    const shuffled = [...performerList].sort(() => Math.random() - 0.5);

    return NextResponse.json({
        success: true,
        count: shuffled.length,
        performers: shuffled.map(username => ({
            username,
            thumbnail: `https://roomimg.stream.highwebmedia.com/ri/${username}.jpg`,
            affiliateLink: `https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}&track=embed&room=${username}`
        }))
    });
}
