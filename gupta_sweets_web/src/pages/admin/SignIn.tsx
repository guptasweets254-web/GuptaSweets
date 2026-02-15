import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    debugger;
    setLoading(true);
    setError(null);
    try {
      const res = await signIn(email, password);
      if (!res.ok) {
        setError((await res.json()).message || 'Sign in failed');
        setLoading(false);
        return;
      }
      navigate('/admin');
    } catch (e) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron/5 to-transparent">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-border">
        <h2 className="text-2xl font-bold mb-2 text-foreground">Admin Sign In</h2>
        <p className="text-sm text-muted-foreground mb-6">Welcome back! Please sign in to your account.</p>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700 flex gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron/50"
              placeholder="admin@example.com"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron/50"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-saffron hover:bg-saffron/90 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
