'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  {
    label: 'Academics',
    href: '#',
    children: [
      { label: 'Curriculum', href: '/#courses' },
      { label: 'Assignments', href: '/login' },
      { label: 'Video Lectures', href: '/login' },
    ],
  },
  { label: 'Courses', href: '/#courses' },
  { label: 'Facilities', href: '/#facilities' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Notice Board', href: '/#announcements' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div
        style={{
          background: 'var(--navy)',
          color: '#fff',
          fontSize: '12px',
          padding: '6px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <span>📍 RZ-132, Nihal Vihar 50 Feet Road, Near Hanuman Mandir, New Delhi</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="tel:+919871234567" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            📞 +91 98712 34567
          </a>
          <a href="mailto:info@jsmshikshaacademy.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            ✉ info@jsmshikshaacademy.com
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(10,22,40,0.97)' : 'var(--navy)',
          backdropFilter: 'blur(10px)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(201,162,39,0.2)',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '18px',
              color: 'var(--navy)',
            }}
          >
            JSM
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: '16px', letterSpacing: '1px', lineHeight: 1 }}>
              SHIKSHA ACADEMY
            </div>
            <div style={{ color: 'var(--gold)', fontSize: '10px', letterSpacing: '2px' }}>LEARN · GROW · SUCCEED</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '4px',
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <li key={link.label} style={{ position: 'relative' }}>
              {link.children ? (
                <div
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#e2e8f0',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'Manrope, sans-serif',
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.label} <FiChevronDown size={12} />
                  </button>
                  {openDropdown === link.label && (
                    <ul
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        background: 'var(--navy-mid)',
                        border: '1px solid rgba(201,162,39,0.3)',
                        borderRadius: '8px',
                        padding: '8px 0',
                        minWidth: '160px',
                        listStyle: 'none',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                        zIndex: 100,
                      }}
                    >
                      {link.children.map((c) => (
                        <li key={c.label}>
                          <Link
                            href={c.href}
                            style={{
                              display: 'block',
                              padding: '8px 16px',
                              color: '#cbd5e1',
                              textDecoration: 'none',
                              fontSize: '13px',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              (e.target as HTMLElement).style.color = 'var(--gold)';
                              (e.target as HTMLElement).style.paddingLeft = '22px';
                            }}
                            onMouseLeave={(e) => {
                              (e.target as HTMLElement).style.color = '#cbd5e1';
                              (e.target as HTMLElement).style.paddingLeft = '16px';
                            }}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  style={{
                    color: '#e2e8f0',
                    textDecoration: 'none',
                    padding: '8px 12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'block',
                    transition: 'color 0.2s',
                    borderRadius: '6px',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--gold)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#e2e8f0')}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link
            href="/login"
            style={{
              background: 'transparent',
              border: '1px solid var(--gold)',
              color: 'var(--gold)',
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 700,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            Login
          </Link>
          <Link
            href="/#admissions"
            style={{
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              color: 'var(--navy)',
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 800,
              whiteSpace: 'nowrap',
            }}
          >
            Enquire Now →
          </Link>
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '110px',
            left: 0,
            right: 0,
            background: 'var(--navy-mid)',
            zIndex: 999,
            padding: '16px',
            borderBottom: '2px solid var(--gold)',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block',
                color: '#e2e8f0',
                padding: '12px 8px',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 600,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              style={{
                flex: 1,
                textAlign: 'center',
                border: '1px solid var(--gold)',
                color: 'var(--gold)',
                padding: '10px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              Login
            </Link>
            <Link
              href="/#admissions"
              onClick={() => setIsOpen(false)}
              style={{
                flex: 1,
                textAlign: 'center',
                background: 'var(--gold)',
                color: 'var(--navy)',
                padding: '10px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
