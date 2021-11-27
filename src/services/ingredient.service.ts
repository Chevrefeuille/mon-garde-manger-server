import { FilterQuery, QueryOptions, DocumentDefinition } from 'mongoose';
import IngredientModel, {
  IngredientDocument,
} from '../models/ingredient.model';

export async function findIngredients() {
  return IngredientModel.find().lean();
}

export function findIngredient(
  query: FilterQuery<IngredientDocument>,
  options: QueryOptions = { lean: true },
) {
  return IngredientModel.findOne(query, {}, options);
}

export function createIngredient(
  input: DocumentDefinition<IngredientDocument>,
) {
  return IngredientModel.create(input);
}

export function findAndUpdateIngredient(
  query: FilterQuery<IngredientDocument>,
  update: DocumentDefinition<IngredientDocument>,
  options: QueryOptions,
) {
  return IngredientModel.findOneAndUpdate(query, update, options);
}

export function deleteIngredient(query: FilterQuery<IngredientDocument>) {
  return IngredientModel.deleteOne(query);
}
