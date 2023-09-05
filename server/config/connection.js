const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks');
//mongoose.connect(`mongodb+srv://ghiasnaser:5cVCa6x5hdqlz4SA@cluster0.zthxmka.mongodb.net/googlebooks?retryWrites=true&w=majority` || 'mongodb://localhost/googlebooks');
//mongodb+srv://ghiasnaser:5cVCa6x5hdqlz4SA@cluster1.iffixfq.mongodb.net/googlebooks?retryWrites=true&w=majority
module.exports = mongoose.connection;
