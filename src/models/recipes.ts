import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RecipeSchema = new Schema({
  title: { type: String },
  id: { type: String },
  ingredients: { type: [String] },
  instructions: { type: String }
});
