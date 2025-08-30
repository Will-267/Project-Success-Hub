import HomePage from '@/components/HomePage';
import dbConnect from '@/lib/mongodb';
import Post, { IPost } from '@/models/post';

async function getRecentPosts() {
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 }).limit(3).lean();
  // lean() returns plain JS objects, not Mongoose documents.
  // We need to serialize the _id field.
  return posts.map(post => ({
    ...post,
    _id: post._id.toString(),
  }));
}


export default async function Home() {
  const recentPosts = await getRecentPosts();
  return <HomePage blogPosts={recentPosts} />;
}
