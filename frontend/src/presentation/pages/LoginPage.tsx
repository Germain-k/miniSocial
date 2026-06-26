import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../application/hooks/useAuth";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); //empeche le rechargement de la page
        setError("");
        setLoading(true);

        try{
            await login(email, password);
            navigate("/");//redirige vers le fil d'actualite
        }catch{
            setError("Invalid email or password");
        }finally{
            setLoading(false);
        }
    };
    
    return (
        <div>
            <h1>Connectez-Vous à MiniSocial</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input  type="email" 
                            name="email" 
                            id="email" 
                            value={email} 
                            onChange={(e)=> setEmail(e.target.value)}  
                            required/>
                </div>
                <div>
                    <label htmlFor="password">PassWord</label>
                    <input 
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            required />
                </div>
                {error && <p style={{color: "red"}}>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in...": "Login"}
                </button>

            </form>

            <p>Vous n'avez pas de compte ? <Link to ="/register">Inscrivez-Vous</Link>
            </p>
        </div>
    );
};

export default LoginPage;