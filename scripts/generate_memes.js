const fs = require('fs');
const path = require('path');

const memesDir = path.join(process.cwd(), 'public/assets/games/memes');
const outputFile = path.join(process.cwd(), 'src/data/memes.json');

try {
    const files = fs.readdirSync(memesDir).filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));

    const memes = files.map(file => {
        const name = path.parse(file).name;
        // Clean up name for answers (remove special chars, lowercase)
        const cleanName = name.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

        return {
            id: cleanName.replace(/\s+/g, '_'),
            name: name, // Keep original casing/chars for display? Or prettify?
            answers: [
                cleanName,
                name.toLowerCase()
            ],
            imagePath: `/assets/games/memes/${file}`,
            difficulty: 'medium' // Default
        };
    });

    fs.writeFileSync(outputFile, JSON.stringify(memes, null, 4));
    console.log(`Generated ${memes.length} memes in ${outputFile}`);

} catch (e) {
    console.error(e);
}
