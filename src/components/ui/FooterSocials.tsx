import React from 'react';
import { Mail } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';

export const FooterSocials: React.FC = () => {
  return (
    <>
      {/* SVG Clip Path for Squircle geometry */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="kaviroxSquircleClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      <div className="flex items-center gap-3">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/kavirox"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Kavirox on LinkedIn"
          className="group relative cursor-target"
        >
          <div
            style={{ clipPath: 'url(#kaviroxSquircleClip)' }}
            className="w-11 h-11 bg-surface-2 border border-line flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#38bdf8] group-hover:border-[#38bdf8] shadow-md group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]"
          >
            <FaLinkedinIn className="w-4 h-4 text-text group-hover:text-primary-ink transition-colors" />
          </div>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/kavirox.space"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Kavirox on Instagram"
          className="group relative cursor-target"
        >
          <div
            style={{ clipPath: 'url(#kaviroxSquircleClip)' }}
            className="w-11 h-11 bg-surface-2 border border-line flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#38bdf8] group-hover:border-[#38bdf8] shadow-md group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]"
          >
            <SiInstagram className="w-4 h-4 text-text group-hover:text-primary-ink transition-colors" />
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:info@kavirox.space"
          aria-label="Email Kavirox Studio"
          className="group relative cursor-target"
        >
          <div
            style={{ clipPath: 'url(#kaviroxSquircleClip)' }}
            className="w-11 h-11 bg-surface-2 border border-line flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#38bdf8] group-hover:border-[#38bdf8] shadow-md group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]"
          >
            <Mail className="w-4 h-4 text-text group-hover:text-primary-ink transition-colors" />
          </div>
        </a>
      </div>
    </>
  );
};

export default FooterSocials;
