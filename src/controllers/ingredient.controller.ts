import { Request, Response } from 'express';
import { get } from 'lodash';
import {
  findIngredients,
  findIngredient,
  createIngredient,
  findAndUpdateIngredient,
  deleteIngredient,
} from '../services/ingredient.service';

export async function getIngredientsHandler(req: Request, res: Response) {
  const sessions = await findIngredients();

  return res.send(sessions);
}

export async function getIngredientHandler(req: Request, res: Response) {
  const ingredientId = get(req, 'params.ingredientId');
  const ingredient = await findIngredient({ ingredientId });

  if (!ingredient) {
    return res.sendStatus(404);
  }

  return res.send(ingredient);
}

export async function createIngredientHandler(req: Request, res: Response) {
  const requestBody = req.body;
  const post = await createIngredient({ ...requestBody });

  return res.send(post);
}

export async function updateIngredientHandler(req: Request, res: Response) {
  const ingredientId = get(req, 'params.ingredientId');
  const update = req.body;

  const ingredient = await findIngredient({ ingredientId });

  if (!ingredient) {
    return res.sendStatus(404);
  }

  const updatedIngredient = await findAndUpdateIngredient(
    { ingredientId },
    update,
    { new: true },
  );

  return res.send(updatedIngredient);
}

export async function deleteIngredientHandler(req: Request, res: Response) {
  const ingredientId = get(req, 'params.ingredientId');

  const ingredient = await findIngredient({ ingredientId });

  if (!ingredient) {
    return res.sendStatus(404);
  }

  await deleteIngredient({ ingredientId });

  return res.sendStatus(200);
}
