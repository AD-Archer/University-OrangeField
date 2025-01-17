'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <header className="top-navbar">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            <Image
              id="nav-logo"
              src="/images/Logo.svg"
              alt="Orange Field University Logo"
              width={80}
              height={80}
              priority
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavCollapse}
            aria-controls="navbars-host"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>

          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbars-host">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <Link className="nav-link" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/about">About Us</Link>
              </li>
              <li className="nav-item dropdown">
              <Link className="nav-link" href="/courses">Courses</Link>

              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contact">Contact</Link>
              </li>

              {session?.user ? (
                <li className="nav-item dropdown">
                  <Link 
                    className="nav-link dropdown-toggle" 
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    {session.user.name}
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" href="/dashboard">Dashboard</Link></li>
                    <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="dropdown-item"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" href="/sign-in">Sign In</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/sign-up">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
} 