'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', first_name: '', last_name: '', phone: '', password: '', password2: '', role: 'STUDENT' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password2) { setError("Passwords don't match!"); return; }
    setLoading(true); setError('');
    try {
      await authAPI.register(form);
      setSuccess(true);
    } catch (err: unknown) {
      const e = err as { response?: { data?: Record<string, string[]> } };
      const data = e?.response?.data;
      setError(data ? Object.values(data).flat().join(', ') : 'Registration failed.');
    } finally { setLoading(false); }
  };

  const fields = [
    { label: 'First Name', key: 'first_name', type: 'text' },
    { label: 'Last Name', key: 'last_name', type: 'text' },
    { label: 'Username', key: 'username', type: 'text' },
    { label: 'Email', key: 'email', type: 'email' },
    { label: 'Phone', key: 'phone', type: 'tel' },
    { label: 'Password', key: 'password', type: 'password' },
    { label: 'Confirm Password', key: 'password2', type: 'password' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #06101f 0%, #0a1628 50%, #122040 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '500px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px', color: 'var(--navy)', margin: '0 auto 12px' }}>JSM</div>
          <h1 style={{ color: '#fff', fontFamily: 'Newsreader, serif', fontSize: '24px', marginBottom: '4px' }}>Create Account</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Register to access the school portal</p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h3 style={{ color: '#fff', fontFamily: 'Newsreader, serif', marginBottom: '12px' }}>Registration Successful!</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px', fontSize: '14px' }}>Your account is pending admin approval. You will be notified once approved.</p>
            <Link href="/login" style={{ background: 'var(--gold)', color: 'var(--navy)', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>Go to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '10px', padding: '12px', marginBottom: '16px', color: '#fca5a5', fontSize: '13px' }}>⚠️ {error}</div>}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>I am a</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'var(--navy)', color: '#fff', fontSize: '14px' }}>
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Teacher</option>
                <option value="PARENT">Parent</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {fields.map((f) => (
                <div key={f.key} style={{ gridColumn: ['username', 'email', 'phone', 'password', 'password2'].includes(f.key) ? 'span 2' : 'span 1' }}>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>{f.label}</label>
                  <input type={f.type} required value={(form as Record<string, string>)[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', outline: 'none' }} />
                </div>
              ))}
            </div>

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--navy)', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '16px', cursor: loading ? 'wait' : 'pointer', marginTop: '20px' }}>
              {loading ? 'Creating Account...' : 'Register →'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '16px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 700 }}>Sign in</Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
