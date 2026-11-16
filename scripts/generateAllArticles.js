const fs = require('fs');
const path = require('path');

// Load first 20 articles
const catalogScript = require('./buildCatalog');

// Read blogs2.txt
const blogs2Text = fs.readFileSync(path.join(__dirname, '../blogs2.txt'), 'utf8');

const regex = /blog\s*(\d+)[\r\n]+([\s\S]*?)(?=(?:blog\s*\d+|$))/gi;
let match;
const rawBlogs = [];

while ((match = regex.exec(blogs2Text)) !== null) {
  const num = parseInt(match[1]);
  const text = match[2].trim();
  rawBlogs.push({ num, text });
}

console.log('Found raw blogs in blogs2.txt:', rawBlogs.length);

// Dates spread from February 2026 backwards to 2025
const dates = [
  "February 05, 2026", "January 28, 2026", "January 20, 2026", "January 14, 2026", "January 07, 2026",
  "December 30, 2025", "December 22, 2025", "December 15, 2025", "December 08, 2025", "December 01, 2025",
  "November 24, 2025", "November 18, 2025", "November 10, 2025", "November 03, 2025", "October 27, 2025",
  "October 20, 2025", "October 13, 2025", "October 06, 2025", "September 29, 2025", "September 22, 2025",
  "September 15, 2025", "September 08, 2025", "September 01, 2025", "August 25, 2025", "August 18, 2025",
  "August 11, 2025", "August 04, 2025", "July 28, 2025", "July 21, 2025", "July 14, 2025",
  "July 07, 2025", "June 30, 2025", "June 23, 2025", "June 16, 2025"
];

function cleanTitle(rawText) {
  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  for (let l of lines) {
    if (l !== 'Back' && l !== 'Update website' && !l.startsWith('blog ') && !l.startsWith('blog') && !l.startsWith('Back')) {
      return l.replace('· Published', '').replace(/·.*/, '').trim();
    }
  }
  return 'Care Guide & Resources';
}

function getCategory(title, text) {
  const t = (title + ' ' + text).toLowerCase();
  if (t.includes('autism') || t.includes('children with autism')) return 'Specialized Care';
  if (t.includes('palliative') || t.includes('hospice')) return 'Palliative Care';
  if (t.includes('wound care') || t.includes('wound')) return 'Wound Care';
  if (t.includes('equipment leasing') || t.includes('equipment rental') || t.includes('medical equipment')) return 'Equipment & Supplies';
  if (t.includes('surgical') || t.includes('post-surgical') || t.includes('post-surgery')) return 'Post-Surgical Care';
  if (t.includes('training program') || t.includes('become a caregiver') || t.includes('online caregiver training')) return 'Caregiver Training';
  if (t.includes('medical tourism') || t.includes('accommodation')) return 'Medical Tourism';
  if (t.includes('pension')) return 'Elderly Planning';
  if (t.includes('mother') || t.includes('elderly') || t.includes('aging') || t.includes('nursing homes') || t.includes('safety and well-being')) return 'Elderly Care';
  if (t.includes('caregiver') || t.includes('caregiving')) return 'Caregivers';
  return 'Home Healthcare';
}

function getAuthor(category) {
  switch (category) {
    case 'Palliative Care':
      return { name: 'Palliative Care Advisory Team', role: 'Hospice & Compassionate Care Division' };
    case 'Wound Care':
      return { name: 'Clinical Wound Specialist Group', role: 'Tissue Viability & Infection Control' };
    case 'Equipment & Supplies':
      return { name: 'Medical Logistics Directorate', role: 'Clinical Equipment & Home Infrastructure' };
    case 'Post-Surgical Care':
      return { name: 'Surgical Recovery Coordination Team', role: 'Post-Operative Transitional Care' };
    case 'Elderly Care':
    case 'Elderly Planning':
      return { name: 'Geriatric Wellness Division', role: 'Senior Independence & Assisted Living' };
    case 'Caregivers':
    case 'Caregiver Training':
      return { name: 'Caregiver Education & Placement Team', role: 'Professional Caregiving Development' };
    case 'Specialized Care':
      return { name: 'Pediatric & Neuro-Developmental Unit', role: 'Special Needs & Family Support' };
    case 'Medical Tourism':
      return { name: 'International Patient Coordination', role: 'Medical Hospitality & Care Logistics' };
    default:
      return { name: 'Clinical Care Governance Team', role: 'AtHome Kenya Healthcare Services' };
  }
}

function generateTakeaways(title, category, rawText) {
  const t = (title + ' ' + rawText).toLowerCase();
  if (category === 'Palliative Care') {
    return [
      "Palliative care prioritizes symptom management, pain relief, and holistic emotional comfort.",
      "Can be initiated alongside active medical therapies to significantly improve daily quality of life.",
      "Multidisciplinary support encompasses clinical nurses, doctors, counselors, and trained caregivers.",
      "Home palliative care allows individuals to remain in familiar, dignified surroundings with loved ones."
    ];
  }
  if (category === 'Equipment & Supplies') {
    return [
      "Leasing medical equipment provides substantial cost savings compared to heavy outright purchases.",
      "Guarantees flexible upgrades as a patient's mobility or medical condition evolves.",
      "Eliminates maintenance, servicing, and storage headaches for families and healthcare facilities.",
      "AtHome Kenya provides prompt delivery, technical installation, and user training across Nairobi."
    ];
  }
  if (category === 'Wound Care') {
    return [
      "In-home wound management brings sterile, clinical dressing changes directly to your residence.",
      "Strict aseptic technique prevents surgical site infections and diabetic ulcer complications.",
      "Personalized care plans promote rapid tissue granulation and active monitoring by registered nurses.",
      "Saves patients from painful, exhausting transit to outpatient hospital dressing clinics."
    ];
  }
  if (category === 'Caregiver Training') {
    return [
      "Comprehensive training programs prepare caregivers with clinical hygiene, vitals, and transfer skills.",
      "Accredited certifications open career opportunities locally in Kenya and internationally in Canada.",
      "Combines theoretical healthcare knowledge with practical, hands-on patient care techniques.",
      "Continuous professional development ensures the highest standards of safety and empathy."
    ];
  }
  if (category === 'Post-Surgical Care') {
    return [
      "Structured post-operative care at home reduces complications and prevents hospital readmissions.",
      "Professional caregivers assist with pain control, sterile wound dressing, and guided mobilization.",
      "Customized rehabilitation schedules ensure safe recovery within the home environment.",
      "Provides reassurance and continuous progress monitoring for both patients and their families."
    ];
  }
  if (category === 'Specialized Care') {
    return [
      "Specialized in-home caregiving supports neurodevelopmental growth and daily routine stability.",
      "Provides crucial respite for parents, preventing chronic caregiver burnout and emotional stress.",
      "Fosters functional independence, communication skills, and sensory comfort in familiar settings.",
      "Care plans are customized collaboratively with pediatric therapists and family members."
    ];
  }
  if (category === 'Medical Tourism') {
    return [
      "Selecting the right recovery accommodation in Nairobi ensures seamless access to premier hospitals.",
      "Homecare integration bridges the gap between major surgery and traveling back home.",
      "Dedicated nurses and caregivers assist with airport transfers, medications, and mobility.",
      "Combines world-class medical hospitality with personalized, comfortable recuperation."
    ];
  }
  // Default Elderly Care / Caregivers
  return [
    `Personalized ${category.toLowerCase()} at home ensures safety, dignity, and independence for your loved one.`,
    "Vetted professional caregivers provide essential support with daily living activities, nutrition, and medication.",
    "Home safety modifications and 1-on-1 assistance significantly reduce senior fall hazards.",
    "AtHome Kenya provides reliable clinical oversight, transparent family communication, and 24/7 support."
  ];
}

function makeSlug(title, num) {
  let s = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
  if (!s || s.length < 3) s = `care-guide-${num}`;
  return s;
}

function cleanMarkdown(rawText, title) {
  const lines = rawText
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l && l !== 'Back' && l !== 'Update website' && !l.includes('· Published') && l !== title);

  const formatted = [];
  let sNum = 1;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    
    // Check if line is a major section heading
    const isHeading = 
      /^\d+\.\s+[A-Z]/.test(l) ||
      (l.length < 75 && !l.endsWith('.') && !l.endsWith(',') && (
        l.startsWith('Introduction') ||
        l.startsWith('Understanding') ||
        l.startsWith('Benefits') ||
        l.startsWith('The Importance') ||
        l.startsWith('Types of') ||
        l.startsWith('Choosing') ||
        l.startsWith('How to') ||
        l.startsWith('Why ') ||
        l.startsWith('Top ') ||
        l.startsWith('Essential ') ||
        l.startsWith('Creating ') ||
        l.startsWith('Exploring ') ||
        l.startsWith('The Role') ||
        l.startsWith('Highly Trained') ||
        l.startsWith('Personalized ') ||
        l.startsWith('Convenience ') ||
        l.startsWith('Compassionate ') ||
        l.startsWith('Conclusion')
      ));

    if (isHeading) {
      if (l.toLowerCase().startsWith('conclusion')) {
        formatted.push(`\n---\n\n## Conclusion & Getting Started\n`);
      } else {
        formatted.push(`\n---\n\n## ${sNum}. ${l.replace(/^\d+\.\s*/, '')}\n`);
        sNum++;
      }
    } else if (/^\d+\.\s/.test(l)) {
      formatted.push(`\n### ${l}\n`);
    } else if (l.startsWith('- ') || l.startsWith('• ')) {
      formatted.push(`\n- ${l.replace(/^[-•]\s*/, '')}\n`);
    } else {
      formatted.push(`\n${l}\n`);
    }
  }

  return formatted.join('').trim();
}

// Generate the new articles
const existingSlugs = new Set();

// Read current articles.ts to get the exact 20 existing
const currentArticlesTs = fs.readFileSync(path.join(__dirname, '../lib/data/articles.ts'), 'utf8');
const existingArrayMatch = currentArticlesTs.match(/export const articlesData: Article\[\] = (\[[\s\S]*\]);/);
let existing20 = [];
if (existingArrayMatch) {
  try {
    // evaluate via dynamic code
    const evalData = eval(existingArrayMatch[1]);
    existing20 = evalData;
  } catch (e) {
    console.error('Eval error:', e);
  }
}

console.log('Loaded existing 20 articles:', existing20.length);
existing20.forEach(a => existingSlugs.add(a.slug));

const newArticles = [];

rawBlogs.forEach((b, idx) => {
  let title = cleanTitle(b.text);
  if (b.num === 53 && title.includes('Ensuring Safety')) {
    title = 'Senior Fall Prevention & Essential Home Safety Measures in Kenya';
  }
  
  let slug = makeSlug(title, b.num);
  if (existingSlugs.has(slug)) {
    slug = `${slug}-guide-${b.num}`;
  }
  existingSlugs.add(slug);

  const category = getCategory(title, b.text);
  const author = getAuthor(category);
  const date = dates[idx % dates.length];
  
  // Excerpt
  const lines = b.text.split(/\r?\n/).map(l => l.trim()).filter(l => l && l !== 'Back' && l !== 'Update website' && !l.includes('· Published') && l !== title);
  let excerpt = lines.find(l => l.length > 50 && l.endsWith('.')) || lines[0] || 'Comprehensive home healthcare and caregiving guide by AtHome Kenya.';
  if (excerpt.length > 220) {
    excerpt = excerpt.substring(0, 217) + '...';
  }

  const wordCount = b.text.split(/\s+/).length;
  const readMin = Math.max(3, Math.ceil(wordCount / 200));
  const readTime = `${readMin} min read`;

  const keyTakeaways = generateTakeaways(title, category, b.text);
  const content = cleanMarkdown(b.text, title);

  newArticles.push({
    slug,
    category,
    title,
    excerpt,
    readTime,
    date,
    author,
    keyTakeaways,
    content
  });
});

console.log('Generated new articles count:', newArticles.length);

const allArticles = [...existing20, ...newArticles];
console.log('Total combined articles count:', allArticles.length);

// Write to lib/data/articles.ts
const fileHeader = `export interface Article {
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

export const articlesData: Article[] = ${JSON.stringify(allArticles, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../lib/data/articles.ts'), fileHeader, 'utf8');
console.log('Successfully wrote', allArticles.length, 'articles to lib/data/articles.ts');
