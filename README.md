# GAS Integrations

GAS Integrations is a Google Apps Script library written in TypeScript that provides high-level integrations for Google Sheets, Google Docs, and common utility functions. Once deployed via clasp, it exposes a global object `GasIntegrations` which can be added as a library to your Apps Script projects.

## Features Overview

- **Easy Integration**: Provides seamless integration with Google Sheets and Google Docs.
- **Script Property Support**: Avoids hardcoded values by using Script Properties.
- **Logging Utilities**: Built-in logging functions for debugging.
- **Modular & Scalable**: Designed for flexibility and reusability.
- **Deploy via Clasp**: Easy deployment with Google Apps Script.

> **Note**: Currently, this library supports integrations for Google Sheets and Google Docs. However, it is designed to be extensible, allowing future integration with other Google Apps such as Gmail, Calendar, and Drive.

## Setup

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/patrick204nqh/gas-integrations.git
cd gas-integrations
yarn install
```

### 2. Build the Library

Build the project (using Rollup) to produce the deployable file:

```bash
yarn build
```

### 3. Deploy with Clasp

Make sure you're logged in with clasp, then deploy:

```bash
yarn deploy
```

### 4. Add the Library to Your Apps Script Project

- Open your Apps Script project.
- Go to **Libraries**
- Paste your library's key (from the deployed project) and select the latest version.
- The library will be available under the global namespace `GasIntegrations`.

---

## Exported Functions

### Sheets Integration

Provides methods to work with Google Sheets.

#### Creating a new Sheets Integration instance

To create a new Sheets integration, use the following:

```js
var sheets = GasIntegrations.newSheetService("YOUR_SPREADSHEET_ID");
```

The table below outlines available functions for Sheets integration.

| **Method**                                    | **Parameters**                                           | **Description**                                                      |
| --------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| `readData(sheetName, range)`                  | `sheetName: string`, `range: string`                     | Reads and returns a 2D array of values from the specified range.     |
| `writeData(sheetName, range, values)`         | `sheetName: string`, `range: string`, `values: any[][]`  | Writes a 2D array of values to the specified range.                  |
| `appendRow(sheetName, values)`                | `sheetName: string`, `values: any[]`                     | Appends a new row at the bottom of the sheet.                        |
| `insertRow(sheetName, rowIndex, values)`      | `sheetName: string`, `rowIndex: number`, `values: any[]` | Inserts a new row at the given index and fills it with values.       |
| `clearRange(sheetName, range)`                | `sheetName: string`, `range: string`                     | Clears the contents of the specified range.                          |
| `updateCell(sheetName, cell, value)`          | `sheetName: string`, `cell: string`, `value: any`        | Updates a single cell with a new value.                              |
| `setBackgroundColor(sheetName, range, color)` | `sheetName: string`, `range: string`, `color: string`    | Sets the background color for the specified range (e.g., "#FF0000"). |
| `getLastRow(sheetName)`                       | `sheetName: string`                                      | Returns the last row number that contains content.                   |

### Docs Integration

Provides methods to work with Google Docs.

#### Creating a new Docs Integration instance

To create a new Docs integration, use the following:

```js
var docs = GasIntegrations.newDocService("YOUR_DOCUMENT_ID");
```

The table below outlines available functions for Docs integration.

| **Method**                                | **Parameters**                                 | **Description**                                                 |
| ----------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------- |
| `getBodyText()`                           | _none_                                         | Retrieves the complete text content from the document's body.   |
| `appendText(text)`                        | `text: string`                                 | Appends a new paragraph of text to the document.                |
| `replaceText(searchPattern, replacement)` | `searchPattern: string`, `replacement: string` | Replaces text in the document using the provided regex pattern. |

### Logging Functions

<details><summary>more details</summary>

| **Function**        | **Description**                                     |
| ------------------- | --------------------------------------------------- |
| `logInfo(message)`  | Logs an informational message using `Logger.log()`. |
| `logWarn(message)`  | Logs a warning message using `Logger.log()`.        |
| `logError(message)` | Logs an error message using `Logger.log()`.         |

## </details>

## Usage in Apps Script

After adding the library to your project, you can access its exported functions.

### Example: Sheets Integration

```js
function testSheets() {
  var spreadsheetId = "YOUR_SPREADSHEET_ID"; // Replace with your spreadsheet ID.
  var sheets = GasIntegrations.newSheetService(spreadsheetId);

  // Read data from a range.
  var data = sheets.readData("Sheet1", "A1:A10");
  Logger.log(data);

  // Append a new row.
  sheets.appendRow("Sheet1", ["New", "Row", "Data"]);
}
```

### Example: Docs Integration

```js
function testDocs() {
  var documentId = "YOUR_DOCUMENT_ID"; // Replace with your document ID.
  var docs = GasIntegrations.newDocService(documentId);

  // Append text to the document.
  docs.appendText("Added via GasIntegrations library.");

  // Log the document's body text.
  Logger.log(docs.getBodyText());
}
```

### Example: Logging Usage

<details><summary>more details</summary>

```js
function testLogging() {
  GasIntegrations.logInfo("This is an info log.");
  GasIntegrations.logWarn("This is a warning log.");
  GasIntegrations.logError("This is an error log.");
}
```

</details>

---

## License

This project is licensed under the MIT License.
