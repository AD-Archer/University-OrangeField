import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/sign-up">Sign Up</Link>
        <Link href="/sign-in">Sign In</Link>
      </nav>
    </header>
  );
};

export default Header; 