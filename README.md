# GAS Integrations

GAS Integrations is a Google Apps Script library written in TypeScript that provides high-level integrations for Google Sheets, Google Docs, and common utility functions. Once deployed via clasp, it exposes a global object `GasIntegrations` which can be added as a library to your Apps Script projects.

## Setup

1. **Clone & Install Dependencies**

   ```bash
   git clone https://github.com/patrick204nqh/gas-integrations.git
   cd gas-integrations
   yarn install
   ```

2. **Build the Library**

   Build the project (using Rollup) to produce the deployable file:

   ```bash
   yarn build
   ```

3. **Deploy with Clasp**

   Make sure you're logged in with clasp, then deploy:

   ```bash
   yarn deploy
   ```

4. **Add the Library to Your Apps Script Project**

   - Open your Apps Script project.
   - Go to **Resources → Libraries…**
   - Paste your library's key (from the deployed project) and select the latest version.
   - The library will be available under the global namespace `GasIntegrations`.

## Configuration with Script Properties

Rather than hardcoding values like the spreadsheet ID or sheet name, it is recommended to store these in Script Properties. This makes your code easier to maintain and update.

### Setting Script Properties

You can set your configuration via a script function:

```js
function setScriptProperties() {
  var props = PropertiesService.getScriptProperties();
  props.setProperties({
    SPREADSHEET_ID: "YOUR_SPREADSHEET_ID",  // Replace with your spreadsheet ID.
    SHEET_NAME: "Sheet1"                     // Replace with your sheet name.
  });
}
```

### Retrieving Configuration

Then, in your functions you can retrieve these values:

```js
function getConfig() {
  var props = PropertiesService.getScriptProperties().getProperties();
  return {
    spreadsheetId: props.SPREADSHEET_ID,
    sheetName: props.SHEET_NAME
  };
}
```

## Integration Functions Overview

### Sheets Integration

Provides methods to work with Google Sheets.

| **Method**                                  | **Parameters**                                                                 | **Description**                                                  |
|---------------------------------------------|--------------------------------------------------------------------------------|------------------------------------------------------------------|
| `readData(sheetName, range)`                | `sheetName: string`, `range: string`                                             | Reads and returns a 2D array of values from the specified range. |
| `writeData(sheetName, range, values)`         | `sheetName: string`, `range: string`, `values: any[][]`                          | Writes a 2D array of values to the specified range.              |
| `appendRow(sheetName, values)`              | `sheetName: string`, `values: any[]`                                             | Appends a new row at the bottom of the sheet.                    |
| `insertRow(sheetName, rowIndex, values)`      | `sheetName: string`, `rowIndex: number`, `values: any[]`                         | Inserts a new row at the given index and fills it with values.     |
| `clearRange(sheetName, range)`              | `sheetName: string`, `range: string`                                             | Clears the contents of the specified range.                      |
| `updateCell(sheetName, cell, value)`          | `sheetName: string`, `cell: string`, `value: any`                                | Updates a single cell with a new value.                          |
| `setBackgroundColor(sheetName, range, color)` | `sheetName: string`, `range: string`, `color: string`                            | Sets the background color for the specified range (e.g., "#FF0000"). |
| `getLastRow(sheetName)`                     | `sheetName: string`                                                              | Returns the last row number that contains content.               |

### Docs Integration

Provides methods to work with Google Docs.

| **Method**                                  | **Parameters**                                              | **Description**                                                       |
|---------------------------------------------|-------------------------------------------------------------|-----------------------------------------------------------------------|
| `getBodyText()`                             | _none_                                                      | Retrieves the complete text content from the document's body.         |
| `appendText(text)`                          | `text: string`                                              | Appends a new paragraph of text to the document.                      |
| `replaceText(searchPattern, replacement)`   | `searchPattern: string`, `replacement: string`              | Replaces text in the document using the provided regex pattern.       |

### Helpers Module

Provides common utility functions.

| **Method**              | **Parameters**         | **Description**                                        |
|-------------------------|------------------------|--------------------------------------------------------|
| `log(message)`          | `message: string`      | Logs a message using `Logger.log()`.                   |
| `handleError(e)`        | `e: Error`             | Logs the error and rethrows it.                        |

## Usage in Apps Script

After adding the library to your project and setting your Script Properties, you can access its modules.

### Example: Sheets Integration

```js
function testSheets() {
  // Retrieve configuration from Script Properties.
  var config = getConfig();
  
  // Create a Sheets integration instance using the configured spreadsheet ID.
  var sheets = new GasIntegrations.Sheets(config.spreadsheetId);
  
  // Read data from a range.
  var data = sheets.readData(config.sheetName, "A1:A10");
  Logger.log(data);
  
  // Append a new row.
  sheets.appendRow(config.sheetName, ["New", "Row", "Data"]);
}
```

### Example: Docs Integration

```js
function testDocs() {
  var documentId = "YOUR_DOCUMENT_ID"; // Replace with your document ID.
  
  // Create a Docs integration instance.
  var docs = new GasIntegrations.Docs(documentId);
  
  // Append text to the document.
  docs.appendText("Added via GasIntegrations library.");
  
  // Log the document's body text.
  Logger.log(docs.getBodyText());
}
```

### Example: Helpers Usage

```js
function testHelpers() {
  GasIntegrations.Helpers.log("This is a log message from the Helpers module.");
}
```

## License

This project is licensed under the MIT License.
