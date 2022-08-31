const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, () => {
  // eslint-disable-next-line no-console
  console.log('Database connected');
});
