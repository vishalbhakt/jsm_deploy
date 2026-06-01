'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { dashboardAPI, announcementsAPI, eventsAPI, studentsAPI, teachersAPI, usersAPI, enquiriesAPI, coursesAPI, subjectsAPI, api } from '@/lib/api';

const navItems = [
  { icon: '🏠', label: 'Dashboard', section: 'overview' },
  { icon: '🎓', label: 'Academics', section: 'academics' },
  { icon: '👥', label: 'Students', section: 'students' },
  { icon: '👨‍🏫', label: 'Teachers', section: 'teachers' },
  { icon: '👤', label: 'Users', section: 'users' },
  { icon: '✅', label: 'Approvals', section: 'approvals' },
  { icon: '📋', label: 'Assignments', section: 'assignments' },
  { icon: '📝', label: 'Notes', section: 'notes' },
  { icon: '🎬', label: 'Videos', section: 'videos' },
  { icon: '💳', label: 'Payments', section: 'payments' },
  { icon: '📊', label: 'Results', section: 'results' },
  { icon: '📢', label: 'Announcements', section: 'announcements' },
  { icon: '📋', label: 'Enquiries', section: 'enquiries' },
  { icon: '📅', label: 'Events', section: 'events' },
  { icon: '🖼️', label: 'Gallery', section: 'gallery' },
];

export default function AdminDashboard() {
  const [user, setUser] = useState<{ username: string; first_name: string; role: string } | null>(null);
  const [section, setSection] = useState('overview');
  const [stats, setStats] = useState<Record<string, unknown>>({});
  const [data, setData] = useState<unknown[]>([]);
  const [extraData, setExtraData] = useState<unknown[]>([]); // For subjects in academics
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // For Academics forms
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleAcademicAdd = async (type: 'course' | 'subject') => {
    try {
      if (type === 'course') await coursesAPI.create(formData);
      else await subjectsAPI.create(formData);
      setFormData({});
      setIsAdding(null);
      // reload
      const c = await coursesAPI.list();
      const s = await subjectsAPI.list();
      setData(Array.isArray(c.data) ? c.data : c.data.results || []);
      setExtraData(Array.isArray(s.data) ? s.data : s.data.results || []);
    } catch {
      alert('Error adding item.');
    }
  };

  useEffect(() => {
    const init = async () => {
      const stored = localStorage.getItem('user');
      if (!stored) { router.push('/login'); return; }
      const u = JSON.parse(stored);
      if (u.role !== 'ADMIN' && u.role !== 'admin') { router.push('/login'); return; }
      setUser(u);
      try {
        const r = await dashboardAPI.stats();
        setStats(r.data);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  useEffect(() => {
    const loaders: Record<string, () => Promise<unknown>> = {
      students: () => studentsAPI.list(),
      teachers: () => teachersAPI.list(),
      users: () => usersAPI.list(),
      approvals: () => usersAPI.pending(),
      assignments: () => assignmentsAPI.list(),
      notes: () => notesAPI.list(),
      videos: () => videoLecturesAPI.list(),
      payments: () => paymentsAPI.list(),
      results: () => resultsAPI.list(),
      announcements: () => announcementsAPI.list(),
      enquiries: () => enquiriesAPI.list(),
      events: () => eventsAPI.list(),
      gallery: () => galleryAPI.list(),
      academics: async () => {
        const c = await coursesAPI.list();
        const s = await subjectsAPI.list();
        setData(Array.isArray(c.data) ? c.data : (c.data as any).results || []);
        setExtraData(Array.isArray(s.data) ? s.data : (s.data as any).results || []);
        return { data: [] }; // already handled
      }
    };
    if (loaders[section]) {
      loaders[section]().then((r: any) => { 
        if (section === 'academics') return;
        const res = r as { data: { results?: unknown[]; } | unknown[] }; 
        const d = Array.isArray(res.data) ? res.data : (res.data as { results?: unknown[] }).results || []; 
        setData(d); 
      });
    }
  }, [section]);

  const logout = () => { localStorage.clear(); router.push('/login'); };

  const renderValue = (val: any): string => {
    if (val === null || val === undefined) return '-';
    if (typeof val === 'object') {
      if (val.name) return val.name;
      if (val.username) return val.username;
      if (val.first_name) return `${val.first_name} ${val.last_name || ''}`;
      return '-';
    }
    return String(val);
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'var(--gold)', fontSize: '20px' }}>Loading Dashboard...</div>
    </div>
  );

  const statCards = [
    { icon: '👥', label: 'Total Students', value: stats.total_students ?? 0, color: '#3b82f6' },
    { icon: '👨‍🏫', label: 'Total Teachers', value: stats.total_teachers ?? 0, color: '#8b5cf6' },
    { icon: '📚', label: 'Courses', value: stats.total_courses ?? 0, color: '#10b981' },
    { icon: '⏳', label: 'Pending Approvals', value: stats.pending_approvals ?? 0, color: '#f59e0b' },
    { icon: '📋', label: 'Enquiries', value: stats.total_enquiries ?? 0, color: '#ef4444' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', background: 'var(--navy)', display: 'flex', flexDirection: 'column', padding: '0', flexShrink: 0 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '12px', color: 'var(--navy)' }}>JSM</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '13px' }}>Admin Panel</div>
              <div style={{ color: 'var(--gold)', fontSize: '11px' }}>{user?.username}</div>
            </div>
          </div>
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
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '13px', marginBottom: '4px' }}>🌐 View Website</Link>
          <button onClick={logout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>🚪 Logout</button>
        </div>
      </div>

      {/* Main */}
      <div className="main-content-responsive" style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ background: '#fff', padding: '16px 32px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(true)}
              style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', display: 'none', color: 'var(--navy)' }}
            >
              ☰
            </button>
            <h1 style={{ fontFamily: 'Newsreader, serif', color: 'var(--navy)', fontSize: '22px' }}>
              {navItems.find(n => n.section === section)?.label || 'Dashboard'}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontWeight: 700, fontSize: '14px' }}>
              {user?.username?.[0]?.toUpperCase()}
            </div>
          </div>
        </div>

        <div style={{ padding: '32px' }}>
          {section === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Stat Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {statCards.map((s) => (
                  <div key={s.label} style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: s.color }}>{String(s.value)}</div>
                    <div style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Announcements */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontFamily: 'Newsreader, serif', color: 'var(--navy)', fontSize: '20px', marginBottom: '16px' }}>Recent Announcements</h2>
                {Array.isArray(stats.recent_announcements) && (stats.recent_announcements as Array<{id: number; title: string; audience: string; created_at: string}>).map((a) => (
                  <div key={a.id} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{a.title}</div>
                      <div style={{ color: '#94a3b8', fontSize: '12px' }}>{a.audience}</div>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '12px' }}>{new Date(a.created_at).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {section === 'academics' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Courses */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: '20px' }}>Courses</h2>
                    <button onClick={() => { setFormData({}); setIsAdding('course' as any); }} style={{ background: 'var(--navy)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>+ Add</button>
                  </div>
                  {isAdding === 'course' && (
                    <div style={{ marginBottom: '20px', padding: '16px', background: '#f8fafc', borderRadius: '10px' }}>
                      <input placeholder="Course Name" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: '1px solid #ddd' }} />
                      <textarea placeholder="Description" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: '1px solid #ddd' }} />
                      <button onClick={() => handleAcademicAdd('course')} style={{ background: 'var(--gold)', color: 'var(--navy)', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 700 }}>Save</button>
                    </div>
                  )}
                  <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                    {data.map((c: any) => (
                      <div key={c.id} style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '14px' }}>{c.name}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8' }}>{c.student_count} Students</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subjects */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: '20px' }}>Subjects</h2>
                    <button onClick={() => { setFormData({}); setIsAdding('subject' as any); }} style={{ background: 'var(--navy)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>+ Add</button>
                  </div>
                  {isAdding === 'subject' && (
                    <div style={{ marginBottom: '20px', padding: '16px', background: '#f8fafc', borderRadius: '10px' }}>
                      <input placeholder="Subject Name" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: '1px solid #ddd' }} />
                      <select value={formData.course || ''} onChange={e => setFormData({ ...formData, course: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: '1px solid #ddd' }}>
                        <option value="">-- Select Course --</option>
                        {data.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                      <button onClick={() => handleAcademicAdd('subject')} style={{ background: 'var(--gold)', color: 'var(--navy)', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 700 }}>Save</button>
                    </div>
                  )}
                  <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                    {extraData.map((s: any) => (
                      <div key={s.id} style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ fontWeight: 700, fontSize: '14px' }}>{s.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--gold)' }}>{s.course_name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {section !== 'overview' && section !== 'academics' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
                  <h2 style={{ fontFamily: 'Newsreader, serif', color: 'var(--navy)', fontSize: '20px' }}>{data.length} Records</h2>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  {data.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No records found.</div>
                  ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>#</th>
                          {Object.keys((data[0] as object)).filter(k => !['id', 'password', 'password2'].includes(k)).slice(0, 6).map(k => (
                            <th key={k} style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{k.replace('_', ' ')}</th>
                          ))}
                          {section === 'approvals' && <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700, fontSize: '11px' }}>ACTION</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {(data as Array<Record<string, unknown>>).map((row: any, i) => (
                          <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{i + 1}</td>
                            {Object.keys(row).filter(k => !['id', 'password', 'password2'].includes(k)).slice(0, 6).map((k, j) => (
                              <td key={j} style={{ padding: '12px 16px', color: '#475569' }}>
                                {renderValue(row[k])}
                              </td>
                            ))}
                            {section === 'approvals' && (
                              <td style={{ padding: '12px 16px' }}>
                                <button onClick={() => usersAPI.approve((row as { id: number }).id).then(() => setData(prev => (prev as Record<string, unknown>[]).filter((_, ii) => ii !== i)))}
                                  style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '12px' }}>
                                  Approve
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
