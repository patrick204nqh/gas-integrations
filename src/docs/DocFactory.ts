import DocService from "./DocService";

export function newDocService(documentId: string): DocService {
  return new DocService(documentId);
}
