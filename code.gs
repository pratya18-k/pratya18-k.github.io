function doGet(e) {
  return ContentService.createTextOutput("API is working! Use POST to send data.");
}

function doPost(e) {
  try {
    // เปลี่ยน SPREADSHEET_ID เป็น ID ของ Google Sheets ของคุณ
    const SPREADSHEET_ID = '1SSKtgEe5fFaVPMxefb_v1uzee4WCOuiiCu2MXE071vM';
    
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // บันทึกข้อมูลลงแถวใหม่
    const now = new Date();
    const row = [
      now.toLocaleDateString('th-TH'),
      now.toLocaleTimeString('th-TH'),
      data.name || '',
      data.email || '',
      data.message || ''
    ];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error', 
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
