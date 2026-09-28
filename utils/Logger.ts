export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const resolveLevel = (): LogLevel => {
  const configured = (process.env.LOG_LEVEL ?? 'info').toLowerCase();
  return configured in LEVEL_WEIGHT ? (configured as LogLevel) : 'info';
};

/**
 * Minimal, dependency-free structured logger.
 *
 * Never log secrets or credentials in log messages.
 */
export class Logger {
  private readonly threshold: number;

  constructor(private readonly scope: string, level: LogLevel = resolveLevel()) {
    this.threshold = LEVEL_WEIGHT[level];
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.write('debug', message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.write('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.write('warn', message, context);
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.write('error', message, context);
  }

  private write(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    if (LEVEL_WEIGHT[level] < this.threshold) {
      return;
    }
    const timestamp = new Date().toISOString();
    const suffix = context ? ` ${JSON.stringify(context)}` : '';
    const line = `[${timestamp}] [${level.toUpperCase()}] [${this.scope}] ${message}${suffix}`;

    if (level === 'error') {
      console.error(line);
    } else if (level === 'warn') {
      console.warn(line);
    } else {
      console.log(line);
    }
  }
}

/** Create a logger scoped to a page, component or test module. */
export const createLogger = (scope: string): Logger => new Logger(scope);
