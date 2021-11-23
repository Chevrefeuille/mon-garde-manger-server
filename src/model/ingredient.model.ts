import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

export interface IngredientDocument extends mongoose.Document {
  name: string;
  amount: number;
}

const IngredientSchema = new mongoose.Schema(
  {
    ingredientId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    name: { type: String, default: true },
    amount: { type: Number },
  },
  { timestamps: true },
);

const Ingredient = mongoose.model<IngredientDocument>('Ingredient', IngredientSchema);

export default Ingredient;
