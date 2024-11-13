import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  status: '0' | '1';
  created: Date;
  updated: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: { type: String, required: true, maxLength: 100 },
    email: { type: String, required: true, unique: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 255 },
    status: { type: String, required: true, enum: ['0', '1'] },
    created: { type: Date, required: true },
    updated: { type: Date, required: true },
  },
  { timestamps: false }
);

UserSchema.index({ email: 1 }, { unique: true, name: 'email_index' });
UserSchema.index({ status: 1 }, { name: 'status_index' });

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

const initUserModel = (): Model<IUser> => {
  return User;
};

export default initUserModel;
