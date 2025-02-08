export default class DocIntegration {
  private documentId: string;
  private doc: GoogleAppsScript.Document.Document;

  /**
   * Creates an instance of DocsIntegration.
   * @param documentId The ID of the document.
   */
  constructor(documentId: string) {
    this.documentId = documentId;
    this.doc = DocumentApp.openById(documentId);
  }

  /**
   * Retrieves the entire text from the document's body.
   * @returns The document's text.
   */
  getBodyText(): string {
    return this.doc.getBody().getText();
  }

  /**
   * Appends a paragraph of text to the document.
   * @param text The text to append.
   */
  appendText(text: string): void {
    this.doc.getBody().appendParagraph(text);
  }

  /**
   * Replaces text in the document's body.
   * @param searchPattern A regex pattern to search for.
   * @param replacement The replacement text.
   */
  replaceText(searchPattern: string, replacement: string): void {
    this.doc.getBody().replaceText(searchPattern, replacement);
  }
}
