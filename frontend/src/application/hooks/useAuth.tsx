import { createContext,useContext,useState, type ReactNode } from "react";
import { type AuthUser } from "../../domain/entities/User";
import { authApi } from "../../infrastructure/api/authApi";

interface AuthContextType {
        user: AuthUser["user"] | null;
        token: string| null;
        login:  (email: string, password: string) => Promise<void>;
        register: (email: string, username:string,password: string)=> Promise<void>;
        logout: () => void;
        isAuthenticated: boolean;
}

//crée le contexte avec undefined par défaut
const AuthContext = createContext<AuthContextType |undefined>(undefined);

//Provider - enveloppe l'app et fournit le contexte
export const AuthProvider = ({children}: {children: ReactNode}) =>{
    const [user,setUser] = useState<AuthUser["user"] | null>(()=>{
        //Récupére l'utilisateur depuis localStorage au démarrage
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const [token, setToken] = useState<string | null>(()=> {
        return localStorage.getItem("token");
    });

    const login = async(email: string, password:string): Promise<void> => {
        const data = await authApi.login({email,password});
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
    };

    const register= async (email:string, username:string, password:string): Promise<void> =>{
        await authApi.register({email,username,password});

        //Aprèsinscription on connecte automatiquement
        await login(email,password);
    };

    const logout = (): void => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return(
        <AuthContext.Provider value={{user, token, login, register,logout, isAuthenticated:!!token}}>
            {children}
        </AuthContext.Provider>
    );
};

//Hook custom pour consommer le contexte facilement
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used withinan AuthProvider");
    }
    return context;
};