import mongoose from 'mongoose';
import ingredientEnums from '../enums/ingredient.enum';

export interface IngredientInput {
  name: string;
  type: string;
  unit: string;
}

export interface IngredientDocument extends IngredientInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const IngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ingredientEnums.types,
    },
    unit: {
      type: String,
      required: true,
      enum: ingredientEnums.units,
    },
  },
  { timestamps: true },
);

const IngredientModel = mongoose.model<IngredientDocument>(
  'Ingredient',
  IngredientSchema,
);

export default IngredientModel;
