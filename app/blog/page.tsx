import BlogPage from '@/components/BlogPage';
import dbConnect from '@/lib/mongodb';
import Post, { IPost } from '@/models/post';

async function getAllPosts() {
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
  return posts.map(post => ({
    ...post,
    _id: post._id.toString(),
  }));
}

export default async function Blog() {
  const posts = await getAllPosts();
  return <BlogPage blogPosts={posts} />;
}
