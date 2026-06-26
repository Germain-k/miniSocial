import apiClient from "./apiClient";
import type { Post } from "../../domain/entities/Post";

export const postApi = {
    getFeed: async(): Promise<Post[]>  => {
        const response = await apiClient.get<{ posts: Post[]}>("/posts/feed");
        return response.data.posts;
    },

    createPost: async (content: string): Promise<Post> => {
        const response = await apiClient.post<{post:Post}>("/posts",{content});
        return response.data.post;
    },

    deletePost: async (id:  string): Promise<void> => {
        await apiClient.delete(`/posts/${id}`);
    },
};    