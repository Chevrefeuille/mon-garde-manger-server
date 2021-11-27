import { object, string, number } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    amount: number({
      required_error: 'Amount is required',
    }),
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
