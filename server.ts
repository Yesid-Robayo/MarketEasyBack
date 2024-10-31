import config from './config/config';
import app from './src/app';

const PORT = config.port;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});