import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  gender: 'male' | 'female';
  birth_date: Date;
  death_date: Date;
  avatar: string;
  spouse_ids: mongoose.Types.ObjectId[];
  children_ids: mongoose.Types.ObjectId[];
  spouses: IUser[];
  children: IUser[];
  is_deleted: boolean;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  birth_date: {
    type: Date,
    required: true
  },
  death_date: {
    type: Date,
    required: false
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  spouse_ids: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  children_ids: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for spouses
userSchema.virtual('spouses', {
  ref: 'User',
  localField: 'spouse_ids',
  foreignField: '_id'
});

// Virtual populate for children
userSchema.virtual('children', {
  ref: 'User',
  localField: 'children_ids',
  foreignField: '_id'
});

export default mongoose.model<IUser>('User', userSchema);
