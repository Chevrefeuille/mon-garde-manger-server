import { Request, Response } from 'express';
import { get } from 'lodash';
import {
  findIngredientInstances,
  findIngredientInstanceById,
  createIngredientInstance,
  findAndUpdateIngredientInstance,
  deleteIngredientInstance,
} from '../services/IngredientInstance.service';
import { findIngredientById } from '../services/Ingredient.service';
import {
  CreateIngredientInstanceInput,
  UpdateIngredientInstanceInput,
} from '../schemas/IngredientInstance.schema';

export async function getIngredientInstancesHandler(
  req: Request,
  res: Response,
) {
  const userId = res.locals.user._id;
  const sessions = await findIngredientInstances({ user: userId });

  return res.send(sessions);
}

export async function getIngredientInstanceHandler(
  req: Request<UpdateIngredientInstanceInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id;

  const ingredientInstanceId = get(req, 'params.ingredientInstanceId');
  const ingredientInstance = await findIngredientInstanceById(
    ingredientInstanceId,
  );

  if (!ingredientInstance) {
    return res.sendStatus(404);
  }

  if (String(ingredientInstance.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(ingredientInstance);
}

export async function createIngredientInstanceHandler(
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    CreateIngredientInstanceInput['body']
  >,
  res: Response,
) {
  const userId = res.locals.user._id;

  const requestBody = req.body;

  const ingredientId = get(req, 'body.ingredient');

  const ingredient = await findIngredientById(ingredientId);
  if (!ingredient) {
    return res.status(400).send('Ingredient does not exist');
  }

  const post = await createIngredientInstance({ ...requestBody, user: userId });

  return res.send(post);
}

export async function updateIngredientInstanceHandler(
  req: Request<UpdateIngredientInstanceInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id;

  const ingredientInstanceId = get(req, 'params.ingredientInstanceId');
  const update = req.body;

  const ingredientInstance = await findIngredientInstanceById(
    ingredientInstanceId,
  );

  if (!ingredientInstance) {
    return res.sendStatus(404);
  }

  if (String(ingredientInstance.user) !== userId) {
    return res.sendStatus(403);
  }

  const ingredientId = get(req, 'body.ingredient');

  const ingredient = await findIngredientById(ingredientId);
  if (!ingredient) {
    return res.status(400).send('Ingredient does not exist');
  }

  const updatedIngredientInstance = await findAndUpdateIngredientInstance(
    { ingredientInstanceId },
    update,
    { new: true },
  );

  return res.send(updatedIngredientInstance);
}

export async function deleteIngredientInstanceHandler(
  req: Request<UpdateIngredientInstanceInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id;

  const ingredientInstanceId = get(req, 'params.ingredientInstanceId');

  const ingredientInstance = await findIngredientInstanceById(
    ingredientInstanceId,
  );

  if (!ingredientInstance) {
    return res.sendStatus(404);
  }

  if (String(ingredientInstance.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteIngredientInstance({ ingredientInstanceId });

  return res.sendStatus(200);
}
