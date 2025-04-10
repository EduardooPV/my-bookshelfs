import chalk from 'chalk';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const formatMessage = (level: LogLevel, message: string) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
};

const log = (level: LogLevel, message: string) => {
  const formatted = formatMessage(level, message);

  switch (level) {
    case 'info':
      console.log(chalk.blue(formatted));
      break;
    case 'warn':
      console.warn(chalk.yellow(formatted));
      break;
    case 'error':
      console.error(chalk.red(formatted));
      break;
    case 'debug':
      console.debug(chalk.gray(formatted));
      break;
  }
};

const logger = {
  info: (msg: string) => log('info', msg),
  warn: (msg: string) => log('warn', msg),
  error: (msg: string) => log('error', msg),
  debug: (msg: string) => log('debug', msg),
};

export { logger };
