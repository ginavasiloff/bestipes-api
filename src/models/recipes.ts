import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RecipeSchema = new Schema({
  name: String,
  id: String,
  ingredients: [{ name: String, quantity: String, details: String }],
  instructions: String
});
