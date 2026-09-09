import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="border-t border-white/10 bg-[#070709] py-12 md:py-16 px-5 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src="/Kavirox_logo.png" alt="Kavirox" className="h-9 md:h-10 w-auto object-contain" />
        </div>

        <p className="text-xs text-white/50 font-sans text-center md:text-left">
          Digital Engineering & Technology Solutions • Founded at{' '}
          <a
            href="https://www.gbu.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            Gautam Buddha University
          </a>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70 font-sans">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a
            href="https://www.linkedin.com/company/kavirox/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/kavirox.space?stkn=encybWN2NTFhZ291"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-400 transition-colors"
          >
            Instagram
          </a>
          <a href="mailto:contact@kavirox.space" className="text-white hover:underline">contact@kavirox.space</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 text-center text-[11px] text-white/30 font-sans">
        © {new Date().getFullYear()} KAVIROX Engineering. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
