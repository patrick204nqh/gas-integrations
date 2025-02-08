export default class Helpers {
  /**
   * Logs a message using Logger.
   * @param message The message to log.
   */
  static log(message: string): void {
    Logger.log(message);
  }

  /**
   * Logs an error and rethrows it.
   * @param e The error to handle.
   */
  static handleError(e: Error): never {
    Logger.log("Error: " + e.toString());
    throw e;
  }
}
