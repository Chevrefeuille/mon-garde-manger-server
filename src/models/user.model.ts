import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import RoleModel, { RoleDocument } from './role.model';

export interface UserInput {
  email: string;
  name: string;
  password: string;
  roles: RoleDocument['_id'][];
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  hasPermission(permission: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

userSchema.methods.hasPermission = async function (
  permission: string,
): Promise<boolean> {
  const user = this as UserDocument;
  const rolesPromises = user.roles.map(async (roleId) => {
    const role = await RoleModel.findOne({ _id: roleId });
    if (!role) {
      return false;
    }
    return role.hasPermission(permission);
  });

  return Promise.all(rolesPromises).then((values) => {
    return values.some((e) => e);
  });
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
