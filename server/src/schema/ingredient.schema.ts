import { object, string, number } from 'yup';

const payload = {
  body: object({
    name: string().required('Name is required'),
    amount: number().required('Amount is required'),
  }),
};

const params = {
  params: object({
    ingredientId: string().required('ingredientId is required'),
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
