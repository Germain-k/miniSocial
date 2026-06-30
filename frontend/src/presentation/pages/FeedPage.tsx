import { usePosts } from "../../application/hooks/usePosts";
import { useAuth } from "../../application/hooks/useAuth";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

const FeedPage = () =>{
    const {posts,loading, error,  createPost, deletePost} = usePosts();
    const {user, logout} = useAuth();

    if(loading) return <p>Loading...</p>;
    if(error) return <p style={{color:"red"}}>{error}</p>;

    return(
        <div style={{maxWidth:"600px", margin:"0 auto", padding: "1rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"1rem"}}>
                <h1>MiniSocial</h1>
                <div>
                    <span>@{user?.username}</span>
                    <button onClick={logout}style={{marginLeft:"1rem"}}>Logout</button>
                </div>
            </div>
            
            <CreatePost onCreate={createPost} />
            
            {posts.length === 0 ? (
                <p>No posts yet Follow some users to see their posts!</p>
            ):(
                posts.map((post)=> (
                    <PostCard key = {post.id} post={post} onDelete={deletePost}/>
                ))
            )}
        </div>

    );
};

export default FeedPage;