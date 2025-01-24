'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import '@/app/styles/components/header.css';

export default function Header() {
  const { user, logout } = useAuth();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    const loadCartCount = async () => {
      if (user?.id) {
        try {
          const res = await fetch(`/api/cart?userId=${user.id}`);
          if (res.ok) {
            const cartItems = await res.json();
            setCartCount(cartItems.length);
          }
        } catch (error) {
          console.error('Error loading cart count:', error);
        }
      } else {
        setCartCount(0);
      }
    };

    loadCartCount();
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg top-navbar">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <Image
            src="/images/Logo.svg"
            alt="Orange Field University Logo"
            width={80}
            height={80}
            id="nav-logo"
            priority
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavCollapse}
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/courses" className="nav-link">
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </li>

            {user ? (
              <>
                {user.isAdmin && (
                  <li className="nav-item">
                    <Link href="/admin" className="nav-link">
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link href="/profile" className="nav-link">
                    My Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/profile/checkout" className="nav-link cart-link">
                    Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={logout}
                    className="nav-link"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/sign-in" className="nav-link">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/sign-up" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
} 