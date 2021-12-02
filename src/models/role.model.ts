import mongoose from 'mongoose';
import PermissionModel, { PermissionDocument } from './permission.model';

export interface RoleDocument extends mongoose.Document {
  name: string;
  permissions: PermissionDocument['_id'][];
  hasPermission(permission: string): Promise<boolean>;
}

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission',
    },
  ],
});

roleSchema.methods.hasPermission = async function (
  permission: string,
): Promise<boolean> {
  const role = this as RoleDocument;
  const permissionsPromises = role.permissions.map(async (rolePermissionId) => {
    const rolePermission = await PermissionModel.findOne({
      _id: rolePermissionId,
    });
    if (!rolePermission) {
      return false;
    }
    return rolePermission.name === permission;
  });
  return Promise.all(permissionsPromises).then((values) => {
    return values.some((e) => e);
  });
};

const RoleModel = mongoose.model<RoleDocument>('Role', roleSchema);

export default RoleModel;
