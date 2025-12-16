// Lovense API Integration Service
// Documentation: https://developer.lovense.com

const LOVENSE_TOKEN = process.env.NEXT_PUBLIC_LOVENSE_TOKEN;

export interface LovenseDevice {
    id: string;
    name: string;
    type: string;
    status: 'connected' | 'disconnected';
}

export interface LovenseCommand {
    action: 'Vibrate' | 'Rotate' | 'Pump' | 'Thurst' | 'Fingering' | 'Suction' | 'Stop';
    intensity: number; // 0-20
    timeSec?: number;
    loopRunningSec?: number;
    loopPauseSec?: number;
}

// Lovense Standard API endpoints
const LOVENSE_API = {
    // Local API (when user has Lovense Connect app running)
    LOCAL: 'https://api.lovense.com/api/lan/v2/command',
    // Server API (for QR code connection)
    SERVER: 'https://api.lovense.com/api/lan/command',
    // QR Code generation
    QR: 'https://api.lovense.com/api/lan/getQrCode',
};

/**
 * Generate QR code for user to scan with Lovense Remote app
 */
export async function getLovenseQRCode(userId: string): Promise<{ qrCode: string; code: string } | null> {
    try {
        const response = await fetch(LOVENSE_API.QR, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: LOVENSE_TOKEN,
                uid: userId,
                uname: userId,
            }),
        });

        const data = await response.json();
        if (data.code === 0) {
            return {
                qrCode: data.data.qrcode,
                code: data.data.code,
            };
        }
        return null;
    } catch (error) {
        console.error('Lovense QR Error:', error);
        return null;
    }
}

/**
 * Send vibration command to connected device
 */
export async function sendVibration(
    userId: string,
    intensity: number,
    durationSec: number = 5
): Promise<boolean> {
    try {
        const response = await fetch(LOVENSE_API.SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: LOVENSE_TOKEN,
                uid: userId,
                command: 'Function',
                action: 'Vibrate',
                intensity: Math.min(20, Math.max(0, intensity)),
                timeSec: durationSec,
            }),
        });

        const data = await response.json();
        return data.code === 200;
    } catch (error) {
        console.error('Lovense Vibrate Error:', error);
        return false;
    }
}

/**
 * Stop all device actions
 */
export async function stopDevice(userId: string): Promise<boolean> {
    try {
        const response = await fetch(LOVENSE_API.SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: LOVENSE_TOKEN,
                uid: userId,
                command: 'Function',
                action: 'Stop',
            }),
        });

        const data = await response.json();
        return data.code === 200;
    } catch (error) {
        console.error('Lovense Stop Error:', error);
        return false;
    }
}

/**
 * Send pattern command (custom vibration sequence)
 * Pattern format: "V:1;F:v,r;S:1000#" where V=vibrate, F=functions, S=interval
 */
export async function sendPattern(
    userId: string,
    pattern: string,
    loopTimes: number = 1
): Promise<boolean> {
    try {
        const response = await fetch(LOVENSE_API.SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: LOVENSE_TOKEN,
                uid: userId,
                command: 'Pattern',
                rule: pattern,
                strength: '20',
                timeSec: 0,
                loopRunningSec: 0,
                loopPauseSec: 0,
            }),
        });

        const data = await response.json();
        return data.code === 200;
    } catch (error) {
        console.error('Lovense Pattern Error:', error);
        return false;
    }
}

/**
 * Calculate vibration intensity based on tip amount
 */
export function getIntensityFromTip(tipAmount: number): number {
    if (tipAmount >= 1000) return 20;
    if (tipAmount >= 500) return 18;
    if (tipAmount >= 200) return 15;
    if (tipAmount >= 100) return 12;
    if (tipAmount >= 50) return 10;
    if (tipAmount >= 25) return 7;
    if (tipAmount >= 10) return 5;
    if (tipAmount >= 5) return 3;
    return 1;
}

/**
 * Calculate vibration duration based on tip amount
 */
export function getDurationFromTip(tipAmount: number): number {
    if (tipAmount >= 1000) return 60;
    if (tipAmount >= 500) return 30;
    if (tipAmount >= 200) return 20;
    if (tipAmount >= 100) return 15;
    if (tipAmount >= 50) return 10;
    if (tipAmount >= 25) return 7;
    if (tipAmount >= 10) return 5;
    return 3;
}

// Pre-defined patterns for Pattern Mode app
export const LOVENSE_PATTERNS = {
    pulse: 'V:1;F:v;S:500#V:0;F:v;S:500#',
    wave: 'V:5;F:v;S:200#V:10;F:v;S:200#V:15;F:v;S:200#V:20;F:v;S:200#V:15;F:v;S:200#V:10;F:v;S:200#V:5;F:v;S:200#',
    earthquake: 'V:20;F:v;S:100#V:0;F:v;S:50#V:20;F:v;S:100#V:0;F:v;S:50#V:20;F:v;S:100#',
    fireworks: 'V:20;F:v;S:50#V:0;F:v;S:100#V:20;F:v;S:50#V:0;F:v;S:200#V:15;F:v;S:100#V:0;F:v;S:150#',
    heartbeat: 'V:15;F:v;S:150#V:5;F:v;S:150#V:15;F:v;S:150#V:0;F:v;S:400#',
};
