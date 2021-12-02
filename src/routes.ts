import { Express, Request, Response } from 'express';
import authorizeUser from './middlewares/authorizeUser';
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

  app.get(
    '/api/sessions',
    authorizeUser('session:list'),
    getUserSessionsHandler,
  );

  app.delete(
    '/api/sessions',
    authorizeUser('session:delete'),
    deleteSessionHandler,
  );

  // Get all the ingredients
  app.get(
    '/api/ingredients',
    authorizeUser('ingredient:list'),
    getIngredientsHandler,
  );

  // Create an ingredient
  app.post(
    '/api/ingredients',
    [
      authorizeUser('ingredient:create'),
      validateResource(createIngredientSchema),
    ],
    createIngredientHandler,
  );

  // Get an ingredient
  app.get(
    '/api/ingredients/:ingredientId',
    [authorizeUser('ingredient:read'), validateResource(getIngredientSchema)],
    getIngredientHandler,
  );

  // Update an ingredient
  app.put(
    '/api/ingredients/:ingredientId',
    [
      authorizeUser('ingredient:update'),
      validateResource(updateIngredientSchema),
    ],
    updateIngredientHandler,
  );

  // Delete an ingredient
  app.delete(
    '/api/ingredients/:ingredientId',
    [
      authorizeUser('ingredient:delete'),
      validateResource(deleteIngredientSchema),
    ],
    deleteIngredientHandler,
  );

  // Get all the ingredient instances
  app.get(
    '/api/ingredient-instances',
    authorizeUser('ingredient-instance:list'),
    getIngredientInstancesHandler,
  );

  // Create an ingredient instance
  app.post(
    '/api/ingredient-instances',
    [
      authorizeUser('ingredient-instance:create'),
      validateResource(createIngredientInstanceSchema),
    ],
    createIngredientInstanceHandler,
  );

  // Get an ingredient instance
  app.get(
    '/api/ingredient-instances/:ingredientInstanceId',
    [
      authorizeUser('ingredient-instance:read'),
      validateResource(getIngredientInstanceSchema),
    ],
    getIngredientInstanceHandler,
  );

  // Update an ingredient instance
  app.put(
    '/api/ingredient-instances/:ingredientInstanceId',
    [
      authorizeUser('ingredient-instance:update'),
      validateResource(updateIngredientInstanceSchema),
    ],
    updateIngredientInstanceHandler,
  );

  // Delete an ingredient
  app.delete(
    '/api/ingredient-instances/:ingredientInstanceId',
    [
      authorizeUser('ingredient-instance:delete'),
      validateResource(deleteIngredientInstanceSchema),
    ],
    deleteIngredientInstanceHandler,
  );
}
