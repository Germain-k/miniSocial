import { useState, useEffect } from "react";
import type { Post } from "../../domain/entities/Post";
import { postApi } from "../../infrastructure/api/postApi";

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    
    const createPost = async (content: string) => {
        const newPost = await postApi.createPost(content);
        //Ajouter le nouveau post en haut de la liste sans refetch
        setPosts((prev)=> [newPost, ...prev]);
    };

    const deletePost  = async (id: string) => {
        await postApi.deletePost(id);
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };
    useEffect(() => {
        const fetchFeed = async ()  => {
        try {
            setloading(true);
            const data = await postApi.getFeed();
            setPosts(data);
        }catch{
            setError("Failed to load posts");
        } finally {
            setloading(false);
        }
    };
        fetchFeed();
    }, []);

    return {posts, loading, error, createPost, deletePost};

};