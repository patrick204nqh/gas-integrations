class Helpers {
    static log(message) {
        Logger.log(message);
    }
    static handleError(e) {
        Logger.log("Error: " + e.toString());
        throw e;
    }
}

class SheetIntegration {
    constructor(spreadsheetId) {
        this.spreadsheetId = spreadsheetId;
        this.ss = SpreadsheetApp.openById(spreadsheetId);
    }
    getSheetByName(sheetName) {
        const sheet = this.ss.getSheetByName(sheetName);
        if (!sheet) {
            throw new Error(`Sheet '${sheetName}' not found`);
        }
        return sheet;
    }
    readData(sheetName, range) {
        try {
            const sheet = this.getSheetByName(sheetName);
            return sheet.getRange(range).getValues();
        }
        catch (e) {
            Helpers.log(`readData error: ${e.message}`);
            throw e;
        }
    }
    writeData(sheetName, range, values) {
        try {
            const sheet = this.getSheetByName(sheetName);
            sheet.getRange(range).setValues(values);
        }
        catch (e) {
            Helpers.log(`writeData error: ${e.message}`);
            throw e;
        }
    }
    appendRow(sheetName, values) {
        try {
            const sheet = this.getSheetByName(sheetName);
            sheet.appendRow(values);
        }
        catch (e) {
            Helpers.log(`appendRow error: ${e.message}`);
            throw e;
        }
    }
    insertRow(sheetName, rowIndex, values) {
        try {
            const sheet = this.getSheetByName(sheetName);
            sheet.insertRows(rowIndex);
            const range = sheet.getRange(rowIndex, 1, 1, values.length);
            range.setValues([values]);
        }
        catch (e) {
            Helpers.log(`insertRow error: ${e.message}`);
            throw e;
        }
    }
    clearRange(sheetName, range) {
        try {
            const sheet = this.getSheetByName(sheetName);
            sheet.getRange(range).clearContent();
        }
        catch (e) {
            Helpers.log(`clearRange error: ${e.message}`);
            throw e;
        }
    }
    updateCell(sheetName, cell, value) {
        try {
            const sheet = this.getSheetByName(sheetName);
            sheet.getRange(cell).setValue(value);
        }
        catch (e) {
            Helpers.log(`updateCell error: ${e.message}`);
            throw e;
        }
    }
    setBackgroundColor(sheetName, range, color) {
        try {
            const sheet = this.getSheetByName(sheetName);
            sheet.getRange(range).setBackground(color);
        }
        catch (e) {
            Helpers.log(`setBackgroundColor error: ${e.message}`);
            throw e;
        }
    }
    getLastRow(sheetName) {
        try {
            const sheet = this.getSheetByName(sheetName);
            return sheet.getLastRow();
        }
        catch (e) {
            Helpers.log(`getLastRow error: ${e.message}`);
            throw e;
        }
    }
}

class DocIntegration {
    constructor(documentId) {
        this.documentId = documentId;
        this.doc = DocumentApp.openById(documentId);
    }
    getBodyText() {
        return this.doc.getBody().getText();
    }
    appendText(text) {
        this.doc.getBody().appendParagraph(text);
    }
    replaceText(searchPattern, replacement) {
        this.doc.getBody().replaceText(searchPattern, replacement);
    }
}

globalThis.GasIntegrations = {
    Sheets: SheetIntegration,
    Docs: DocIntegration,
    Helpers: Helpers
};
