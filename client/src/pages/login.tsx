import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      setLocation('/partner');
    } else {
      setError(result.message || 'Login failed');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-aryo-offWhite flex">
      <div className="hidden lg:flex lg:w-1/2 bg-aryo-deepBlue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 200 800" className="h-full w-full">
            <path d="M0 800 L200 0 L200 800 Z" fill="white" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col justify-center p-16">
          <div className="flex items-center gap-3 mb-12">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
              <path d="M10 80 L40 10 L70 80" stroke="white" strokeWidth="8" strokeLinecap="square"/>
              <path d="M25 55 L55 55" stroke="white" strokeWidth="8"/>
              <rect x="75" y="50" width="6" height="30" fill="#ADD6DE" />
              <rect x="83" y="35" width="6" height="45" fill="#47B5CB" />
              <rect x="91" y="20" width="6" height="60" fill="#4EB9A7" />
            </svg>
            <span className="font-sans font-extrabold text-2xl tracking-wide text-white">ARYO</span>
          </div>
          <h1 className="text-4xl font-serif text-white mb-6 leading-tight">
            Welcome to the <br/>
            <span className="text-aryo-lightBlue">Partner Portal</span>
          </h1>
          <p className="text-aryo-lightBlue/70 text-lg leading-relaxed max-w-md">
            Access exclusive resources, engagement dashboards, and collaborative tools for our valued partners.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-8 lg:p-16">
        <Link href="/" className="flex items-center gap-2 text-aryo-deepBlue hover:text-aryo-teal transition-colors mb-12 w-fit" data-testid="link-back-home">
          <ArrowLeft size={16} />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
        </Link>

        <div className="max-w-md w-full mx-auto lg:mx-0">
          <h2 className="text-3xl font-serif text-aryo-deepBlue mb-2">Partner Login</h2>
          <p className="text-slate-500 mb-8">Enter your credentials to access the partner portal</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800" data-testid="status-login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors"
                data-testid="input-login-email"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors"
                data-testid="input-login-password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-aryo-deepBlue text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1a3668] transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
              data-testid="button-login"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
              {!isLoading && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500">
            Don't have an account?{' '}
            <Link href="/register" className="text-aryo-deepBlue font-bold hover:text-aryo-teal transition-colors" data-testid="link-register">
              Request Access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
