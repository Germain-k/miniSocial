import type { Post } from "../../domain/entities/Post";
import { useAuth } from "../../application/hooks/useAuth";

interface Props {
    post: Post;
    onDelete: (id: string) => void;
}

const PostCard = ({ post, onDelete}: Props) =>{
    const {user}= useAuth();
    const isAuthor = user?.id === post.authorId;

    return (
        <div style={{border:"1px solid #ccc", padding: "1rem", marginBottom:"1rem", borderRadius:"8px"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <span> ❤️ {post._count.likes}</span>
                {isAuthor &&(
                    <button onClick={() =>onDelete(post.id)} style={{color:"red"}}>Supprimer</button>
                )}
            </div>
        </div>
    );
};

export default PostCard;