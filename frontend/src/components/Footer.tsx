'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: '#fff', padding: '60px 24px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: '14px', color: 'var(--navy)',
              }}>JSM</div>
              <div>
                <div style={{ fontWeight: 800, letterSpacing: '1px', fontSize: '14px' }}>JSM SHIKSHA ACADEMY</div>
                <div style={{ color: 'var(--gold)', fontSize: '10px', letterSpacing: '2px' }}>LEARN · GROW · SUCCEED</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.7 }}>
              Empowering students with knowledge, values, and the courage to succeed in tomorrow&apos;s world.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              {['f', 'in', '▶'].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', textDecoration: 'none', fontSize: '12px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'background 0.2s',
                }}>{icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, marginBottom: '16px', fontSize: '14px', letterSpacing: '1px' }}>
              QUICK LINKS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                ['Home', '/'],
                ['About Us', '/#about'],
                ['Courses', '/#courses'],
                ['Admissions', '/#admissions'],
                ['Facilities', '/#facilities'],
                ['Gallery', '/#gallery'],
                ['Contact', '/#contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--gold)'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
                  >
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, marginBottom: '16px', fontSize: '14px', letterSpacing: '1px' }}>
              PORTALS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                ['Student Portal', '/login'],
                ['Teacher Portal', '/login'],
                ['Admin Panel', '/login'],
                ['Notice Board', '/#announcements'],
                ['Results', '/login'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '14px' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--gold)'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
                  >
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, marginBottom: '16px', fontSize: '14px', letterSpacing: '1px' }}>
              CONTACT US
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span>📍</span>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.5 }}>
                  RZ-132, Nihal Vihar 50 Feet Road,<br />Near Hanuman Mandir, New Delhi
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span>📞</span>
                <a href="tel:+919871234567" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', textDecoration: 'none' }}>
                  +91 98712 34567
                </a>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span>✉</span>
                <a href="mailto:info@jsmshikshaacademy.com" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', textDecoration: 'none' }}>
                  info@jsmshikshaacademy.com
                </a>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span>🕐</span>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px' }}>Mon–Sat: 8:00 AM – 2:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            © 2025 JSM Shiksha Academy. All Rights Reserved. | Designed with ❤️ for Education
          </p>
        </div>
      </div>
    </footer>
  );
}
