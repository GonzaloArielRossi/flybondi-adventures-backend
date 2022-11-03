const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_CNN).then(() => {
  console.log('DB Connected Succesfully ✅');
});

const port = process.env.PORT || 3300;

const server = app.listen(port, () => {
  console.clear();
  console.log(`Listening to port ${port} 👂`);
  console.log(`Node ENV: ${process.env.NODE_ENV} 💻`);
});

process.on('unhandledRejection', (err) => {
  console.log(
    `Unhandled rejection: ${(err.name, err.message)}, app will shut down...💥`
  );
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log(
    `Unhandled rejection: ${(err.name, err.message)}, app will shut down...💥`
  );
  server.close(() => {
    process.exit(1);
  });
});
