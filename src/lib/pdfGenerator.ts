
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

interface ReservationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  places: number;
  eventName: string;
  totalPrice: number;
  orderId: string;
  paymentRef: string;
  date: string;
}

export const generateOrderPDF = async (data: ReservationData): Promise<string> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Set background color
  doc.setFillColor(34, 34, 34);
  doc.rect(0, 0, 210, 297, 'F');

  // Add gold header
  doc.setFillColor(245, 158, 11);
  doc.rect(0, 0, 210, 40, 'F');

  // Add logo placeholder
  doc.setTextColor(34, 34, 34);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('VILART', 105, 25, { align: 'center' });

  // Title
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Confirmation de Réservation', 105, 60, { align: 'center' });

  // Order ID
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Référence: ${data.orderId}`, 105, 70, { align: 'center' });
  doc.text(`Date: ${new Date(data.date).toLocaleDateString('fr-FR')}`, 105, 77, { align: 'center' });

  // Generate QR code for the order ID
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data.orderId, {
      margin: 1,
      width: 100,
      color: {
        dark: '#FFF', // QR code color
        light: '#222222', // Background color
      },
    });
    
    doc.addImage(qrCodeDataUrl, 'PNG', 75, 85, 60, 60);
    doc.setFontSize(10);
    doc.setTextColor(245, 158, 11);
    doc.text('Scannez pour vérifier la réservation', 105, 152, { align: 'center' });
  } catch (err) {
    console.error('QR code generation error:', err);
  }

  // Event details section
  doc.setFillColor(20, 20, 20);
  doc.roundedRect(25, 165, 160, 40, 3, 3, 'F');
  
  doc.setFontSize(14);
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.text('Détails de l\'événement', 35, 180);
  
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.text(`Événement: ${data.eventName}`, 35, 190);
  doc.text(`Nombre de places: ${data.places}`, 35, 198);

  // Customer details section
  doc.setFillColor(20, 20, 20);
  doc.roundedRect(25, 215, 160, 50, 3, 3, 'F');
  
  doc.setFontSize(14);
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.text('Informations client', 35, 230);
  
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nom: ${data.firstName} ${data.lastName}`, 35, 240);
  doc.text(`Email: ${data.email}`, 35, 248);
  doc.text(`Téléphone: ${data.phone}`, 35, 256);

  // Payment details section
  doc.setFillColor(20, 20, 20);
  doc.roundedRect(25, 275, 160, 12, 3, 3, 'F');
  
  doc.setFontSize(14);
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.text('Total payé:', 35, 283);
  
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.totalPrice} DT`, 160, 283, { align: 'right' });

  return doc.output('datauristring');
};
