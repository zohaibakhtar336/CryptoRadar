import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-400 max-w-4xl mx-auto flex items-center justify-center py-4 text-xs">
      <p>Copyright © {year}, CryptoRadar - All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
