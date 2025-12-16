const https = require('https');

// Using AllOrigins to fetch the Chaturbate RSS feed
const target = 'https://chaturbate.com/affiliates/api/onlinerooms/?format=rss&wm=3mp&limit=10';
const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`;

console.log(`Fetching via AllOrigins: ${proxy}`);

https.get(proxy, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        if (res.statusCode === 200) {
            if (data.includes('<rss') || data.includes('<xml')) {
                console.log('✅ Success! Got XML.');
                console.log(data.substring(0, 300));
            } else {
                console.log('❌ Failed: Not XML');
                console.log(data.substring(0, 200));
            }
        } else {
            console.log('❌ Request failed', data.substring(0, 100));
        }
    });
});
