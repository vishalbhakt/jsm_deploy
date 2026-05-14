'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 39, ${p.alpha})`;
        ctx.fill();
      });

      // Lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(201,162,39,${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #06101f 0%, #0a1628 40%, #122040 70%, #0d1f3c 100%)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <ParticlesCanvas />

      {/* Decorative orbs */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,162,39,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,58,107,0.5) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px', zIndex: 1, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(201,162,39,0.1)',
                border: '1px solid rgba(201,162,39,0.4)',
                borderRadius: '50px',
                padding: '6px 16px',
                marginBottom: '24px',
              }}
            >
              <span style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ color: 'var(--gold)', fontSize: '13px', fontWeight: 700 }}>
                Admissions Open 2025-26
              </span>
            </motion.div>

            <h1
              style={{
                fontFamily: 'Newsreader, serif',
                fontSize: 'clamp(40px, 6vw, 72px)',
                color: '#fff',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              Nurturing <span className="gradient-text">Young Minds</span>
            </h1>

            <h2
              style={{
                fontFamily: 'Newsreader, serif',
                fontSize: 'clamp(24px, 3.5vw, 40px)',
                color: 'rgba(255,255,255,0.7)',
                fontStyle: 'italic',
                marginBottom: '24px',
                fontWeight: 400,
              }}
            >
              Building Bright Futures
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px', maxWidth: '480px' }}>
              Quality education from K to 8 with a balanced approach to academics,
              co-curricular activities, and character building. Located in Nihal Vihar, New Delhi.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <Link
                href="/#about"
                style={{
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                  color: 'var(--navy)',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '15px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Explore Our School →
              </Link>
              <Link
                href="/#admissions"
                style={{
                  background: 'transparent',
                  border: '2px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '15px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Apply for Admission
              </Link>
            </div>

            {/* Stat counters */}
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {[
                { num: '500+', label: 'Students' },
                { num: '25+', label: 'Teachers' },
                { num: '10+', label: 'Years' },
                { num: '100%', label: 'Results' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div className="gradient-text" style={{ fontSize: '28px', fontWeight: 900 }}>{s.num}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '480px' }}
          >
            {/* Central card */}
            <div
              className="float-anim"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(201,162,39,0.3)',
                borderRadius: '24px',
                padding: '40px',
                maxWidth: '340px',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎓</div>
              <h3 style={{ color: '#fff', fontSize: '22px', fontFamily: 'Newsreader, serif', marginBottom: '12px' }}>
                JSM Shiksha Academy
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.6 }}>
                A premier educational institution in Nihal Vihar, New Delhi, offering KG to Class 8.
              </p>
              <Link
                href="/login"
                style={{
                  display: 'inline-block',
                  marginTop: '20px',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                  color: 'var(--navy)',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '14px',
                }}
              >
                Student Login →
              </Link>
            </div>

            {/* Floating mini cards */}
            {[
              { icon: '📚', label: 'K to 8 Curriculum', top: '30px', left: '-60px' },
              { icon: '🏆', label: '100% Board Results', bottom: '60px', left: '-80px' },
              { icon: '👨‍🏫', label: '25+ Expert Teachers', top: '40px', right: '-70px' },
              { icon: '🛡️', label: 'Safe Environment', bottom: '40px', right: '-60px' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{
                  position: 'absolute',
                  ...(card.top ? { top: card.top } : {}),
                  ...(card.bottom ? { bottom: card.bottom } : {}),
                  ...(card.left ? { left: card.left } : {}),
                  ...(card.right ? { right: card.right } : {}),
                  background: 'rgba(10,22,40,0.9)',
                  border: '1px solid rgba(201,162,39,0.4)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                  zIndex: 10,
                }}
              >
                <span style={{ fontSize: '24px' }}>{card.icon}</span>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {card.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '12px',
      }}>
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: 1, height: 40, background: 'rgba(201,162,39,0.5)' }}
        />
      </div>
    </section>
  );
}
