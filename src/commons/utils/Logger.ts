export class Logger {
  private static _do(method: keyof Console, ...rest: unknown[]) {
    if (process.env.REACT_APP_DEPLOY_ENV !== 'prod') {
      // eslint-disable-next-line no-console
      console[method].apply(this, rest);
    }
  }

  static log(topic: string, action: string, ...rest: unknown[]) {
    Logger._do('log', `[${topic}][${action}]`, ...rest);
  }

  static info(topic: string, action: string, ...rest: unknown[]) {
    Logger._do('info', `[${topic}][${action}]`, ...rest);
  }

  static warn(topic: string, action: string, ...rest: unknown[]) {
    Logger._do('warn', `[${topic}][${action}]`, ...rest);
  }

  static error(topic: string, action: string, ...rest: unknown[]) {
    // eslint-disable-next-line no-console
    console.error(`[${topic}][${action}]`, ...rest);
  }

  static debug(...args: unknown[]) {
    Logger._do('debug', ...args);
  }
}
