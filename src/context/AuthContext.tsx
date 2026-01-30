import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  // Add other claims as needed
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<User>(storedToken);
        // extensive check for expiration could be added here
        // const isExpired = decoded.exp * 1000 < Date.now();
        // if (isExpired) throw new Error("Expired");
        setUser(decoded);
        setToken(storedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // START: MOCK IMPLEMENTATION FOR DEMO
    // Remove this block when backend is ready
    if (email) {
      console.log('Logging in with', email, password);
      // Create a dummy JWT structure (base64 encoded JSON)
      // This is JUST for demo purposes to make jwt-decode work without a real backend
      const dummyPayload = {
        id: '123',
        email,
        name: 'Demo User',
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
      };
      
      // Minimal implementation of a JWT
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(JSON.stringify(dummyPayload));
      const signature = "dummy_signature";
      const dummyToken = `${header}.${payload}.${signature}`;

      localStorage.setItem('token', dummyToken);
      setToken(dummyToken);
      setUser(dummyPayload as User);
      return; 
    }
    // END: MOCK IMPLEMENTATION
    
    // Real implementation:
    /*
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    const decoded = jwtDecode<User>(token);
    setUser(decoded);
    setToken(token);
    */
  };

  const register = async (email: string, password: string, name: string) => {
     // Mock register
     console.log("Registered", email, password, name);
     await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      register, 
      logout,
      isAuthenticated: !!user,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
