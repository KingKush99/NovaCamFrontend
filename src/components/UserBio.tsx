'use client';

import { UserBio } from '@/data/userBio';
import { FaInstagram } from 'react-icons/fa';

interface UserBioProps {
    bio: UserBio;
}

const UserBioComponent = ({ bio }: UserBioProps) => {
    const formatLastBroadcast = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return 'Today';
        if (days === 1) return '1 day ago';
        return `${days} days ago`;
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">{bio.username}'s Bio and Free Webcam</h2>

            <div className="space-y-3 text-sm">
                {/* Followers */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-semibold w-32">Followers:</span>
                    <span className="text-white font-bold">{bio.followers.toLocaleString()}</span>
                </div>

                {/* Gender */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-semibold w-32">I Am:</span>
                    <span className="text-white">{bio.gender}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-semibold w-32">Location:</span>
                    <span className="text-white">{bio.location}</span>
                </div>

                {/* Last Broadcast */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-semibold w-32">Last Broadcast:</span>
                    <span className="text-white">{formatLastBroadcast(bio.lastBroadcast)}</span>
                </div>

                {/* Social Media */}
                {bio.socialMedia.length > 0 && (
                    <div className="flex items-start gap-2">
                        <span className="text-gray-400 font-semibold w-32">Social Media:</span>
                        <div className="flex flex-col gap-2">
                            {bio.socialMedia.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
                                >
                                    <FaInstagram className="text-xl" />
                                    <span className="font-semibold">{social.platform} - Free</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* About Me */}
                <div className="pt-4 border-t border-zinc-800">
                    <h3 className="text-gray-400 font-semibold mb-2">About Me:</h3>
                    <p className="text-white whitespace-pre-line leading-relaxed">
                        {bio.aboutMe}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserBioComponent;
