const fs = require('fs');
const path = require('path');

// Target directory based on what we found: public/assets/games/pornstars/stars/assets/stars
const performersDir = path.join(process.cwd(), 'public/assets/games/pornstars/stars/assets/stars');
const outputFile = path.join(process.cwd(), 'src/data/performers.json');

try {
    if (!fs.existsSync(performersDir)) {
        console.error(`Directory not found: ${performersDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(performersDir).filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));

    const performers = files.map((file, index) => {
        const name = path.parse(file).name;

        return {
            id: `star_${index}`,
            name: name,
            imagePath: `/assets/games/pornstars/stars/assets/stars/${file}`, // Web path
            category: 'star', // Generic category
            difficulty: 'medium'
        };
    });

    fs.writeFileSync(outputFile, JSON.stringify(performers, null, 4));
    console.log(`Generated ${performers.length} performers in ${outputFile}`);

} catch (e) {
    console.error(e);
}
