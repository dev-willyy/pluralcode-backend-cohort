const mongoose = require('mongoose');

const env = function checkEnvironment() {
  if (process.env.NODE_ENV === 'dev') return process.env.MONGODB_URI_DEV;
  return process.env.MONGODB_URI_PROD;
};

async function connectDB() {
  try {
    const isConnected = await mongoose.connect(env(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (isConnected) console.log('DB is Connected!');
  } catch (err) {
    console.error('Error in connection: ', err);
  }
}

function isDBDisconnected() {
  mongoose.connection.on('disconnected', (err) => {
    if (err) console.error('Error in DB disconnection: ', err);
    console.log('MongoDB Disconnected!');
  });
}

module.exports = { connectDB, isDBDisconnected };
