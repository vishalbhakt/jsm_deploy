'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { API_BASE, dashboardAPI, studentsAPI, attendanceAPI, assignmentsAPI, notesAPI, videoLecturesAPI } from '@/lib/api';

const adminUrl = API_BASE.replace('/api', '/admin');

const navItems = [
  { icon: '🏠', label: 'Overview', section: 'overview' },
  { icon: '👥', label: 'My Students', section: 'students' },
  { icon: '📅', label: 'Mark Attendance', section: 'attendance' },
  { icon: '📋', label: 'Assignments', section: 'assignments' },
  { icon: '📝', label: 'Notes', section: 'notes' },
  { icon: '🎬', label: 'Video Lectures', section: 'videos' },
];

export default function TeacherDashboard() {
  const [user, setUser] = useState<{ username: string; first_name: string } | null>(null);
  const [section, setSection] = useState('overview');
  const [stats, setStats] = useState<Record<string, unknown>>({});
  const [students, setStudents] = useState<Array<{ id: number; user: { username: string; first_name: string; last_name: string }; roll_number: string }>>([]);
  const [data, setData] = useState<unknown[]>([]);
  const [attendance, setAttendance] = useState<{ student: number; date: string; status: string }>({ student: 0, date: new Date().toISOString().split('T')[0], status: 'Present' });
  const [attMsg, setAttMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const stored = localStorage.getItem('user');
      if (!stored) { router.push('/login'); return; }
      setUser(JSON.parse(stored));
      try {
        const statRes = await dashboardAPI.stats();
        setStats(statRes.data);
        const stuRes = await studentsAPI.list();
        const d = stuRes.data;
        setStudents(Array.isArray(d) ? d : (d.results || []));
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  useEffect(() => {
    const loaders: Record<string, () => Promise<unknown>> = {
      assignments: () => assignmentsAPI.list(),
      notes: () => notesAPI.list(),
      videos: () => videoLecturesAPI.list(),
    };
    if (loaders[section]) {
      loaders[section]().then((r: unknown) => {
        const res = r as { data: { results?: unknown[] } | unknown[] };
        setData(Array.isArray(res.data) ? res.data : (res.data as { results?: unknown[] }).results || []);
      });
    }
  }, [section]);

  const markAttendance = async () => {
    if (!attendance.student) { setAttMsg('Please select a student.'); return; }
    try {
      await attendanceAPI.create(attendance);
      setAttMsg('✅ Attendance marked successfully!');
    } catch {
      setAttMsg('⚠️ Already marked or error occurred.');
    }
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)' }}><span style={{ color: 'var(--gold)', fontSize: '20px' }}>Loading...</span></div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', background: 'var(--navy)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', color: '#fff', marginBottom: '10px' }}>
            {user?.first_name?.[0]?.toUpperCase() || '👨‍🏫'}
          </div>
          <div style={{ color: '#fff', fontWeight: 700 }}>{user?.first_name || user?.username}</div>
          <div style={{ color: '#a78bfa', fontSize: '12px' }}>Teacher Portal</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map((item) => (
            <button key={item.section} onClick={() => setSection(item.section)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', border: 'none', background: section === item.section ? 'rgba(167,139,250,0.15)' : 'transparent', color: section === item.section ? '#a78bfa' : 'rgba(255,255,255,0.65)', cursor: 'pointer', fontSize: '14px', fontWeight: 600, marginBottom: '4px', textAlign: 'left' }}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => { localStorage.clear(); router.push('/login'); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>🚪 Logout</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', padding: '16px 32px', borderBottom: '1px solid #e2e8f0' }}>
          <h1 style={{ fontFamily: 'Newsreader, serif', color: 'var(--navy)', fontSize: '22px' }}>{navItems.find(n => n.section === section)?.label}</h1>
        </div>

        <div style={{ padding: '32px' }}>
          {section === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {[
                  { icon: '👥', label: 'Total Students', value: String(stats.total_students ?? 0), color: '#3b82f6' },
                  { icon: '📚', label: 'My Subjects', value: String(Array.isArray(stats.my_subjects) ? stats.my_subjects.length : 0), color: '#8b5cf6' },
                  { icon: '📋', label: 'Assignments Created', value: String(stats.my_assignments ?? 0), color: '#10b981' },
                ].map((s) => (
                  <div key={s.label} style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: s.color }}>{s.value}</div>
                    <div style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontFamily: 'Newsreader, serif', color: 'var(--navy)', marginBottom: '16px', fontSize: '20px' }}>Quick Actions</h2>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {[['📅 Mark Attendance', 'attendance'], ['📋 Add Assignment', 'assignments'], ['📝 Upload Notes', 'notes']].map(([label, sec]) => (
                    <button key={label} onClick={() => setSection(sec)}
                      style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {section === 'students' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead><tr style={{ background: '#f8fafc' }}>
                    {['#', 'Name', 'Username', 'Roll No', 'Course'].map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700, fontSize: '12px' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {students.map((s, i) => (
                      <tr key={s.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{i + 1}</td>
                        <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--navy)' }}>{s.user?.first_name} {s.user?.last_name}</td>
                        <td style={{ padding: '12px 16px', color: '#64748b' }}>{s.user?.username}</td>
                        <td style={{ padding: '12px 16px', color: '#64748b' }}>{s.roll_number || '-'}</td>
                        <td style={{ padding: '12px 16px', color: '#64748b' }}>-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {section === 'attendance' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', maxWidth: '500px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontFamily: 'Newsreader, serif', color: 'var(--navy)', marginBottom: '24px', fontSize: '22px' }}>Mark Attendance</h2>
                {[
                  { label: 'Select Student', el: <select value={attendance.student} onChange={e => setAttendance({ ...attendance, student: Number(e.target.value) })} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px' }}>
                    <option value={0}>-- Select Student --</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.user?.first_name} {s.user?.last_name} ({s.user?.username})</option>)}
                  </select> },
                  { label: 'Date', el: <input type="date" value={attendance.date} onChange={e => setAttendance({ ...attendance, date: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px' }} /> },
                  { label: 'Status', el: <select value={attendance.status} onChange={e => setAttendance({ ...attendance, status: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px' }}>
                    {['Present', 'Absent', 'Late', 'Holiday'].map(s => <option key={s}>{s}</option>)}
                  </select> },
                ].map(({ label, el }) => (
                  <div key={label} style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 700, color: 'var(--navy)', fontSize: '13px', marginBottom: '6px' }}>{label}</label>
                    {el}
                  </div>
                ))}
                {attMsg && <div style={{ padding: '10px', background: attMsg.startsWith('✅') ? '#dcfce7' : '#fee2e2', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{attMsg}</div>}
                <button onClick={markAttendance} style={{ width: '100%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--navy)', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>
                  Mark Attendance ✓
                </button>
              </div>
            </motion.div>
          )}

          {['assignments', 'notes', 'videos'].includes(section) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', padding: '24px' }}>
                {data.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                    <p>No {section} yet. Add from Django Admin panel.</p>
                    <a href={adminUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 700, display: 'inline-block', marginTop: '12px' }}>Open Admin Panel →</a>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                    {(data as Array<Record<string, unknown>>).map((item, i) => (
                      <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                        {Object.entries(item).slice(0, 5).map(([k, v]) => (
                          <div key={k} style={{ display: 'flex', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                            <span style={{ color: '#94a3b8', fontWeight: 700, minWidth: '80px', textTransform: 'capitalize' }}>{k}:</span>
                            <span style={{ color: '#475569' }}>{String(v ?? '-').slice(0, 60)}</span>
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
