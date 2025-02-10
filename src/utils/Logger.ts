export function logInfo(message: string): void {
    Logger.log(`[INFO] ${message}`);
}

export function logWarn(message: string): void {
    Logger.log(`[WARN] ${message}`);
}

export function logError(message: string, stack?: string): void {
    Logger.log(`[ERROR] ${message} ${stack ? '\n' + stack : ''}`);
}