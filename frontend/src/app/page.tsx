'use client';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/ToastContainer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { enquiriesAPI } from '@/lib/api';

const courses = [
  { icon: '🧒', name: 'Kindergarten (K.G.)', desc: 'Play, learn and grow with fun activities' },
  { icon: '📚', name: 'Primary (Class 1–2)', desc: 'Building strong fundamentals in every subject' },
  { icon: '🔬', name: 'Prep (Class 3–5)', desc: 'Concept clarity and sparking curiosity' },
  { icon: '🏫', name: 'Middle (Class 6–8)', desc: 'Preparing students for a bright future' },
];

const facilities = [
  { icon: '📚', name: 'Library', desc: 'Rich collection of books & digital resources' },
  { icon: '💻', name: 'Computer Lab', desc: 'Modern computers with high-speed internet' },
  { icon: '🏀', name: 'Sports Ground', desc: 'Spacious playground for outdoor activities' },
  { icon: '🎨', name: 'Art & Craft Room', desc: 'Creative space for artistic expression' },
  { icon: '🚌', name: 'Transport', desc: 'Safe and reliable school bus service' },
  { icon: '🏥', name: 'Medical Room', desc: 'First aid and health monitoring facility' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Parent of Class 5 student', text: 'JSM Academy has transformed my child\'s learning. The teachers are extremely dedicated and caring.', stars: 5 },
  { name: 'Rahul Verma', role: 'Parent of Class 3 student', text: 'Excellent school with a perfect balance of academics and co-curricular activities. Highly recommended!', stars: 5 },
  { name: 'Sunita Gupta', role: 'Parent of Class 7 student', text: 'The individual attention given to each student is remarkable. My son has shown tremendous improvement.', stars: 5 },
];

const teachers = [
  { name: 'Aarif Khan', subject: 'Mathematics', exp: '8 Years Experience', emoji: '👨‍🏫' },
  { name: 'Shivam Maurya', subject: 'Science', exp: '6 Years Experience', emoji: '👨‍🔬' },
  { name: 'Mukul Sharma', subject: 'English & Hindi', exp: '10 Years Experience', emoji: '📖' },
  { name: 'Govind Singh', subject: 'Social Studies', exp: '7 Years Experience', emoji: '🌍' },
];

export default function Home() {
  const [form, setForm] = useState({ parent_name: '', student_name: '', phone: '', class_applied: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await enquiriesAPI.create(form);
      setSubmitted(true);
      setForm({ parent_name: '', student_name: '', phone: '', class_applied: '', message: '' });
    } catch {
      alert('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const sectionHeader = (title: string, sub: string, light = false) => (
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 'clamp(28px,4vw,44px)', color: light ? '#fff' : 'var(--navy)', marginBottom: '12px' }}
        dangerouslySetInnerHTML={{ __html: title }} />
      <p style={{ color: light ? 'rgba(255,255,255,0.65)' : '#64748b', fontSize: '16px' }}>{sub}</p>
    </div>
  );

  const card = (children: React.ReactNode, extra: React.CSSProperties = {}) => (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #e2e8f0', transition: 'transform 0.2s, box-shadow 0.2s', ...extra }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'; }}
    >{children}</div>
  );

  return (
    <>
      <ToastContainer />
      <Navbar />
      <HeroSection />

      {/* Ticker */}
      <div style={{ background: 'var(--gold)', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div className="ticker-animate" style={{ display: 'inline-block' }}>
          <span style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '14px', padding: '0 40px' }}>
            📢 Admissions Open 2025-26 &nbsp;|&nbsp; Limited Seats &nbsp;|&nbsp; PTM on 18 May 2025 (Saturday) &nbsp;|&nbsp; Annual Sports Day on 28 May &nbsp;|&nbsp; Results out for Class 5–8 &nbsp;|&nbsp;
            📢 Admissions Open 2025-26 &nbsp;|&nbsp; Limited Seats &nbsp;|&nbsp; PTM on 18 May 2025 (Saturday) &nbsp;|&nbsp; Annual Sports Day on 28 May &nbsp;|&nbsp; Results out for Class 5–8 &nbsp;|&nbsp;
          </span>
        </div>
      </div>

      {/* About Section */}
      <section id="about" style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '13px', letterSpacing: '2px' }}>ABOUT US</span>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: '40px', color: 'var(--navy)', margin: '12px 0' }}>
              Shaping Future <em>Leaders</em>
            </h2>
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '16px' }}>
              At JSM Shiksha Academy, we believe in nurturing young minds through quality education, strong values and holistic development. Our aim is to empower students to become confident, responsible and compassionate individuals.
            </p>
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '28px' }}>
              Founded with a mission to provide world-class education in Nihal Vihar, New Delhi, we serve students from Kindergarten to Class 8 with experienced teachers and modern teaching methods.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                ['🎯', 'Mission-Driven'],
                ['🌟', 'Excellence First'],
                ['🤝', 'Community Bond'],
                ['💡', 'Innovation'],
              ].map(([icon, label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: '#f8f9ff', borderRadius: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{icon}</span>
                  <span style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { num: '500+', label: 'Happy Students', icon: '👥' },
                { num: '25+', label: 'Expert Teachers', icon: '👨‍🏫' },
                { num: '10+', label: 'Years Excellence', icon: '🏆' },
                { num: '100%', label: 'Commitment', icon: '✅' },
              ].map((s) => (
                <div key={s.label} style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{s.icon}</div>
                  <div className="gradient-text" style={{ fontSize: '28px', fontWeight: 900 }}>{s.num}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" style={{ padding: '80px 24px', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {sectionHeader('Our <span style="color:var(--gold)">Courses</span>', 'A complete learning journey from Kindergarten to Class 8')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {courses.map((c) => card(
              <>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{c.icon}</div>
                <h3 style={{ fontFamily: 'Newsreader, serif', color: 'var(--navy)', marginBottom: '8px', fontSize: '20px' }}>{c.name}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{c.desc}</p>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" style={{ padding: '80px 24px', background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {sectionHeader('Our <span style="color:var(--gold-light)">Facilities</span>', 'World-class environment for holistic growth', true)}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {facilities.map((f) => (
              <motion.div key={f.name}
                whileHover={{ y: -6, scale: 1.02 }}
                style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'default' }}
              >
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{f.icon}</div>
                <h3 style={{ color: '#fff', fontFamily: 'Newsreader, serif', marginBottom: '8px', fontSize: '18px' }}>{f.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1.5 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section id="teachers" style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {sectionHeader('Meet Our <span style="color:var(--gold)">Teachers</span>', 'Dedicated educators committed to student success')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {teachers.map((t) => card(
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', margin: '0 auto 16px' }}>{t.emoji}</div>
                <h3 style={{ fontFamily: 'Newsreader, serif', color: 'var(--navy)', marginBottom: '4px' }}>{t.name}</h3>
                <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>{t.subject}</p>
                <p style={{ color: '#94a3b8', fontSize: '12px' }}>{t.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 24px', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {sectionHeader('What <span style="color:var(--gold)">Parents Say</span>', 'Trusted by hundreds of families across New Delhi')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {testimonials.map((t) => card(
              <>
                <div style={{ color: 'var(--gold)', fontSize: '20px', marginBottom: '12px' }}>{'★'.repeat(t.stars)}</div>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic' }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{t.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '13px' }}>{t.role}</div>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" style={{ padding: '80px 24px', background: 'var(--navy)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {sectionHeader('School <span style="color:var(--gold-light)">Gallery</span>', 'Moments that define us', true)}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {['Annual Sports Day', 'Science Exhibition', 'Cultural Program', 'Classroom Activity', 'Independence Day', 'Art Competition'].map((label, i) => (
              <motion.div key={label} whileHover={{ scale: 1.03 }}
                style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative', height: i % 3 === 0 ? '220px' : '160px', background: `hsl(${220 + i * 15}, 40%, ${20 + i * 5}%)`, display: 'flex', alignItems: 'flex-end', cursor: 'pointer' }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                <span style={{ position: 'relative', zIndex: 1, color: '#fff', padding: '12px 16px', fontWeight: 700, fontSize: '14px' }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section id="announcements" style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {sectionHeader('Latest <span style="color:var(--gold)">Announcements</span>', 'Stay updated with school notices')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { date: '20 May, 2025', title: 'Summer Holiday Notice', desc: 'School will remain closed from 25 May to 10 June 2025.' },
              { date: '15 May, 2025', title: 'PTM Meeting', desc: 'PTM will be held on 18 May 2025 (Saturday) for all classes.' },
              { date: '10 May, 2025', title: 'Annual Sports Day', desc: 'Annual Sports Day will be celebrated on 28 May 2025 at school ground.' },
              { date: '5 May, 2025', title: 'Admissions Open', desc: 'Admissions for 2025-26 are now open. Limited seats available!' },
            ].map((a) => (
              <div key={a.title} style={{ display: 'flex', gap: '20px', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--navy)', color: 'var(--gold)', padding: '8px 14px', borderRadius: '8px', fontWeight: 800, fontSize: '12px', whiteSpace: 'nowrap', textAlign: 'center', lineHeight: 1.4 }}>
                  {a.date.split(',')[0]}<br />{a.date.split(' ').pop()}
                </div>
                <div>
                  <h4 style={{ color: 'var(--navy)', fontWeight: 700, marginBottom: '4px' }}>{a.title}</h4>
                  <p style={{ color: '#64748b', fontSize: '14px' }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions Form */}
      <section id="admissions" style={{ padding: '80px 24px', background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {sectionHeader('Admissions <span style="color:var(--gold-light)">Open 2025-26</span>', 'Secure your child\'s future today — Limited seats available!', true)}
          {submitted ? (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '60px', marginBottom: '16px' }}>✅</div>
              <h3 style={{ color: '#fff', fontFamily: 'Newsreader, serif', fontSize: '28px', marginBottom: '12px' }}>Enquiry Submitted!</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>We will contact you within 24 hours. Thank you!</p>
              <button onClick={() => setSubmitted(false)} style={{ marginTop: '20px', background: 'var(--gold)', color: 'var(--navy)', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Submit Another</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '20px', padding: '36px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {[
                  { label: "Parent's Name", key: 'parent_name', placeholder: 'Enter parent name' },
                  { label: "Student's Name", key: 'student_name', placeholder: 'Enter student name' },
                  { label: 'Phone Number', key: 'phone', placeholder: '+91 XXXXX XXXXX' },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>{f.label}</label>
                    <input value={(form as Record<string, string>)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder} required
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Class Applying For</label>
                  <select value={form.class_applied} onChange={e => setForm({ ...form, class_applied: e.target.value })} required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'var(--navy)', color: '#fff', fontSize: '14px' }}>
                    <option value="">Select Class</option>
                    {['Kindergarten (K.G.)', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Message (Optional)</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3} placeholder="Any specific query..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', resize: 'vertical', outline: 'none' }} />
              </div>
              <button type="submit" disabled={submitting}
                style={{ width: '100%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--navy)', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 800, fontSize: '16px', cursor: submitting ? 'wait' : 'pointer' }}>
                {submitting ? 'Submitting...' : 'Submit Enquiry →'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '80px 24px', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {sectionHeader('Contact <span style="color:var(--gold)">Us</span>', 'We\'d love to hear from you')}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: '📍', label: 'Address', val: 'RZ-132, Nihal Vihar 50 Feet Road,\nNear Hanuman Mandir, New Delhi' },
                { icon: '📞', label: 'Phone', val: '+91 98712 34567' },
                { icon: '✉️', label: 'Email', val: 'info@jsmshikshaacademy.com' },
                { icon: '🕐', label: 'School Hours', val: 'Mon–Sat: 8:00 AM – 2:00 PM' },
              ].map((c) => (
                <div key={c.label} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <span style={{ fontSize: '24px' }}>{c.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px', marginBottom: '4px' }}>{c.label}</div>
                    <div style={{ color: '#64748b', fontSize: '14px', whiteSpace: 'pre-line' }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.8!2d77.07!3d28.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQwJzEyLjAiTiA3N8KwMDQnMTIuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              style={{ width: '100%', height: '380px', border: 'none', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} title="Location" />
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/919871234567" target="_blank" rel="noopener noreferrer" className="whatsapp-fab" title="Chat on WhatsApp">
        <span style={{ fontSize: '28px' }}>💬</span>
      </a>

      <Footer />
    </>
  );
}
