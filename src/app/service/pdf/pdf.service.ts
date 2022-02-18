import { Injectable } from '@angular/core';
import { DropboxService } from '../dropbox/dropbox.service';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  font = {
    size: {
      h1: 13,
      h2: 12,
      h3: 11,
      h4: 10,
      h5: 9,
      small: 8,
    },
    type: {
      bold: 'bold',
      italic: 'italic',
      normal: 'normal',
      bolditalic: 'bolditalic',
    },
  };
  constructor(private dbx: DropboxService) {}

  generateScreenShotPDF(data: any) {
    const doc = new jsPDF('p', 'in', 'a4'); // a4 width = 8.267
    const pageWidth = doc.internal.pageSize.getWidth();
    const borderWidth = pageWidth - 1;
    let ySpacing = 0;

    doc.setFontSize(this.font.size.h1);
    doc.setFont('Times', this.font.type.bold);

    ySpacing += 0.6;
    doc.text('iCertify VIDEO CONFERENCE SCREENSHOT', pageWidth / 2, ySpacing, {
      align: 'center',
    });

    doc.setFontSize(this.font.size.h2);
    doc.setFont('Times', this.font.type.normal);

    ySpacing += 0.4;
    doc.text('QC Indigent: ', borderWidth - 6.5, ySpacing);
    doc.text(
      data.sender.firstName + ' ' + data.sender.lastName,
      borderWidth - 3.6,
      ySpacing
    );
    ySpacing += 0.2;
    doc.text('Notary: ', borderWidth - 6.5, ySpacing);
    doc.text(
      data._notaryId.firstName + ' ' + data._notaryId.lastName,
      borderWidth - 3.6,
      ySpacing
    );
    ySpacing += 0.2;
    doc.text(
      'Date and Time of Video Conference: ',
      borderWidth - 6.5,
      ySpacing
    );
    doc.text(
      new Date(data.dateNotarized).toDateString() +
        ' - ' +
        new Date(data.dateNotarized).toLocaleTimeString('en-US'),
      borderWidth - 3.6,
      ySpacing
    );
    ySpacing += 0.2;
    doc.text('Barangay: ', borderWidth - 6.5, ySpacing);
    doc.text(
      data._transactionId._barangay.brgyDesc,
      borderWidth - 3.6,
      ySpacing
    );

    doc.setFontSize(this.font.size.h1);
    doc.setFont('Times', this.font.type.bold);

    ySpacing += 0.4;
    doc.text('SCREENSHOT/S', pageWidth / 2, ySpacing, {
      align: 'center',
    });
    ySpacing += 0.2;
    for (let screenshot of data.temp.screenShots) {
      ySpacing += 0.2;
      doc.addImage(screenshot, 'PNG', pageWidth / 2 - 3, ySpacing, 6, 3.5);
    }

    return doc.save(
      data.sender.lastName +
        '_' +
        data.documentType.toUpperCase() +
        '_SCREENSHOT' +
        '.pdf'
    );
  }
}
