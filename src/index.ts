import { logInfo, logWarn, logError } from "./utils/Logger";
import { newSheetService } from "./sheets/SheetFactory";
import { newDocService } from "./docs/DocFactory";

// Expose the modules under a global namespace for Apps Script.
// Casting globalThis to any allows us to add a property.
(globalThis as any).GasIntegrations = {
  logInfo: logInfo,
  logWarn: logWarn,
  logError: logError,
  newSheetService: newSheetService,
  newDocService: newDocService,
};
