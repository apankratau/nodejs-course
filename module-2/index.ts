import { app } from './app';
import { PORT, ON_ERROR_EXIT_CODE } from './core/constants';
import logger from './core/logger';

app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server is listening on: http://localhost:${PORT}`);
});

process.on('uncaughtException', err => {
  const message = err.message || 'Uncaught Server Exception, shutting down';
  logger.error(message);
  logger.error(err.stack);

  process.exit(ON_ERROR_EXIT_CODE);
});

process.on('unhandledRejection', err => {
  logger.error('Unhandled Promise Rejection Error, shutting down...');
  logger.error(err);

  process.exit(ON_ERROR_EXIT_CODE);
});
