import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/lib/auth';
import { debug } from 'console';

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Sign In</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Email</label>
          <input required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 p-2 border rounded" />
          <label className="block mb-2">Password</label>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 border rounded" />
          <button type="submit" className="w-full p-2 bg-primary text-white rounded" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
