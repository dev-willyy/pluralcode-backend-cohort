const mongoose = require('mongoose');

async function connectDB() {
  try {
    const isConnected = await mongoose.connect(process.env.MONGODB_URI_DEV, {
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
