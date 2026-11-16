const fs = require('fs');
const path = require('path');

const articlesFilePath = path.join(__dirname, '../lib/data/articles.ts');
const fileContent = fs.readFileSync(articlesFilePath, 'utf8');

// Category mapping helper
function mapCategory(oldCat) {
  const cat = (oldCat || '').trim();
  switch (cat) {
    case 'Elderly Care':
    case 'Caregivers':
    case 'Elderly Planning':
      return 'Elderly Care';
    case 'Nursing Care':
    case 'Wound Care':
    case 'Home Healthcare':
      return 'Home Nursing';
    case 'Physiotherapy':
    case 'Stroke Recovery':
    case 'Recovery':
      return 'Physiotherapy';
    case 'Palliative Care':
    case 'Chronic Care':
    case 'Telemedicine':
      return 'Palliative & Chronic';
    case 'Post-Surgical Care':
      return 'Post-Surgery';
    case 'Equipment & Supplies':
      return 'Medical Equipment';
    case 'Specialized Care':
    case 'Pediatric & Special Needs':
    case 'Caregiver Training':
    case 'Medical Tourism':
    case 'Diaspora Support':
      return 'Specialized Care';
    default:
      return 'Home Nursing';
  }
}

// Parse existing articles
const match = fileContent.match(/export const articlesData: Article\[\] = (\[[\s\S]*\]);/);
if (!match) {
  console.error('Could not find articlesData array in articles.ts');
  process.exit(1);
}

let articles;
try {
  articles = eval(match[1]);
} catch (e) {
  console.error('Eval error:', e);
  process.exit(1);
}

console.log('Read', articles.length, 'articles');

// Normalize categories
articles = articles.map(art => {
  return {
    ...art,
    category: mapCategory(art.category)
  };
});

const stats = {};
articles.forEach(a => {
  stats[a.category] = (stats[a.category] || 0) + 1;
});
console.log('Normalized category breakdown:', stats);

const newFileContent = `export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author?: {
    name: string;
    role: string;
  };
  keyTakeaways?: string[];
  content: string;
}

export const articlesData: Article[] = ${JSON.stringify(articles, null, 2)};
`;

fs.writeFileSync(articlesFilePath, newFileContent, 'utf8');
console.log('Successfully updated lib/data/articles.ts with normalized categories!');
