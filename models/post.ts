import mongoose, { Document, Schema, models } from 'mongoose';

export interface IPost extends Document {
  title: string;
  excerpt: string;
  imageUrl: string;
  // FIX: Added `createdAt` and `updatedAt` to the interface to match the Mongoose schema's `timestamps: true` option.
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, {
  timestamps: true
});

// FIX: Cast `models.Post` to the correct type to resolve a TypeScript error where static
// model methods like `.find()` were not callable. This ensures `Post` has a consistent
// type instead of an ambiguous union type.
const Post = (models.Post as mongoose.Model<IPost>) || mongoose.model<IPost>('Post', PostSchema);
export default Post;
