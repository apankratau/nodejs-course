import { createLogger, transports, format } from 'winston';

export const loggerOptions = {
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: 'HH:mm:ss-SSS MM-DD-YYYY' }),
    format.align(),
    format.printf(info => `${String(info.timestamp)} - ${info.level}: ${info.message}`),
  ),
  level: 'verbose',
};

const logger = createLogger(loggerOptions);

export default logger;
