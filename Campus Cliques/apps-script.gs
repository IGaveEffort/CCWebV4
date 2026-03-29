// ============================================================
// Campus Cliques — Google Apps Script Backend
// Paste this entire file into your Apps Script editor
// ============================================================

const SHEET_NAME_AMBASSADORS = "Ambassadors";
const SHEET_NAME_BRANDS = "Brands";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = data.type; // "ambassador" or "brand"

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (type === "ambassador") {
      let sheet = ss.getSheetByName(SHEET_NAME_AMBASSADORS);
      if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME_AMBASSADORS);
        sheet.appendRow([
          "Timestamp", "First Name", "Last Name", "Email",
          "University", "Year", "Platform", "Followers", "Major", "Vibe / Niche"
        ]);
        sheet.getRange(1, 1, 1, 10).setFontWeight("bold");
      }
      sheet.appendRow([
        new Date().toISOString(),
        data.firstName, data.lastName, data.email,
        data.university, data.year, data.platform,
        data.followers, data.major, data.vibe
      ]);

    } else if (type === "brand") {
      let sheet = ss.getSheetByName(SHEET_NAME_BRANDS);
      if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME_BRANDS);
        sheet.appendRow([
          "Timestamp", "First Name", "Last Name", "Work Email",
          "Brand Name", "Industry", "Campaign Goal", "Budget",
          "Target Campuses", "About Brand"
        ]);
        sheet.getRange(1, 1, 1, 10).setFontWeight("bold");
      }
      sheet.appendRow([
        new Date().toISOString(),
        data.firstName, data.lastName, data.email,
        data.brand, data.industry, data.goal,
        data.budget, data.campuses, data.about
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow GET for testing — visit the web app URL in browser to confirm it's live
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Campus Cliques backend is live!" }))
    .setMimeType(ContentService.MimeType.JSON);
}
