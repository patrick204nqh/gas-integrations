function logInfo(message) {
    Logger.log(`[INFO] ${message}`);
}
function logWarn(message) {
    Logger.log(`[WARN] ${message}`);
}
function logError(message, stack) {
    Logger.log(`[ERROR] ${message} ${stack ? "\n" + stack : ""}`);
}

class SheetService {
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
            logError(`readData error: ${e.message}`);
            throw e;
        }
    }
    writeData(sheetName, range, values) {
        try {
            const sheet = this.getSheetByName(sheetName);
            sheet.getRange(range).setValues(values);
        }
        catch (e) {
            logError(`writeData error: ${e.message}`);
            throw e;
        }
    }
    appendRow(sheetName, values) {
        try {
            const sheet = this.getSheetByName(sheetName);
            sheet.appendRow(values);
        }
        catch (e) {
            logError(`appendRow error: ${e.message}`);
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
            logError(`insertRow error: ${e.message}`);
            throw e;
        }
    }
    clearRange(sheetName, range) {
        try {
            const sheet = this.getSheetByName(sheetName);
            sheet.getRange(range).clearContent();
        }
        catch (e) {
            logError(`clearRange error: ${e.message}`);
            throw e;
        }
    }
    updateCell(sheetName, cell, value) {
        try {
            const sheet = this.getSheetByName(sheetName);
            sheet.getRange(cell).setValue(value);
        }
        catch (e) {
            logError(`updateCell error: ${e.message}`);
            throw e;
        }
    }
    setBackgroundColor(sheetName, range, color) {
        try {
            const sheet = this.getSheetByName(sheetName);
            sheet.getRange(range).setBackground(color);
        }
        catch (e) {
            logError(`setBackgroundColor error: ${e.message}`);
            throw e;
        }
    }
    getLastRow(sheetName) {
        try {
            const sheet = this.getSheetByName(sheetName);
            return sheet.getLastRow();
        }
        catch (e) {
            logError(`getLastRow error: ${e.message}`);
            throw e;
        }
    }
}

function newSheetService(spreadsheetId) {
    return new SheetService(spreadsheetId);
}

class DocService {
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

function newDocService(documentId) {
    return new DocService(documentId);
}

globalThis.GasIntegrations = {
    logInfo: logInfo,
    logWarn: logWarn,
    logError: logError,
    newSheetService: newSheetService,
    newDocService: newDocService,
};
