export class Logger {
  static sanitizeOptions(options: any) {
    if (!options) return options;
    const sanitized = { ...options };

    if (sanitized.headers && sanitized.headers.Authorization) {
      sanitized.headers = { ...sanitized.headers, Authorization: '***' };
    }

    return sanitized;
  }

  static logRequest(url: string, options: any) {
    const safeOptions = Logger.sanitizeOptions(options);
    console.log('[API Request]', url, safeOptions);
  }

  static logResponse(url: string, response: any) {
    console.log('[API Response]', url, response);
  }

  static logError(url: string, error: any) {
    console.error('[API Error]', url, error);
  }
}
