import AdminDashboardPage from "@/components/AdminDashboardPage";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/post";

async function getAllPosts() {
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
  return posts.map(post => ({
    ...post,
    _id: post._id.toString(),
    // We can omit createdAt and updatedAt if not needed in the component
  }));
}

export default async function Dashboard() {
    const posts = await getAllPosts();
    return <AdminDashboardPage initialPosts={posts} />
}
