import jsPDF from 'jspdf';
import {
  personalInfo,
  profileData,
  experiences,
  projects,
  education,
  skills,
  techSkills,
  interests,
  socials,
} from '../data/resumeData';

// ─── Palette (matches the reference resume) ───────────────────────────────────
const NAVY = { r: 26, g: 47, b: 80 };       // dark blue sidebar
const WHITE = { r: 255, g: 255, b: 255 };
const BLACK = { r: 30, g: 30, b: 30 };
const GRAY = { r: 80, g: 80, b: 80 };        // darker gray for better contrast
const LIGHT_GRAY = { r: 220, g: 220, b: 220 };
const ACCENT = { r: 74, g: 144, b: 217 };   // blue accent for skill bars / lines

// ─── Layout constants ────────────────────────────────────────────────────────
const PAGE_W = 210;   // A4 mm
const PAGE_H = 297;
const MAIN_W = 130;   // left white column width
const SIDE_X = MAIN_W; // sidebar starts here
const SIDE_W = PAGE_W - MAIN_W;
const MAIN_PAD = 14;
const SIDE_PAD = 10;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function setColor(doc: jsPDF, c: { r: number; g: number; b: number }, fill = true): void {
  if (fill) doc.setFillColor(c.r, c.g, c.b);
  else doc.setTextColor(c.r, c.g, c.b);
}

function drawRect(doc: jsPDF, x: number, y: number, w: number, h: number, c: { r: number; g: number; b: number }): void {
  setColor(doc, c);
  doc.rect(x, y, w, h, 'F');
}

function drawBackground(doc: jsPDF): void {
  drawRect(doc, 0, 0, MAIN_W, PAGE_H, WHITE);
  drawRect(doc, SIDE_X, 0, SIDE_W, PAGE_H, NAVY);
}

function sectionTitle(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  width: number,
  light = false
): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  setColor(doc, light ? WHITE : BLACK, false);
  doc.text(text, x, y);
  // underline
  const lineY = y + 1.5;
  doc.setDrawColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.setLineWidth(0.5);
  doc.line(x, lineY, x + width, lineY);
  return lineY + 4;
}

function wrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxW: number,
  fontSize = 8.5,
  bold = false,
  color: { r: number; g: number; b: number } = GRAY
): number {
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  doc.setFontSize(fontSize);
  setColor(doc, color, false);
  const lines = doc.splitTextToSize(text, maxW) as string[];
  doc.text(lines, x, y);
  return y + lines.length * (fontSize * 0.4 + 1.2);
}

function skillBar(
  doc: jsPDF,
  label: string,
  x: number,
  y: number,
  width: number,
  level: number   // 0–1
): number {
  // label
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  setColor(doc, WHITE, false);
  doc.text(label, x, y);
  const barY = y + 1.5;
  const barW = width;
  const barH = 2.2;
  // track
  drawRect(doc, x, barY, barW, barH, { r: 255, g: 255, b: 255 });
  // fill
  drawRect(doc, x, barY, barW * level, barH, ACCENT);
  return barY + barH + 4;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function generateResumePdf(): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  // ══════════════════════════════════════════════════════════════════════════
  // PAGE 1
  // ══════════════════════════════════════════════════════════════════════════
  drawBackground(doc);

  // ── Header ─────────────────────────────────────────────────────────────────
  drawRect(doc, 0, 0, MAIN_W, 32, WHITE);

  // Name & role directly left-aligned
  const nameX = MAIN_PAD;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  setColor(doc, BLACK, false);
  doc.text(personalInfo.name, nameX, 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  setColor(doc, ACCENT, false); 
  doc.text(personalInfo.role.toUpperCase(), nameX, 20);

  // divider
  doc.setDrawColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
  doc.setLineWidth(0.3);
  doc.line(MAIN_PAD, 32, MAIN_W - 6, 32);

  let leftY = 40;

  // ── Profile ───────────────────────────────────────────────────────────────
  leftY = sectionTitle(doc, 'Profile', MAIN_PAD, leftY, MAIN_W - MAIN_PAD - 6);
  leftY = wrappedText(
    doc,
    profileData.summary,
    MAIN_PAD,
    leftY,
    MAIN_W - MAIN_PAD - 6,
    8.5,
    false,
    GRAY
  );
  leftY += 5;

  // ── Employment History ─────────────────────────────────────────────────────
  leftY = sectionTitle(doc, 'Employment History', MAIN_PAD, leftY, MAIN_W - MAIN_PAD - 6);

  for (const exp of experiences) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    setColor(doc, BLACK, false);
    doc.text(`${exp.role}, ${exp.company}`, MAIN_PAD, leftY);
    leftY += 4.5;
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    setColor(doc, ACCENT, false);
    doc.text(exp.duration, MAIN_PAD, leftY);
    leftY += 4;

    // Split paragraphs/sentences for ATS friendly formatting
    const sentences = exp.description.split('. ').filter(Boolean);
    for (const sentence of sentences) {
      // Draw bullet point
      setColor(doc, ACCENT);
      doc.circle(MAIN_PAD + 1.5, leftY - 1, 0.7, 'F');
      
      leftY = wrappedText(
        doc,
        sentence.trim() + (sentence.endsWith('.') ? '' : '.'),
        MAIN_PAD + 4,
        leftY,
        MAIN_W - MAIN_PAD - 10,
        8.2,
        false,
        GRAY
      );
      leftY += 1;
    }
    leftY += 4;
  }

  // ── Education ─────────────────────────────────────────────────────────────
  leftY = sectionTitle(doc, 'Education', MAIN_PAD, leftY, MAIN_W - MAIN_PAD - 6);

  for (const edu of education) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    setColor(doc, BLACK, false);
    const titleText = `${edu.degree}, ${edu.institution}`;
    const degreeLines = doc.splitTextToSize(titleText, MAIN_W - MAIN_PAD - 6) as string[];
    doc.text(degreeLines, MAIN_PAD, leftY);
    leftY += degreeLines.length * 4.2;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    setColor(doc, ACCENT, false);
    doc.text(edu.duration, MAIN_PAD, leftY);
    leftY += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    setColor(doc, GRAY, false);
    doc.text(`Result: ${edu.score}`, MAIN_PAD, leftY);
    leftY += 5.5;
  }

  leftY += 2;

  // ── Areas of Interest (Placed on Page 1!) ──────────────────────────────────
  leftY = sectionTitle(doc, 'Areas of Interest', MAIN_PAD, leftY, MAIN_W - MAIN_PAD - 6);
  
  for (let i = 0; i < interests.length; i++) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    setColor(doc, BLACK, false);
    doc.text(`${i + 1}.`, MAIN_PAD, leftY);
    
    leftY = wrappedText(
      doc,
      interests[i],
      MAIN_PAD + 4,
      leftY,
      MAIN_W - MAIN_PAD - 10,
      8.5,
      false,
      GRAY
    );
    leftY += 1.5;
  }

  // ── Page 1 Sidebar (dark navy) ─────────────────────────────────────────────
  let sideY = 18;
  const sideContentX = SIDE_X + SIDE_PAD;
  const sideContentW = SIDE_W - SIDE_PAD * 2;

  // ── Details ───────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  setColor(doc, WHITE, false);
  doc.text('Details', sideContentX, sideY);
  doc.setDrawColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.setLineWidth(0.4);
  doc.line(sideContentX, sideY + 1.5, sideContentX + sideContentW, sideY + 1.5);
  sideY += 7;

  const details: Array<{ label?: string; value: string }> = [
    { value: personalInfo.location },
    { value: personalInfo.phone },
    { value: personalInfo.email },
    { label: 'NATIONALITY', value: personalInfo.nationality },
    { label: 'DATE OF BIRTH', value: personalInfo.dateOfBirth },
  ];

  for (const d of details) {
    if (d.label) {
      sideY += 2;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      setColor(doc, { r: 160, g: 180, b: 210 }, false);
      doc.text(d.label, sideContentX, sideY);
      sideY += 3.5;
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setColor(doc, WHITE, false);
    const valueLines = doc.splitTextToSize(d.value, sideContentW) as string[];
    doc.text(valueLines, sideContentX, sideY);
    sideY += valueLines.length * 4;
  }

  sideY += 6;

  // ── Skills ────────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  setColor(doc, WHITE, false);
  doc.text('Core Skills', sideContentX, sideY);
  doc.setDrawColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.setLineWidth(0.4);
  doc.line(sideContentX, sideY + 1.5, sideContentX + sideContentW, sideY + 1.5);
  sideY += 8;

  const skillLevels: Record<string, number> = {
    'Full-Stack Web Development': 0.90,
    'Full Software Development Life Cycle (SDLC)': 0.85,
    'AI-assisted & Spec-driven Development': 0.88,
    'Database Design & Query Optimization': 0.80,
    'Clean Code & SOLID Design Principles': 0.82,
    'Cross-functional Team Collaboration': 0.92,
  };

  for (const skill of skills) {
    const level = skillLevels[skill.label] || 0.85;
    sideY = skillBar(doc, skill.label, sideContentX, sideY, sideContentW, level);
  }

  sideY += 4;

  // ── Tech Stack ────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  setColor(doc, WHITE, false);
  doc.text('Technical Stack', sideContentX, sideY);
  doc.setDrawColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.setLineWidth(0.4);
  doc.line(sideContentX, sideY + 1.5, sideContentX + sideContentW, sideY + 1.5);
  sideY += 8;

  for (const tech of techSkills) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setColor(doc, WHITE, false);
    // bullet dot
    setColor(doc, ACCENT);
    doc.circle(sideContentX + 1.5, sideY - 1.2, 1.2, 'F');
    setColor(doc, WHITE, false);
    doc.text(tech.label, sideContentX + 5, sideY);
    sideY += 5;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PAGE 2 – Projects & Declaration
  // ══════════════════════════════════════════════════════════════════════════
  doc.addPage('a4', 'portrait');
  drawBackground(doc);

  let p2LeftY = 18;

  // ── Projects ──────────────────────────────────────────────────────────────
  p2LeftY = sectionTitle(doc, 'Projects', MAIN_PAD, p2LeftY, MAIN_W - MAIN_PAD - 6);

  for (const proj of projects) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    setColor(doc, BLACK, false);
    doc.text(proj.name, MAIN_PAD, p2LeftY);
    p2LeftY += 4.5;

    p2LeftY = wrappedText(
      doc,
      `${proj.description} Tech Stack: ${proj.techStack.join(', ')}.`,
      MAIN_PAD,
      p2LeftY,
      MAIN_W - MAIN_PAD - 6,
      8.2,
      false,
      GRAY
    );
    p2LeftY += 4;
  }

  // ── Declaration (Placed at the bottom of Page 2!) ──────────────────────────
  p2LeftY = PAGE_H - MAIN_PAD - 32;
  p2LeftY = sectionTitle(doc, 'Declaration', MAIN_PAD, p2LeftY, MAIN_W - MAIN_PAD - 6);
  p2LeftY = wrappedText(
    doc,
    'I hereby declare that all the details mentioned above are true and correct to the best of my knowledge.',
    MAIN_PAD,
    p2LeftY,
    MAIN_W - MAIN_PAD - 6,
    8.2,
    false,
    GRAY
  );
  
  p2LeftY += 8;

  // Signature Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  setColor(doc, BLACK, false);
  doc.text('Date:', MAIN_PAD, p2LeftY);
  doc.text('Signature:', MAIN_PAD + 65, p2LeftY);

  p2LeftY += 4.5;
  doc.setFont('helvetica', 'normal');
  setColor(doc, GRAY, false);
  
  // Format neat date dynamically or as high quality static representation
  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  doc.text(dateStr, MAIN_PAD, p2LeftY);
  doc.text(personalInfo.name, MAIN_PAD + 65, p2LeftY);

  // ── Page 2 Sidebar (dark navy) ─────────────────────────────────────────────
  let p2SideY = 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  setColor(doc, WHITE, false);
  doc.text('Profiles', sideContentX, p2SideY);
  doc.setDrawColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.setLineWidth(0.4);
  doc.line(sideContentX, p2SideY + 1.5, sideContentX + sideContentW, p2SideY + 1.5);
  p2SideY += 8;

  const profiles = [
    { label: 'LINKEDIN', value: socials.linkedin.replace('https://', '') },
    { label: 'GITHUB', value: socials.github.replace('https://', '') },
  ];

  for (const prof of profiles) {
    p2SideY += 1;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    setColor(doc, { r: 160, g: 180, b: 210 }, false);
    doc.text(prof.label, sideContentX, p2SideY);
    p2SideY += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setColor(doc, WHITE, false);
    const lines = doc.splitTextToSize(prof.value, sideContentW) as string[];
    doc.text(lines, sideContentX, p2SideY);
    p2SideY += lines.length * 4.5;
  }

  // ── Save ────────────────────────────────══════════════════════════════════
  doc.save(`${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`);
}
