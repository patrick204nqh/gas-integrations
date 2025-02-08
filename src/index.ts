import SheetIntegration from './sheets/SheetIntegration';
import DocIntegration from './docs/DocIntegration';
import Helpers from './utils/Helpers';

// Expose the modules under a global namespace for Apps Script.
// Casting globalThis to any allows us to add a property.
(globalThis as any).GasIntegrations = {
  Sheets: SheetIntegration,
  Docs: DocIntegration,
  Helpers: Helpers
};
