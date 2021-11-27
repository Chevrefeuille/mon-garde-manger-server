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
import { createUserSchema } from './schemas/user.schema';
import { createSessionSchema } from './schemas/session.schema';
import {
  createIngredientSchema,
  getIngredientSchema,
  updateIngredientSchema,
  deleteIngredientSchema,
} from './schemas/ingredient.schema';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  // Get all the ingredients
  app.get('/api/ingredients', getIngredientsHandler);

  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler,
  );

  app.get('/api/sessions', requireUser, getUserSessionsHandler);

  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  // Create an ingredient
  app.post(
    '/api/ingredients',
    validateResource(createIngredientSchema),
    createIngredientHandler,
  );

  // Get an ingredient
  app.get(
    '/api/ingredients/:ingredientId',
    validateResource(getIngredientSchema),
    getIngredientHandler,
  );

  // Update an ingredient
  app.put(
    '/api/ingredients/:ingredientId',
    validateResource(updateIngredientSchema),
    updateIngredientHandler,
  );

  // Delete an ingredient
  app.delete(
    '/api/ingredients/:ingredientId',
    validateResource(deleteIngredientSchema),
    deleteIngredientHandler,
  );
}
