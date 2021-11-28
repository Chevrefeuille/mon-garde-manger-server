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
  const sessions = await findIngredientInstances();

  return res.send(sessions);
}

export async function getIngredientInstanceHandler(
  req: Request<UpdateIngredientInstanceInput['params']>,
  res: Response,
) {
  const IngredientInstanceId = get(req, 'params.ingredientInstanceId');
  const IngredientInstance = await findIngredientInstanceById(
    IngredientInstanceId,
  );

  if (!IngredientInstance) {
    return res.sendStatus(404);
  }

  return res.send(IngredientInstance);
}

export async function createIngredientInstanceHandler(
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    CreateIngredientInstanceInput['body']
  >,
  res: Response,
) {
  const requestBody = req.body;

  const ingredientId = get(req, 'body.ingredient');

  const ingredient = await findIngredientById(ingredientId);
  if (!ingredient) {
    return res.status(400).send('Ingredient does not exist');
  }

  const post = await createIngredientInstance({ ...requestBody });

  return res.send(post);
}

export async function updateIngredientInstanceHandler(
  req: Request<UpdateIngredientInstanceInput['params']>,
  res: Response,
) {
  const IngredientInstanceId = get(req, 'params.ingredientInstanceId');
  const update = req.body;

  const IngredientInstance = await findIngredientInstanceById(
    IngredientInstanceId,
  );

  if (!IngredientInstance) {
    return res.sendStatus(404);
  }

  const ingredientId = get(req, 'body.ingredient');

  const ingredient = await findIngredientById(ingredientId);
  if (!ingredient) {
    return res.status(400).send('Ingredient does not exist');
  }

  const updatedIngredientInstance = await findAndUpdateIngredientInstance(
    { IngredientInstanceId },
    update,
    { new: true },
  );

  return res.send(updatedIngredientInstance);
}

export async function deleteIngredientInstanceHandler(
  req: Request<UpdateIngredientInstanceInput['params']>,
  res: Response,
) {
  const IngredientInstanceId = get(req, 'params.ingredientInstanceId');

  const IngredientInstance = await findIngredientInstanceById(
    IngredientInstanceId,
  );

  if (!IngredientInstance) {
    return res.sendStatus(404);
  }

  await deleteIngredientInstance({ IngredientInstanceId });

  return res.sendStatus(200);
}
