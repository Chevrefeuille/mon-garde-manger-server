import { object, number, string, z, TypeOf } from 'zod';
import ingredientInstanceEnums from '../enums/ingredientInstance.enum';

const payload = {
  body: object({
    ingredient: string({
      required_error: 'ingredient is required',
    }),
    status: z.enum(ingredientInstanceEnums.status),
    amount: number({
      required_error: 'Amount is required',
    }),
  }),
};

const params = {
  params: object({
    ingredientInstanceId: string({
      required_error: 'ingredientInstanceId is required',
    }),
  }),
};

export const createIngredientInstanceSchema = object({
  ...payload,
});

export const updateIngredientInstanceSchema = object({
  ...payload,
  ...params,
});

export const deleteIngredientInstanceSchema = object({
  ...params,
});

export const getIngredientInstanceSchema = object({
  ...params,
});

export type CreateIngredientInstanceInput = TypeOf<
  typeof createIngredientInstanceSchema
>;
export type UpdateIngredientInstanceInput = TypeOf<
  typeof updateIngredientInstanceSchema
>;
export type ReadIngredientInstanceInput = TypeOf<
  typeof getIngredientInstanceSchema
>;
export type DeleteIngredientInstanceInput = TypeOf<
  typeof deleteIngredientInstanceSchema
>;
