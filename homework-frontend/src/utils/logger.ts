export class Logger {
  static logRequest(url: string, options: any) {
    console.log('[API Request]', url, options);
  }

  static logResponse(url: string, response: any) {
    console.log('[API Response]', url, response);
  }

  static logError(url: string, error: any) {
    console.error('[API Error]', url, error);
  }
}
