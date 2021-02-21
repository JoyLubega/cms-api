const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mongouser:iamfree@cluster0.uqtyp.mongodb.net/ElpisDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
