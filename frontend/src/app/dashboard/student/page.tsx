'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { dashboardAPI, assignmentsAPI, notesAPI, videoLecturesAPI, attendanceAPI, paymentsAPI, resultsAPI } from '@/lib/api';

const navItems = [
  { icon: '🏠', label: 'Overview', section: 'overview' },
  { icon: '📝', label: 'Notes', section: 'notes' },
  { icon: '📋', label: 'Assignments', section: 'assignments' },
  { icon: '🎬', label: 'Video Lectures', section: 'videos' },
  { icon: '📅', label: 'Attendance', section: 'attendance' },
  { icon: '📊', label: 'Results', section: 'results' },
  { icon: '💳', label: 'Payments', section: 'payments' },
];

export default function StudentDashboard() {
  const [user, setUser] = useState<{ username: string; first_name: string; role: string } | null>(null);
  const [section, setSection] = useState('overview');
  const [stats, setStats] = useState<Record<string, unknown>>({});
  const [data, setData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) { router.push('/login'); return; }
    const u = JSON.parse(stored);
    setUser(u);
    dashboardAPI.stats().then(r => setStats(r.data)).finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    const loaders: Record<string, () => Promise<unknown>> = {
      assignments: () => assignmentsAPI.list(),
      notes: () => notesAPI.list(),
      videos: () => videoLecturesAPI.list(),
      attendance: () => attendanceAPI.list(),
      results: () => resultsAPI.list(),
      payments: () => paymentsAPI.list(),
    };
    if (loaders[section]) {
      loaders[section]().then((r: unknown) => {
        const res = r as { data: { results?: unknown[] } | unknown[] };
        setData(Array.isArray(res.data) ? res.data : (res.data as { results?: unknown[] }).results || []);
      });
    }
  }, [section]);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)' }}><span style={{ color: 'var(--gold)', fontSize: '20px' }}>Loading...</span></div>;

  const attendPercent = stats.attendance_percentage ?? 0;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', background: 'var(--navy)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', color: 'var(--navy)', marginBottom: '10px' }}>
            {user?.first_name?.[0]?.toUpperCase() || '👤'}
          </div>
          <div style={{ color: '#fff', fontWeight: 700 }}>{user?.first_name || user?.username}</div>
          <div style={{ color: 'var(--gold)', fontSize: '12px' }}>Student Portal</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map((item) => (
            <button key={item.section} onClick={() => setSection(item.section)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', border: 'none', background: section === item.section ? 'rgba(201,162,39,0.15)' : 'transparent', color: section === item.section ? 'var(--gold)' : 'rgba(255,255,255,0.65)', cursor: 'pointer', fontSize: '14px', fontWeight: 600, marginBottom: '4px', textAlign: 'left', transition: 'all 0.2s' }}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '13px', marginBottom: '4px' }}>🌐 Home</Link>
          <button onClick={() => { localStorage.clear(); router.push('/login'); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>🚪 Logout</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', padding: '16px 32px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontFamily: 'Newsreader, serif', color: 'var(--navy)', fontSize: '22px' }}>
            {navItems.find(n => n.section === section)?.label || 'Dashboard'}
          </h1>
          <span style={{ color: '#94a3b8', fontSize: '13px' }}>Welcome, {user?.first_name || user?.username}!</span>
        </div>

        <div style={{ padding: '32px' }}>
          {section === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Summary Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {[
                  { icon: '📅', label: 'Attendance', value: `${attendPercent}%`, color: Number(attendPercent) >= 75 ? '#22c55e' : '#ef4444' },
                  { icon: '📋', label: 'Assignments', value: `${stats.attendance_total ?? 0}`, color: '#3b82f6' },
                  { icon: '💳', label: 'Pending Fees', value: `${stats.pending_payments ?? 0}`, color: '#f59e0b' },
                  { icon: '📊', label: 'Results', value: `${(stats.recent_results as unknown[])?.length ?? 0}`, color: '#8b5cf6' },
                ].map((s) => (
                  <div key={s.label} style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: s.color }}>{s.value}</div>
                    <div style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Attendance Progress */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontFamily: 'Newsreader, serif', color: 'var(--navy)', marginBottom: '16px', fontSize: '20px' }}>Attendance Overview</h2>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#64748b', fontSize: '14px' }}>Attendance Rate</span>
                      <span style={{ fontWeight: 700, color: Number(attendPercent) >= 75 ? '#22c55e' : '#ef4444' }}>{String(attendPercent)}%</span>
                    </div>
                    <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ width: `${attendPercent}%`, height: '100%', background: Number(attendPercent) >= 75 ? '#22c55e' : '#ef4444', borderRadius: '5px', transition: 'width 1s ease' }} />
                    </div>
                    {Number(attendPercent) < 75 && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>⚠️ Below 75% minimum requirement</p>}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '40px', fontWeight: 900, color: Number(attendPercent) >= 75 ? '#22c55e' : '#ef4444' }}>{String(attendPercent)}%</div>
                    <div style={{ color: '#94a3b8', fontSize: '12px' }}>Attendance</div>
                  </div>
                </div>
              </div>

              {/* Announcements */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontFamily: 'Newsreader, serif', color: 'var(--navy)', marginBottom: '16px', fontSize: '20px' }}>Recent Announcements</h2>
                {Array.isArray(stats.recent_announcements) ? (
                  (stats.recent_announcements as Array<{id: number; title: string; content: string; created_at: string}>).map((a) => (
                    <div key={a.id} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{a.title}</div>
                      <div style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>{a.content}</div>
                    </div>
                  ))
                ) : <p style={{ color: '#94a3b8' }}>No announcements.</p>}
              </div>
            </motion.div>
          )}

          {section !== 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
                  <h2 style={{ fontFamily: 'Newsreader, serif', color: 'var(--navy)', fontSize: '20px' }}>{data.length} Items</h2>
                </div>
                {data.length === 0 ? (
                  <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                    <p>No {section} found yet.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', padding: '20px' }}>
                    {(data as Array<Record<string, unknown>>).map((item, i) => (
                      <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                        {Object.entries(item).slice(0, 5).map(([k, v]) => (
                          <div key={k} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                            <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 700, minWidth: '80px', textTransform: 'capitalize' }}>{k}:</span>
                            <span style={{ color: '#475569', fontSize: '13px' }}>{String(v ?? '-').slice(0, 60)}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
