import { FilterQuery, QueryOptions, DocumentDefinition } from 'mongoose';
import IngredientInstanceModel, {
  IngredientInstanceDocument,
  IngredientInstanceInput,
} from '../models/IngredientInstance.model';

export async function findIngredientInstances(
  query: FilterQuery<IngredientInstanceDocument>,
) {
  return IngredientInstanceModel.find(query).lean();
}

export function findIngredientInstance(
  query: FilterQuery<IngredientInstanceDocument>,
  options: QueryOptions = { lean: true },
) {
  return IngredientInstanceModel.findOne(query, {}, options);
}

export function findIngredientInstanceById(
  query: FilterQuery<IngredientInstanceDocument>,
  options: QueryOptions = { lean: true },
) {
  return IngredientInstanceModel.findById(query, {}, options);
}

export function createIngredientInstance(input: IngredientInstanceInput) {
  return IngredientInstanceModel.create(input);
}

export function findAndUpdateIngredientInstance(
  query: FilterQuery<IngredientInstanceDocument>,
  update: DocumentDefinition<IngredientInstanceDocument>,
  options: QueryOptions,
) {
  return IngredientInstanceModel.findOneAndUpdate(query, update, options);
}

export function deleteIngredientInstance(
  query: FilterQuery<IngredientInstanceDocument>,
) {
  return IngredientInstanceModel.deleteOne(query);
}
