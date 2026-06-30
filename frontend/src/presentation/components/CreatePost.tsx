import { useState, type FormEvent } from "react";

interface Props {
    onCreate: (content: string) => Promise<void>;
}

const CreatePost = ({onCreate}: Props) => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        try {
            await onCreate(content);
            setContent(""); //vider le champ après création
        }  finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{marginBottom:"2rem"}}>
            <textarea value={content}
            onChange={(e) =>  setContent(e.target.value)}
            placeholder="Partagez votre pensée !"
            maxLength={280}
            rows={3}
            style={{width:"100%", padding:"0.5rem"}}
            />
            <div style={{display:"flex", justifyContent:"space-between", marginTop:"0.5rem"}}>
                <small>{content.length/280}</small>
                <button type="submit" disabled={loading || !content.trim()}>
                    {loading ? "Posting...": "Post"}
                </button>
            </div>
        </form>
    );
};

export default CreatePost;