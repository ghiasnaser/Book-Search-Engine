const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks');
//mongoose.connect(`mongodb+srv://ghiasnaser:Joseph%402017@cluster0.zthxmka.mongodb.net/googlebooks?retryWrites=true&w=majority` || 'mongodb://localhost/googlebooks');
module.exports = mongoose.connection;
