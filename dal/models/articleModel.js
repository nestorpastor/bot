var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var articlechema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User is required'] },
  title: { type: String, required: false },
  text: { type: String, required: false },
  tags: [{ type: String, required: false }]
}, { timestamps: true });

module.exports = mongoose.model('Article', articlechema);