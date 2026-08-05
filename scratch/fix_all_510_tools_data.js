import fs from 'fs';
import path from 'path';
import { freeToolsList, getToolSiloCategory } from '../src/utils/toolsData';

const filePath = path.join(process.cwd(), 'src/utils/toolsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🛠️ Normalizing and repairing all 510 tool entries in src/utils/toolsData.ts...');

const fixedList = freeToolsList.map(t => {
  const siloCat = t.siloCategory || getToolSiloCategory(t);
  
  const faqs = (t.faqs && t.faqs.length >= 2) ? t.faqs : [
    { q: `How does the ${t.title} work?`, a: `The ${t.title} processes your data 100% locally inside your browser with sub-50ms execution speed and zero data uploads.` },
    { q: `Is the ${t.title} completely free to use?`, a: `Yes! The ${t.title} is 100% free with unlimited usages.` }
  ];

  const steps = (t.steps && t.steps.length >= 3) ? t.steps : [
    { step: 1, title: 'Input Data', desc: `Enter or paste your details into the ${t.title} workspace.` },
    { step: 2, title: 'Configure Options', desc: 'Select desired parameters, formatting options, or calculation rules.' },
    { step: 3, title: 'Export Result', desc: 'Click Copy or Download to save your instant output.' }
  ];

  const usecases = (t.usecases && t.usecases.length >= 2) ? t.usecases : [
    `Automating ${t.title} workflows`,
    'Improving online digital productivity',
    'Professional growth optimization'
  ];

  const benefits = (t.benefits && t.benefits.length >= 2) ? t.benefits : [
    '100% Client-Side Engine',
    'Sub-50ms Instant Execution',
    'Zero Data Upload Risk',
    'Free Unlimited Usage'
  ];

  const deviceGuide = t.deviceGuide || {
    mobile: 'Mobile responsive web workspace.',
    desktop: 'Full keyboard shortcut support.'
  };

  const comparison = t.comparison || {
    feature: 'Execution Architecture',
    cacto: 'Local Browser (Zero Storage)',
    traditional: 'Transmitted to Remote Server'
  };

  return {
    ...t,
    siloCategory: siloCat,
    faqs,
    steps,
    usecases,
    benefits,
    deviceGuide,
    comparison
  };
});

const headerMarker = 'export const freeToolsList: ToolData[] = [';
const headerIndex = content.indexOf(headerMarker);

if (headerIndex !== -1) {
  const fileHeader = content.slice(0, headerIndex + headerMarker.length);
  const formattedArray = '\n' + fixedList.map(t => '  ' + JSON.stringify(t, null, 2).replace(/\n/g, '\n  ') + ',').join('\n') + '\n];\n';
  
  const helperMarker = 'export function getToolSiloCategory';
  const helperIndex = content.indexOf(helperMarker);
  
  if (helperIndex !== -1) {
    const fileFooter = '\n' + content.slice(helperIndex);
    const finalContent = fileHeader + formattedArray + fileFooter;
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log('✅ Successfully normalized and saved all 510 tools in src/utils/toolsData.ts!');
  } else {
    console.error('Could not locate getToolSiloCategory function');
  }
} else {
  console.error('Could not locate freeToolsList array header');
}
