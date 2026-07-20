import { jsPDF } from 'jspdf';

const NAVY = [19, 37, 82];
const RUST = [142, 52, 0];
const GOLD = [196, 154, 61];
const GRAY = [107, 114, 128];

async function loadImageAsDataURL(src) {
  const res = await fetch(src);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateMembershipCertificate({ user, membership }) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Outer border
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(1.2);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  // Inner gold accent border
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Logo
  try {
    const logoData = await loadImageAsDataURL('/GoGMI_PNG.png');
    doc.addImage(logoData, 'PNG', pageWidth / 2 - 12, 18, 24, 24);
  } catch {
    // continue without logo if it fails to load
  }

  // Header
  doc.setTextColor(...NAVY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('GULF OF GUINEA MARITIME INSTITUTE', pageWidth / 2, 50, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text('www.gogmi.org.gh', pageWidth / 2, 55, { align: 'center' });

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(...RUST);
  doc.text('Certificate of Membership', pageWidth / 2, 72, { align: 'center' });

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.line(pageWidth / 2 - 30, 77, pageWidth / 2 + 30, 77);

  // Body
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...GRAY);
  doc.text('This is to certify that', pageWidth / 2, 92, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...NAVY);
  doc.text(user.full_name || 'Member', pageWidth / 2, 104, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...GRAY);
  const membershipTypeLabel = membership.membership_type === 'institutional' ? 'an Institutional' : 'an Individual';
  doc.text(
    `is a verified ${membershipTypeLabel} member of GoGMI, holding the ${membership.plan_name} plan,`,
    pageWidth / 2, 114, { align: 'center' }
  );
  doc.text('in good standing as of the date of issue.', pageWidth / 2, 121, { align: 'center' });

  // Details row
  const detailsY = 140;
  const col1X = pageWidth / 2 - 70;
  const col2X = pageWidth / 2;
  const col3X = pageWidth / 2 + 70;

  const drawDetail = (x, label, value) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text(label.toUpperCase(), x, detailsY, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...NAVY);
    doc.text(value, x, detailsY + 7, { align: 'center' });
  };

  drawDetail(col1X, 'Membership ID', membership.membership_id || 'N/A');
  drawDetail(col2X, 'Status', (membership.status || 'active').toUpperCase());
  drawDetail(
    col3X,
    'Valid Through',
    membership.expiry_date
      ? new Date(membership.expiry_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : 'N/A'
  );

  // Signature / issue line
  const sigY = pageHeight - 32;
  doc.setDrawColor(...GRAY);
  doc.setLineWidth(0.3);
  doc.line(pageWidth / 2 - 45, sigY, pageWidth / 2 - 5, sigY);
  doc.line(pageWidth / 2 + 5, sigY, pageWidth / 2 + 45, sigY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text('Executive Chairman', pageWidth / 2 - 25, sigY + 5, { align: 'center' });
  doc.text(
    `Issued ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
    pageWidth / 2 + 25, sigY + 5, { align: 'center' }
  );

  doc.setFontSize(7.5);
  doc.setTextColor(...GRAY);
  doc.text(
    'This certificate is issued electronically and is valid without a physical signature.',
    pageWidth / 2, pageHeight - 14, { align: 'center' }
  );

  const filename = `GoGMI-Certificate-${(membership.membership_id || 'member').replace(/[^a-zA-Z0-9-]/g, '')}.pdf`;
  doc.save(filename);
}
