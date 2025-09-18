function doGet(e) {
  return ContentService.createTextOutput("Finance API Ready. Please use POST for data submission.");
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById('1z-v1f0PhHaO8vOWLBod7zEsTU8EdB2gJS2smr7gd-zo').getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    if (!Array.isArray(data)) {
      // Handle single transaction
      const rowNumber = sheet.getLastRow();
      const newRow = createRow(rowNumber, data);
      sheet.appendRow(newRow);
    } else {
      // Handle multiple transactions
      const rows = [];
      const lastRow = sheet.getLastRow();
      data.forEach((transaction, index) => {
        const rowNumber = lastRow + index;
        rows.push(createRow(rowNumber, transaction));
      });
      sheet.getRange(lastRow + 1, 1, rows.length, rows[0].length).setValues(rows);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function createRow(rowNumber, transaction) {
  return [
    rowNumber,
    transaction.date,
    transaction.time,
    transaction.category,
    transaction.subCategory,
    transaction.paymentType,
    transaction.paymentDetail,
    transaction.detail,
    transaction.fund || '',
    transaction.type === 'Income' ? transaction.amount : '',
    transaction.type === 'Expenses' ? transaction.amount : '',
    transaction.atth || '',
    transaction.comment || ''
  ];
}
