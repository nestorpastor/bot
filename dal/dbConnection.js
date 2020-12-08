const mongoose = require('mongoose');
mongoose.connection.openUri(process.env.MONGO_DB_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if (err) throw err;
});

