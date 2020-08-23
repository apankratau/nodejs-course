import { app } from './app';
import { AddressInfo } from 'net';

const PORT = 4000;
const server = app.listen(PORT, '0.0.0.0', () => {
  const { port, address } = server.address() as AddressInfo;
  console.log(`Server is listening on: http://${address}:${port}`);
});
