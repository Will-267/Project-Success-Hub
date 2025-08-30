import BlogPostForm from "@/components/BlogPostForm";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/post";
import { notFound } from "next/navigation";

async function getPostById(id: string) {
    await dbConnect();
    try {
        const post = await Post.findById(id).lean();
        if (!post) return null;
        return { ...post, _id: post._id.toString() };
    } catch (error) {
        // Invalid ObjectId format
        return null;
    }
}

export default async function EditPostPage({ params }: { params: { postId: string } }) {
    const post = await getPostById(params.postId);

    if (!post) {
        notFound();
    }

    return <BlogPostForm post={post} />
}
