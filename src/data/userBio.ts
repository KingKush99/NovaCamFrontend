export interface UserBio {
    userId: string;
    username: string;
    followers: number;
    gender: string;
    location: string;
    lastBroadcast: Date;
    socialMedia: { platform: string; url: string; icon: string }[];
    aboutMe: string;
    isOnline: boolean;
}

export const mockUserBio: UserBio = {
    userId: 'demo-user-1',
    username: 'Kittengirltxo',
    followers: 284512,
    gender: 'A Woman',
    location: 'heaven',
    lastBroadcast: new Date(Date.now() - 86400000), // 1 day ago
    socialMedia: [
        {
            platform: 'Instagram',
            url: 'https://instagram.com/example',
            icon: '📷',
        },
    ],
    aboutMe:
        "I am a very happy girl :) please be respectful\nI DON'T HAVE ONLYFANS\nI don't have telegram",
    isOnline: true,
};
