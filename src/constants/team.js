const slugify = (name) =>
    name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

export const members = [
    {
        username: slugify('Syed Abdullah'),
        name: 'Syed Abdullah',
        position: 'Chief Operating Officer',
        tagline: 'From strategy to setup, Abdullah makes the big machine run smooth ⚙️',
        secretKey: 'COOFSA'
    },
    {
        username: slugify('Hania Nadeem'),
        name: 'Hania Nadeem',
        position: 'Chief Executive Officer',
        tagline: 'Vision, drive, and a plan for tomorrow — Hania sets the course 🌟',
        secretKey: 'CEOFHN'
    },
    {
        username: slugify('Preetam Khetpal'),
        name: 'Preetam Khetpal',
        position: 'Chief Financial Officer',
        tagline: 'Budgets balanced, futures funded — Preetam keeps the numbers in line 📊',
        secretKey: 'CFOFPK'
    },
    {
        username: slugify('Salman Khalid'),
        name: 'Dr. Salman Khalid',
        position: 'Patron',
        tagline: 'Guiding with wisdom, leading with vision — Dr. Salman is the society’s compass 🌟',
        secretKey: 'PATRSK'
    },
    {
        username: slugify('Asjal Inam'),
        name: 'Asjal Inam',
        position: 'Executive Council ',
        tagline: 'If it moves, breaks, or disappears — Asjal’s already fixed it 📦',
        secretKey: 'SECMAI'
    },
    {
        username: slugify('Areej Adil'),
        name: 'Areej Adil',
        position: 'Executive Council',
        tagline: 'Trends bow, timings bend — Areej makes the algorithm dance 🚀',
        secretKey: 'MARKAA'
    },
    {
        username: slugify('Daniyal Haris'),
        name: 'Daniyal Haris',
        position: 'Executive Council',
        tagline: 'Behind every perfect shot and smooth cut, you’ll find Daniyal framing the story 🎥',
        secretKey: 'MEDIDH'
    },
    {
        username: slugify('Emaan Ali'),
        name: 'Emaan Ali',
        position: 'Executive Council',
        tagline: 'From lattes to leads to lifelines — Emaan unlocks it all ☕💸',
        secretKey: 'CORPEA'
    },
    {
        username: slugify('Ayesha Jawad'),
        name: 'Ayesha Jawad',
        position: 'Executive Council',
        tagline: 'Ideas walk in plain — Ayesha sends them out legendary 🎨',
        secretKey: 'CREAAJ'
    },
    {
        username: slugify('Sohaib Sadiq'),
        name: 'Sohaib Sadiq',
        position: 'Executive Council',
        tagline: 'Crowds, chaos, or curveballs — Sohaib keeps it secure 🚨',
        secretKey: 'SECUSS'
    },
    {
        username: slugify('Farah Waseem'),
        name: 'Farah Waseem',
        position: 'Executive Council',
        tagline: 'Guests don’t just arrive — Farah makes them feel at home before they walk in 🤝',
        secretKey: 'GUREFW'
    },
    {
        username: slugify('Hania Emad'),
        name: 'Hania Emad',
        position: 'Executive Council',
        tagline: 'Budgets, balances, bottom lines — Hania’s already three steps ahead 💡',
        secretKey: 'FINAHE'
    }
];
