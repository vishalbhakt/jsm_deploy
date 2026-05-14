'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastFn: (msg: string, type?: Toast['type']) => void = () => {};

export function showToast(message: string, type: Toast['type'] = 'success') {
  toastFn(message, type);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    toastFn = (message, type = 'success') => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
    };
  }, []);

  const bgColors: Record<Toast['type'], string> = {
    success: '#22c55e',
    error: '#ef4444',
    info: 'var(--gold)',
  };

  return (
    <div style={{ position: 'fixed', top: '90px', right: '20px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            style={{
              background: bgColors[t.type],
              color: '#fff',
              padding: '12px 20px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '14px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              maxWidth: '320px',
            }}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
