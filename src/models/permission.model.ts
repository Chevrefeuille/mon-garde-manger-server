import mongoose from 'mongoose';

export interface PermissionDocument extends mongoose.Document {
  name: string;
}

const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const PermissionModel = mongoose.model<PermissionDocument>(
  'Permission',
  permissionSchema,
);

export default PermissionModel;
