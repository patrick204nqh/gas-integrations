import SheetService from "./SheetService";

export function newSheetService(spreadsheetId: string): SheetService {
  return new SheetService(spreadsheetId);
}
