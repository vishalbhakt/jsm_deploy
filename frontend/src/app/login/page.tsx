'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authAPI.login(form);
      const { access, refresh, user } = res.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'STUDENT') router.push('/dashboard/student');
      else if (user.role === 'TEACHER') router.push('/dashboard/teacher');
      else router.push('/dashboard/admin');
    } catch (err: unknown) {
      const e = err as { response?: { data?: { detail?: string } } };
      setError(e?.response?.data?.detail || 'Invalid credentials or account pending approval.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #06101f 0%, #0a1628 50%, #122040 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      {/* Orbs */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,162,39,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,58,107,0.4) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '420px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', color: 'var(--navy)', margin: '0 auto 12px' }}>JSM</div>
          <h1 style={{ color: '#fff', fontFamily: 'Newsreader, serif', fontSize: '26px', marginBottom: '4px' }}>Welcome Back</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Sign in to your school portal</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#fca5a5', fontSize: '14px' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Username', key: 'username', type: 'text', placeholder: 'Enter your username' },
            { label: 'Password', key: 'password', type: 'password', placeholder: 'Enter your password' },
          ].map((f) => (
            <div key={f.key} style={{ marginBottom: '16px' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>{f.label}</label>
              <input
                type={f.type} placeholder={f.placeholder} required value={(form as Record<string, string>)[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', outline: 'none', transition: 'border 0.2s' }}
              />
            </div>
          ))}

          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--navy)', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '16px', cursor: loading ? 'wait' : 'pointer', marginTop: '8px' }}>
            {loading ? '⏳ Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 700 }}>Register here</Link>
          </p>
          <p style={{ marginTop: '12px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '10px' }}>
          <p style={{ color: 'var(--gold)', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>🔑 Demo Admin Credentials:</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Username: <strong style={{ color: '#fff' }}>admin</strong></p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Password: <strong style={{ color: '#fff' }}>admin123</strong></p>
        </div>
      </motion.div>
    </div>
  );
}
