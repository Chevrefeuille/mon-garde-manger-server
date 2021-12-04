import mongoose from 'mongoose';
import { IngredientDocument } from './ingredient.model';
import { UserDocument } from './user.model';
import ingredientInstanceEnums from '../enums/ingredientInstance.enum';
import ingredientEnums from '../enums/ingredient.enum';

export interface IngredientInstanceInput {
  ingredient: IngredientDocument['_id'];
  name: IngredientDocument['name'];
  type: IngredientDocument['type'];
  user: UserDocument['_id'];
  status: string;
  amount: number;
}

export interface IngredientInstanceDocument
  extends IngredientInstanceInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const IngredientInstanceSchema = new mongoose.Schema(
  {
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ingredientEnums.types,
    },
    status: {
      type: String,
      required: true,
      enum: ingredientInstanceEnums.status,
      default: 'Available',
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const IngredientInstanceModel = mongoose.model<IngredientInstanceDocument>(
  'IngredientInstance',
  IngredientInstanceSchema,
);

export default IngredientInstanceModel;
