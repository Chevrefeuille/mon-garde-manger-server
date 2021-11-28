import { Express, Request, Response } from 'express';
import requireUser from './middlewares/requireUser';
import validateResource from './middlewares/validateResource';
import createUserHandler from './controllers/user.controller';
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from './controllers/session.controller';
import {
  getIngredientsHandler,
  getIngredientHandler,
  createIngredientHandler,
  updateIngredientHandler,
  deleteIngredientHandler,
} from './controllers/ingredient.controller';
import {
  getIngredientInstancesHandler,
  getIngredientInstanceHandler,
  createIngredientInstanceHandler,
  updateIngredientInstanceHandler,
  deleteIngredientInstanceHandler,
} from './controllers/ingredientInstance.controller';
import { createUserSchema } from './schemas/user.schema';
import { createSessionSchema } from './schemas/session.schema';
import {
  createIngredientSchema,
  getIngredientSchema,
  updateIngredientSchema,
  deleteIngredientSchema,
} from './schemas/ingredient.schema';
import {
  createIngredientInstanceSchema,
  getIngredientInstanceSchema,
  updateIngredientInstanceSchema,
  deleteIngredientInstanceSchema,
} from './schemas/ingredientInstance.schema';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler,
  );

  app.get('/api/sessions', requireUser, getUserSessionsHandler);

  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  // Get all the ingredients
  app.get('/api/ingredients', requireUser, getIngredientsHandler);

  // Create an ingredient
  app.post(
    '/api/ingredients',
    [requireUser, validateResource(createIngredientSchema)],
    createIngredientHandler,
  );

  // Get an ingredient
  app.get(
    '/api/ingredients/:ingredientId',
    [requireUser, validateResource(getIngredientSchema)],
    getIngredientHandler,
  );

  // Update an ingredient
  app.put(
    '/api/ingredients/:ingredientId',
    [requireUser, validateResource(updateIngredientSchema)],
    updateIngredientHandler,
  );

  // Delete an ingredient
  app.delete(
    '/api/ingredients/:ingredientId',
    [requireUser, validateResource(deleteIngredientSchema)],
    deleteIngredientHandler,
  );

  // Get all the ingredients
  app.get(
    '/api/ingredient-instances',
    requireUser,
    getIngredientInstancesHandler,
  );

  // Create an ingredient
  app.post(
    '/api/ingredient-instances',
    [requireUser, validateResource(createIngredientInstanceSchema)],
    createIngredientInstanceHandler,
  );

  // Get an ingredient
  app.get(
    '/api/ingredient-instances/:ingredientInstanceId',
    [requireUser, validateResource(getIngredientInstanceSchema)],
    getIngredientInstanceHandler,
  );

  // Update an ingredient
  app.put(
    '/api/ingredient-instances/:ingredientInstanceId',
    [requireUser, validateResource(updateIngredientInstanceSchema)],
    updateIngredientInstanceHandler,
  );

  // Delete an ingredient
  app.delete(
    '/api/ingredient-instances/:ingredientInstanceId',
    [requireUser, validateResource(deleteIngredientInstanceSchema)],
    deleteIngredientInstanceHandler,
  );
}
