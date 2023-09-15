const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const skillSchema = new Schema({
  name: String,
  category: String,
  description: String,
}, { timestamps: true });

const Skill = model('Skill', skillSchema);

module.exports = Skill;
