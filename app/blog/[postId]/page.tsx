import BlogPostPage from "@/components/BlogPostPage";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/post";
import { notFound } from "next/navigation";

async function getPostById(id: string) {
    await dbConnect();
    try {
        const post = await Post.findById(id).lean();
        if (!post) return null;
        return { 
            ...post, 
            _id: post._id.toString(),
            createdAt: post.createdAt.toDateString(), // Format date for display
        };
    } catch (error) {
        // Invalid ObjectId format can cause errors
        return null;
    }
}

export default async function PostPage({ params }: { params: { postId: string } }) {
    const post = await getPostById(params.postId);

    if (!post) {
        notFound();
    }

    return <BlogPostPage post={post} />
}