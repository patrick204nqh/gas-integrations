(function () {
  'use strict';

  var Helpers = (function () {
      function Helpers() {
      }
      Helpers.log = function (message) {
          Logger.log(message);
      };
      Helpers.handleError = function (e) {
          Logger.log("Error: " + e.toString());
          throw e;
      };
      return Helpers;
  }());

  var SheetIntegration = (function () {
      function SheetIntegration(spreadsheetId) {
          this.spreadsheetId = spreadsheetId;
          this.ss = SpreadsheetApp.openById(spreadsheetId);
      }
      SheetIntegration.prototype.getSheetByName = function (sheetName) {
          var sheet = this.ss.getSheetByName(sheetName);
          if (!sheet) {
              throw new Error("Sheet '".concat(sheetName, "' not found"));
          }
          return sheet;
      };
      SheetIntegration.prototype.readData = function (sheetName, range) {
          try {
              var sheet = this.getSheetByName(sheetName);
              return sheet.getRange(range).getValues();
          }
          catch (e) {
              Helpers.log("readData error: ".concat(e.message));
              throw e;
          }
      };
      SheetIntegration.prototype.writeData = function (sheetName, range, values) {
          try {
              var sheet = this.getSheetByName(sheetName);
              sheet.getRange(range).setValues(values);
          }
          catch (e) {
              Helpers.log("writeData error: ".concat(e.message));
              throw e;
          }
      };
      SheetIntegration.prototype.appendRow = function (sheetName, values) {
          try {
              var sheet = this.getSheetByName(sheetName);
              sheet.appendRow(values);
          }
          catch (e) {
              Helpers.log("appendRow error: ".concat(e.message));
              throw e;
          }
      };
      SheetIntegration.prototype.insertRow = function (sheetName, rowIndex, values) {
          try {
              var sheet = this.getSheetByName(sheetName);
              sheet.insertRows(rowIndex);
              var range = sheet.getRange(rowIndex, 1, 1, values.length);
              range.setValues([values]);
          }
          catch (e) {
              Helpers.log("insertRow error: ".concat(e.message));
              throw e;
          }
      };
      SheetIntegration.prototype.clearRange = function (sheetName, range) {
          try {
              var sheet = this.getSheetByName(sheetName);
              sheet.getRange(range).clearContent();
          }
          catch (e) {
              Helpers.log("clearRange error: ".concat(e.message));
              throw e;
          }
      };
      SheetIntegration.prototype.updateCell = function (sheetName, cell, value) {
          try {
              var sheet = this.getSheetByName(sheetName);
              sheet.getRange(cell).setValue(value);
          }
          catch (e) {
              Helpers.log("updateCell error: ".concat(e.message));
              throw e;
          }
      };
      SheetIntegration.prototype.setBackgroundColor = function (sheetName, range, color) {
          try {
              var sheet = this.getSheetByName(sheetName);
              sheet.getRange(range).setBackground(color);
          }
          catch (e) {
              Helpers.log("setBackgroundColor error: ".concat(e.message));
              throw e;
          }
      };
      SheetIntegration.prototype.getLastRow = function (sheetName) {
          try {
              var sheet = this.getSheetByName(sheetName);
              return sheet.getLastRow();
          }
          catch (e) {
              Helpers.log("getLastRow error: ".concat(e.message));
              throw e;
          }
      };
      return SheetIntegration;
  }());

  var DocIntegration = (function () {
      function DocIntegration(documentId) {
          this.documentId = documentId;
          this.doc = DocumentApp.openById(documentId);
      }
      DocIntegration.prototype.getBodyText = function () {
          return this.doc.getBody().getText();
      };
      DocIntegration.prototype.appendText = function (text) {
          this.doc.getBody().appendParagraph(text);
      };
      DocIntegration.prototype.replaceText = function (searchPattern, replacement) {
          this.doc.getBody().replaceText(searchPattern, replacement);
      };
      return DocIntegration;
  }());

  globalThis.GasIntegrations = {
      Sheets: SheetIntegration,
      Docs: DocIntegration,
      Helpers: Helpers
  };

})();
