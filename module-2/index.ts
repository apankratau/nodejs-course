import { app } from './app';
import { PORT } from './consts';

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});
