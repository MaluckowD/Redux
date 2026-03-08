export class Logger {
  private static SENSITIVE_FIELDS = ['authorization', 'token', 'accessToken'];

  static sanitize(data: any) {
    if (!data || typeof data !== 'object') return data;

    const sanitized = Array.isArray(data) ? [...data] : { ...data };

    for (const key in sanitized) {
      const lowerKey = key.toLowerCase();

      if (Logger.SENSITIVE_FIELDS.includes(lowerKey)) {
        sanitized[key] = '***';
      } else if (typeof sanitized[key] === 'object') {
        sanitized[key] = Logger.sanitize(sanitized[key]);
      }
    }

    return sanitized;
  }

  static logRequest(url: string, options: any) {
    console.log('[API Request]', url, Logger.sanitize(options));
  }

  static logResponse(url: string, response: any) {
    console.log('[API Response]', url, Logger.sanitize(response));
  }

  static logError(url: string, error: any) {
    console.error('[API Error]', url, Logger.sanitize(error));
  }
}