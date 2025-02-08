import Helpers from '../utils/Helpers';

export default class SheetIntegration {
  private spreadsheetId: string;
  private ss: GoogleAppsScript.Spreadsheet.Spreadsheet;

  /**
   * Creates an instance of SheetsIntegration.
   * @param spreadsheetId The ID of the spreadsheet.
   */
  constructor(spreadsheetId: string) {
    this.spreadsheetId = spreadsheetId;
    this.ss = SpreadsheetApp.openById(spreadsheetId);
  }

  /**
   * Gets a sheet by its name.
   * @param sheetName The name of the sheet.
   * @returns The sheet object.
   */
  getSheetByName(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
    const sheet = this.ss.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error(`Sheet '${sheetName}' not found`);
    }
    return sheet;
  }

  /**
   * Reads data from a specified range.
   * @param sheetName The name of the sheet.
   * @param range The range in A1 notation.
   * @returns A 2D array of cell values.
   */
  readData(sheetName: string, range: string): any[][] {
    try {
      const sheet = this.getSheetByName(sheetName);
      return sheet.getRange(range).getValues();
    } catch (e: any) {
      Helpers.log(`readData error: ${e.message}`);
      throw e;
    }
  }

  /**
   * Writes data to a specified range.
   * @param sheetName The name of the sheet.
   * @param range The range in A1 notation.
   * @param values A 2D array of values to write.
   */
  writeData(sheetName: string, range: string, values: any[][]): void {
    try {
      const sheet = this.getSheetByName(sheetName);
      sheet.getRange(range).setValues(values);
    } catch (e: any) {
      Helpers.log(`writeData error: ${e.message}`);
      throw e;
    }
  }

  /**
   * Appends a new row at the bottom of the specified sheet.
   * @param sheetName The name of the sheet.
   * @param values An array of values for the new row.
   */
  appendRow(sheetName: string, values: any[]): void {
    try {
      const sheet = this.getSheetByName(sheetName);
      sheet.appendRow(values);
    } catch (e: any) {
      Helpers.log(`appendRow error: ${e.message}`);
      throw e;
    }
  }

  /**
   * Inserts a new row at a given index (1-based).
   * @param sheetName The name of the sheet.
   * @param rowIndex The row index where the new row should be inserted.
   * @param values An array of values for the new row.
   */
  insertRow(sheetName: string, rowIndex: number, values: any[]): void {
    try {
      const sheet = this.getSheetByName(sheetName);
      // Insert a blank row at the specified index
      sheet.insertRows(rowIndex);
      // Set values for the newly inserted row
      const range = sheet.getRange(rowIndex, 1, 1, values.length);
      range.setValues([values]);
    } catch (e: any) {
      Helpers.log(`insertRow error: ${e.message}`);
      throw e;
    }
  }

  /**
   * Clears the contents in a given range.
   * @param sheetName The name of the sheet.
   * @param range The range in A1 notation to clear.
   */
  clearRange(sheetName: string, range: string): void {
    try {
      const sheet = this.getSheetByName(sheetName);
      sheet.getRange(range).clearContent();
    } catch (e: any) {
      Helpers.log(`clearRange error: ${e.message}`);
      throw e;
    }
  }

  /**
   * Updates a specific cell with a new value.
   * @param sheetName The name of the sheet.
   * @param cell The cell in A1 notation.
   * @param value The value to set.
   */
  updateCell(sheetName: string, cell: string, value: any): void {
    try {
      const sheet = this.getSheetByName(sheetName);
      sheet.getRange(cell).setValue(value);
    } catch (e: any) {
      Helpers.log(`updateCell error: ${e.message}`);
      throw e;
    }
  }

  /**
   * Sets the background color for a specified range.
   * @param sheetName The name of the sheet.
   * @param range The range in A1 notation.
   * @param color The background color (e.g., "#FF0000").
   */
  setBackgroundColor(sheetName: string, range: string, color: string): void {
    try {
      const sheet = this.getSheetByName(sheetName);
      sheet.getRange(range).setBackground(color);
    } catch (e: any) {
      Helpers.log(`setBackgroundColor error: ${e.message}`);
      throw e;
    }
  }

  /**
   * Returns the index of the last row with content in the specified sheet.
   * @param sheetName The name of the sheet.
   * @returns The last row number that contains content.
   */
  getLastRow(sheetName: string): number {
    try {
      const sheet = this.getSheetByName(sheetName);
      return sheet.getLastRow();
    } catch (e: any) {
      Helpers.log(`getLastRow error: ${e.message}`);
      throw e;
    }
  }
}
