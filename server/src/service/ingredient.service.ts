import {
  FilterQuery,
  QueryOptions,
  DocumentDefinition,
} from 'mongoose';
import Ingredient, { IngredientDocument } from '../model/ingredient.model';

export async function findIngredients() {
  return Ingredient.find().lean();
}

export function findIngredient(
  query: FilterQuery<IngredientDocument>,
  options: QueryOptions = { lean: true },
) {
  return Ingredient.findOne(query, {}, options);
}

export function createIngredient(input: DocumentDefinition<IngredientDocument>) {
  return Ingredient.create(input);
}

export function findAndUpdateIngredient(
  query: FilterQuery<IngredientDocument>,
  update: DocumentDefinition<IngredientDocument>,
  options: QueryOptions,
) {
  return Ingredient.findOneAndUpdate(query, update, options);
}

export function deleteIngredient(query: FilterQuery<IngredientDocument>) {
  return Ingredient.deleteOne(query);
}
