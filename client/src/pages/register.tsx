import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    const result = await register(formData);
    
    if (result.success) {
      setLocation('/partner');
    } else {
      setError(result.message || 'Registration failed');
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
          <div className="mb-12">
            <img src="/api/aryo-logo" alt="ARYO Consulting Group" width={48} height={48} className="object-contain" />
          </div>
          <h1 className="text-4xl font-serif text-white mb-6 leading-tight">
            Join Our <br/>
            <span className="text-aryo-lightBlue">Partner Network</span>
          </h1>
          <p className="text-aryo-lightBlue/70 text-lg leading-relaxed max-w-md">
            Gain access to exclusive engagement resources, real-time dashboards, and collaborative tools designed for strategic partnership.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-8 lg:p-16 overflow-y-auto">
        <Link href="/" className="flex items-center gap-2 text-aryo-deepBlue hover:text-aryo-teal transition-colors mb-8 w-fit" data-testid="link-back-home">
          <ArrowLeft size={16} />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
        </Link>

        <div className="max-w-md w-full mx-auto lg:mx-0">
          <h2 className="text-3xl font-serif text-aryo-deepBlue mb-2">Request Partner Access</h2>
          <p className="text-slate-500 mb-8">Create your account to join the partner portal</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800" data-testid="status-register-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors"
                  data-testid="input-register-fullname"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Username</label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors"
                  data-testid="input-register-username"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Corporate Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors"
                data-testid="input-register-email"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors"
                data-testid="input-register-company"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors"
                  data-testid="input-register-password"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors"
                  data-testid="input-register-confirm-password"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-aryo-deepBlue text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1a3668] transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
              data-testid="button-register"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
              {!isLoading && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-aryo-deepBlue font-bold hover:text-aryo-teal transition-colors" data-testid="link-login">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
