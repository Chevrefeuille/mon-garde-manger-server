import UserModel, { UserInput, UserDocument } from '../models/user.model';
import { FilterQuery } from 'mongoose';
import { omit } from 'lodash';

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<boolean | any> {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}

export async function findUser(
  query: FilterQuery<UserDocument>,
): Promise<UserDocument | null> {
  return UserModel.findOne(query);
}

export async function findUserInput(
  query: FilterQuery<UserDocument>,
): Promise<UserInput> {
  return UserModel.findOne(query).lean();
}
