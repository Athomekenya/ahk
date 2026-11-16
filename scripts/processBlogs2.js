const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../blogs2.txt'), 'utf8');

// Match blogs
const regex = /blog\s*(\d+)[\r\n]+([\s\S]*?)(?=(?:blog\s*\d+|$))/gi;
let match;
const rawBlogs = [];

while ((match = regex.exec(content)) !== null) {
  const num = parseInt(match[1]);
  const text = match[2].trim();
  rawBlogs.push({ num, text });
}

console.log('Total blogs extracted from blogs2.txt:', rawBlogs.length);

// Category classifier helper
function inferCategory(title, text) {
  const t = (title + ' ' + text).toLowerCase();
  if (t.includes('autism') || t.includes('children with autism')) return 'Pediatric & Special Needs';
  if (t.includes('palliative') || t.includes('hospice') || t.includes('terminally ill')) return 'Palliative Care';
  if (t.includes('wound care') || t.includes('dressing')) return 'Wound Care';
  if (t.includes('equipment leasing') || t.includes('equipment rental') || t.includes('hospital bed') || t.includes('oxygen concentrator') || t.includes('wheelchair')) return 'Equipment & Supplies';
  if (t.includes('surgical') || t.includes('post-surgical') || t.includes('post-surgery') || t.includes('surgery')) return 'Post-Surgical Care';
  if (t.includes('physiotherapy') || t.includes('physical therapy') || t.includes('rehabilitation')) return 'Physiotherapy';
  if (t.includes('stroke')) return 'Stroke Recovery';
  if (t.includes('training program') || t.includes('become a caregiver') || t.includes('caregiver training') || t.includes('find employment')) return 'Caregiver Training';
  if (t.includes('medical tourism') || t.includes('accommodation in nairobi')) return 'Medical Tourism';
  if (t.includes('pension') || t.includes('pension schemes')) return 'Elderly Planning';
  if (t.includes('elderly') || t.includes('aging') || t.includes('seniors') || t.includes('nursing homes')) return 'Elderly Care';
  if (t.includes('caregiver') || t.includes('live-in')) return 'Caregivers';
  return 'Home Healthcare';
}

function inferAuthor(category) {
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
    case 'Pediatric & Special Needs':
      return { name: 'Pediatric & Neuro-Developmental Unit', role: 'Special Needs & Family Support' };
    case 'Medical Tourism':
      return { name: 'International Patient Coordination', role: 'Medical Hospitality & Care Logistics' };
    default:
      return { name: 'Clinical Care Governance Team', role: 'AtHome Kenya Healthcare Services' };
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

function generateTakeaways(title, category, paragraphs) {
  const takes = [];
  takes.push(`Professional in-home ${category.toLowerCase()} delivers tailored clinical and daily living support in Nairobi.`);
  takes.push(`One-on-one attention ensures higher patient safety, comfort, and faster recovery outcomes.`);
  takes.push(`Eliminates transit stress while keeping loved ones surrounded by familiar family environments.`);
  takes.push(`AtHome Kenya provides vetted professionals, continuous supervision, and transparent family updates.`);
  return takes;
}

function formatMarkdownContent(title, rawText) {
  const lines = rawText
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l && l !== 'Back' && l !== 'Update website' && !l.includes('· Published') && l !== title);

  const formattedBlocks = [];
  let sectionIndex = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line looks like a heading
    const isHeading = 
      /^\d+\.\s+[A-Z]/.test(line) ||
      (line.length < 80 && !line.endsWith('.') && !line.endsWith(',') && (
        line.startsWith('Introduction') ||
        line.startsWith('Understanding') ||
        line.startsWith('Benefits') ||
        line.startsWith('The Importance') ||
        line.startsWith('Types of') ||
        line.startsWith('Choosing') ||
        line.startsWith('How to') ||
        line.startsWith('Conclusion') ||
        line.startsWith('Why ') ||
        line.startsWith('Providing ') ||
        line.startsWith('Ensuring ') ||
        line.startsWith('Creating ') ||
        line.startsWith('Exploring ')
      ));

    if (isHeading) {
      if (line.toLowerCase().startsWith('conclusion')) {
        formattedBlocks.push(`---\n\n## Summary & Next Steps\n\n`);
      } else {
        formattedBlocks.push(`---\n\n## ${sectionIndex}. ${line.replace(/^\d+\.\s*/, '')}\n\n`);
        sectionIndex++;
      }
    } else if (/^\d+\.\s/.test(line)) {
      // Numbered item
      formattedBlocks.push(line + '\n\n');
    } else if (line.startsWith('- ') || line.startsWith('• ')) {
      formattedBlocks.push(line.replace('• ', '- ') + '\n\n');
    } else {
      formattedBlocks.push(line + '\n\n');
    }
  }

  return formattedBlocks.join('').trim();
}

console.log('Analyzer loaded successfully');
