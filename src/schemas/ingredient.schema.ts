import { object, string, TypeOf, z } from 'zod';
import ingredientEnums from '../enums/ingredient.enum';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    type: z.enum(ingredientEnums.types),
    unit: z.enum(ingredientEnums.units),
  }),
};

const params = {
  params: object({
    ingredientId: string({
      required_error: 'ingredientId is required',
    }),
  }),
};

export const getIngredientSchema = object({
  ...params,
});

export const createIngredientSchema = object({
  ...payload,
});

export const updateIngredientSchema = object({
  ...params,
  ...payload,
});

export const deleteIngredientSchema = object({
  ...params,
});

export type CreateIngredientInput = TypeOf<typeof createIngredientSchema>;
export type UpdateIngredientInput = TypeOf<typeof updateIngredientSchema>;
export type ReadIngredientInput = TypeOf<typeof getIngredientSchema>;
export type DeleteIngredientInput = TypeOf<typeof deleteIngredientSchema>;
