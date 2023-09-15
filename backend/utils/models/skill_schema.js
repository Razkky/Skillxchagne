import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { ObjectId } from 'mongodb';

const skillSchema = new Schema({
  name: String,
  category: String,
  description: String,
}, { timestamps: true });

const Skill = model('Skill', skillSchema);

export default Skill;
