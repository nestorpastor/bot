var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  avatar: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);