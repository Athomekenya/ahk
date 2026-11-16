/**
 * ATHOME KENYA - GOOGLE APPS SCRIPT WEBHOOK & METRICS BACKEND
 * 
 * Instructions:
 * 1. Open your Google Sheet (or create a new one: sheets.new)
 * 2. Go to Extensions > Apps Script
 * 3. Delete any default code and paste this entire file
 * 4. Click 'Deploy' > 'New deployment'
 * 5. Select type: 'Web app'
 *    - Description: AtHome Kenya Lead & Metrics Webhook
 *    - Execute as: 'Me'
 *    - Who has access: 'Anyone' (IMPORTANT!)
 * 6. Click 'Deploy' and copy the Web App URL (ends in /exec)
 * 7. Paste that URL into your .env file as GOOGLE_SHEET_WEBHOOK_URL
 */

function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : null;
    if (!rawData) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: "error", message: "No data payload received" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(rawData);
    var formType = data.formType || "general";
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (formType === "newsletter") {
      recordNewsletter(ss, data);
    } else if (formType === "contact") {
      recordContact(ss, data);
    } else if (formType === "consultation") {
      recordConsultation(ss, data);
    } else if (formType === "careers" || formType === "job_application") {
      recordCareers(ss, data);
    } else {
      recordGeneral(ss, data);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Recorded successfully" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#D8F3DC");
  }
  return sheet;
}

function recordNewsletter(ss, data) {
  var headers = ["Timestamp", "Email", "Source", "Date Added"];
  var sheet = getOrCreateSheet(ss, "Newsletter", headers);
  var now = new Date();
  sheet.appendRow([
    data.timestamp || now.toISOString(),
    data.email || "",
    data.source || "website",
    Utilities.formatDate(now, "GMT+3", "yyyy-MM-dd HH:mm:ss")
  ]);
}

function recordContact(ss, data) {
  var headers = ["Timestamp", "Name", "Email", "Phone", "Subject", "Message", "Date Added"];
  var sheet = getOrCreateSheet(ss, "Contacts", headers);
  var now = new Date();
  sheet.appendRow([
    data.timestamp || now.toISOString(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.subject || "",
    data.message || "",
    Utilities.formatDate(now, "GMT+3", "yyyy-MM-dd HH:mm:ss")
  ]);
}

function recordConsultation(ss, data) {
  var headers = ["Timestamp", "Name", "Email", "Phone", "Service", "Preferred Date", "Preferred Time", "Notes", "Date Added"];
  var sheet = getOrCreateSheet(ss, "Consultations", headers);
  var now = new Date();
  sheet.appendRow([
    data.timestamp || now.toISOString(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.service || "",
    data.preferredDate || "",
    data.preferredTime || "",
    data.notes || data.message || "",
    Utilities.formatDate(now, "GMT+3", "yyyy-MM-dd HH:mm:ss")
  ]);
}

function recordCareers(ss, data) {
  var headers = ["Timestamp", "Full Name", "Email", "Phone", "Position", "Experience", "Cover Note", "Date Added"];
  var sheet = getOrCreateSheet(ss, "Careers", headers);
  var now = new Date();
  sheet.appendRow([
    data.timestamp || now.toISOString(),
    data.name || data.fullName || "",
    data.email || "",
    data.phone || "",
    data.position || data.roleAppliedFor || "",
    data.experience || "",
    data.coverNote || "",
    Utilities.formatDate(now, "GMT+3", "yyyy-MM-dd HH:mm:ss")
  ]);
}

function recordGeneral(ss, data) {
  var headers = ["Timestamp", "Form Type", "Raw Payload", "Date Added"];
  var sheet = getOrCreateSheet(ss, "General Leads", headers);
  var now = new Date();
  sheet.appendRow([
    data.timestamp || now.toISOString(),
    data.formType || "unknown",
    JSON.stringify(data),
    Utilities.formatDate(now, "GMT+3", "yyyy-MM-dd HH:mm:ss")
  ]);
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "active", service: "AtHome Kenya Webhook & Metrics Sync" })
  ).setMimeType(ContentService.MimeType.JSON);
}
