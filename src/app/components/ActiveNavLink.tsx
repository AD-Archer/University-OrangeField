'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ActiveNavLink: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const navLinks = document.querySelectorAll('.nav-item .nav-link');

      navLinks.forEach(link => {
        if (link.getAttribute('href') === pathname) {
          link.parentElement?.classList.add('active');
        } else {
          link.parentElement?.classList.remove('active');
        }
      });
    }
  }, [pathname]);

  return null;
};

export default ActiveNavLink; 