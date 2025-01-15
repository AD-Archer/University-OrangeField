import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light text-dark py-4">
        <div className="container text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Orange Field University. All rights reserved.</p>
        </div>
      </footer>
  );
};

export default Footer;
