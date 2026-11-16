import { NextResponse } from "next/server";

export async function GET() {
  const pdfHeader = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /Resources <<
    /Font << /F1 4 0 R >>
  >>
  /MediaBox [0 0 612 792]
  /Contents 5 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
5 0 obj
<<
  /Length 240
>>
stream
BT
/F1 18 Tf
50 720 Td
(At.home Kenya - Privacy Policy) Tj
/F1 12 Tf
0 -30 Td
(Effective Date: January 2026) Tj
0 -25 Td
(At.home Kenya respects your privacy. We collect only necessary care requirements,) Tj
0 -18 Td
(contact details, and patient location info solely for care coordination and equipment delivery.) Tj
0 -18 Td
(We do not sell or share patient data with unauthorized third parties.) Tj
0 -25 Td
(For inquiries: info@athomekenya.com | +254 705 320618) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000227 00000 n 
0000000295 00000 n 
trailer
<<
  /Size 6
  /Root 1 0 R
>>
startxref
585
%%EOF`;

  return new NextResponse(pdfHeader, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="privacy-policy.pdf"',
    },
  });
}
