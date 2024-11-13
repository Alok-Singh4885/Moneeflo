import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

export const generateInvoicePDF = async (products: any[], userId: number): Promise<string> => {
  const doc = new PDFDocument({ margin: 50 });
  const pdfPath = path.join(__dirname, `../../invoices/invoice_${userId}_${Date.now()}.pdf`);
  doc.pipe(fs.createWriteStream(pdfPath));

  
  doc.fontSize(20).text('Invoice', { align: 'center' }).moveDown(2);

  doc.fontSize(12).text('Product', 50, doc.y, { continued: true });
  doc.text('Qty', 200, doc.y, { continued: true });
  doc.text('Rate', 250, doc.y, { continued: true });
  doc.text('Total', 300, doc.y);
  doc.moveDown();

  doc.moveTo(50, doc.y).lineTo(500, doc.y).stroke().moveDown(0.5);

  let grandTotal = 0;
  products.forEach((product) => {
    const total = product.qty * product.rate;
    grandTotal += total + (total * 0.18);

    doc.text(product.product_name, 50, doc.y, { continued: true });
    doc.text(product.qty, 200, doc.y, { continued: true });
    doc.text(product.rate, 250, doc.y, { continued: true });
    doc.text(`INR ${total.toFixed(2)}`, 300, doc.y);
    doc.moveDown();
  });

  doc.moveTo(50, doc.y).lineTo(500, doc.y).stroke().moveDown(0.5);

  const totalAmount = products.reduce((sum, product) => sum + product.qty * product.rate, 0);
  const gstAmount = totalAmount * 0.18;
  grandTotal = totalAmount + gstAmount;

  doc.text('Total', 250, doc.y, { continued: true });
  doc.text(`INR ${totalAmount.toFixed(2)}`, 300, doc.y).moveDown();

  doc.text('GST', 250, doc.y, { continued: true });
  doc.text('18%', 300, doc.y).moveDown();

  doc.fontSize(14).text('Grand Total', 250, doc.y, { continued: true });
  doc.text(`INR ${grandTotal.toFixed(2)}`, 300, doc.y, { underline: true });


  doc.end();

  console.log(`PDF generated at: ${pdfPath}`);
  return pdfPath;
};