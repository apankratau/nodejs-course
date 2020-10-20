import expressWinston from 'express-winston';
import { loggerOptions as defaultLoggerOptions } from '../core/logger';

export default expressWinston.logger({
  ...defaultLoggerOptions,
  level: 'http',
  msg:
    '{{req.method}} {{req.url}} {{res.statusCode}} in {{res.responseTime}}ms' +
    '\n\t\t\t\t\tparams: {{JSON.stringify(req.params)}},' +
    '\n\t\t\t\t\tbody: {{JSON.stringify(req.body)}}',
});
