import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserPlus, Eye, EyeOff } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('رمز عبور حداقل ۶ کاراکتر باشد'); return; }
    setLoading(true);
    try {
      await signup(email, password, name);
      nav('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center px-4 pt-[52px]">
      <div className="w-full max-w-md">
        <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00d4aa]/10 flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-[#00d4aa]" />
            </div>
            <h1 className="text-2xl font-bold text-white">ثبت نام</h1>
            <p className="text-[#5a6478] mt-2">حساب جدید بسازید</p>
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-red-400 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#8a94a6] text-sm mb-1.5">نام</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-[#0c1017] border border-[#1a1f2e] rounded-lg px-4 py-3 text-white placeholder-[#5a6478] focus:outline-none focus:border-[#00d4aa]/40 transition-colors"
                placeholder="نام شما" />
            </div>
            <div>
              <label className="block text-[#8a94a6] text-sm mb-1.5">ایمیل</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-[#0c1017] border border-[#1a1f2e] rounded-lg px-4 py-3 text-white placeholder-[#5a6478] focus:outline-none focus:border-[#00d4aa]/40 transition-colors"
                placeholder="email@example.com" dir="ltr" />
            </div>
            <div>
              <label className="block text-[#8a94a6] text-sm mb-1.5">رمز عبور</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full bg-[#0c1017] border border-[#1a1f2e] rounded-lg px-4 py-3 text-white placeholder-[#5a6478] focus:outline-none focus:border-[#00d4aa]/40 transition-colors"
                  placeholder="حداقل ۶ کاراکتر" dir="ltr" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-white">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#00d4aa] hover:bg-[#00b894] text-[#0a0e17] font-bold py-3 rounded-lg transition-colors disabled:opacity-50">
              {loading ? '...' : 'ثبت نام'}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-[#5a6478] text-sm">قبلاً ثبت نام کردید؟ </span>
            <Link to="/login" className="text-[#00d4aa] hover:underline text-sm font-medium">ورود</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
