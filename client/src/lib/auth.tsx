import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useLocation } from 'wouter';

interface User {
  id: string;
  email: string;
  fullName: string;
  isPartner: boolean | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  company?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      if (data.authenticated) {
        setUser(data.user);
      }
    } catch {
      console.error('Auth check failed');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch {
      return { success: false, message: 'Network error' };
    }
  };

  const register = async (registerData: RegisterData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.message || 'Registration failed' };
    } catch {
      return { success: false, message: 'Network error' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch {
      console.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/login');
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aryo-offWhite">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
            <path d="M10 80 L40 10 L70 80" stroke="#274D8E" strokeWidth="8" strokeLinecap="square"/>
            <path d="M25 55 L55 55" stroke="#274D8E" strokeWidth="8"/>
            <rect x="75" y="50" width="6" height="30" fill="#ADD6DE" />
            <rect x="83" y="35" width="6" height="45" fill="#47B5CB" />
            <rect x="91" y="20" width="6" height="60" fill="#4EB9A7" />
          </svg>
          <div className="text-aryo-deepBlue font-sans">Authenticating...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aryo-offWhite">
        <div className="text-aryo-deepBlue font-sans">Redirecting to login...</div>
      </div>
    );
  }

  return <>{children}</>;
}

export function PartnerRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/login');
    } else if (!isLoading && user && !user.isPartner) {
      setLocation('/partner');
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aryo-offWhite">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
            <path d="M10 80 L40 10 L70 80" stroke="#274D8E" strokeWidth="8" strokeLinecap="square"/>
            <path d="M25 55 L55 55" stroke="#274D8E" strokeWidth="8"/>
            <rect x="75" y="50" width="6" height="30" fill="#ADD6DE" />
            <rect x="83" y="35" width="6" height="45" fill="#47B5CB" />
            <rect x="91" y="20" width="6" height="60" fill="#4EB9A7" />
          </svg>
          <div className="text-aryo-deepBlue font-sans">Authenticating...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aryo-offWhite">
        <div className="text-aryo-deepBlue font-sans">Redirecting to login...</div>
      </div>
    );
  }

  if (!user.isPartner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aryo-offWhite">
        <div className="text-aryo-deepBlue font-sans">Access denied. Redirecting...</div>
      </div>
    );
  }

  return <>{children}</>;
}
