import { Express, Request, Response } from 'express';
import validateRequest from './middleware';
import createUserHandler from './controller/user.controller';
import {
  createIngredientSchema,
  getIngredientSchema,
  updateIngredientSchema,
  deleteIngredientSchema,
} from './schema/ingredient.schema';
import {
  getIngredientsHandler,
  getIngredientHandler,
  createIngredientHandler,
  updateIngredientHandler,
  deleteIngredientHandler,
} from './controller/ingredient.controller';
import { createUserSchema } from './schema/user.schema';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

  // Get all the ingredients
  app.get('/api/ingredients', getIngredientsHandler);

  // Create an ingredient
  app.post(
    '/api/ingredients',
    validateRequest(createIngredientSchema),
    createIngredientHandler,
  );

  // Get an ingredient
  app.get(
    '/api/ingredients/:ingredientId',
    validateRequest(getIngredientSchema),
    getIngredientHandler,
  );

  // Update an ingredient
  app.put(
    '/api/ingredients/:ingredientId',
    validateRequest(updateIngredientSchema),
    updateIngredientHandler,
  );

  // Delete an ingredient
  app.delete(
    '/api/ingredients/:ingredientId',
    validateRequest(deleteIngredientSchema),
    deleteIngredientHandler,
  );
}
