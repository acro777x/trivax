"use client";

import React, { useState } from 'react';

interface NavLink {
    label: string;
    href: string;
    isActive?: boolean;
}

interface Partner {
    logoUrl: string;
    href: string;
    name?: string;
    sublabel?: string;
}

interface ResponsiveHeroBannerProps {
    logoUrl?: string;
    backgroundImageUrl?: string;
    transparent?: boolean;
    navLinks?: NavLink[];
    ctaButtonText?: string;
    ctaButtonHref?: string;
    badgeText?: string;
    badgeLabel?: string;
    title?: string;
    titleLine2?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
    partnersTitle?: string;
    partners?: Partner[];
}

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
    logoUrl = "https://cdn.21st.dev/assets/mirror/c4/c4d5f159140e3ccc35a8bd4f043453cb9e2692f700206e43855ff598c171b924.png",
    backgroundImageUrl = "https://cdn.21st.dev/assets/mirror/a8/a8cf38f65f7315f95eba8c803c4a80a9d78cb2ea36fbfee49828396e4a0b9737.jpg",
    transparent = false,
    navLinks = [
        { label: "Home", href: "#", isActive: true },
        { label: "Missions", href: "#" },
        { label: "Destinations", href: "#" },
        { label: "Technology", href: "#" },
        { label: "Book Flight", href: "#" }
    ],
    ctaButtonText = "Reserve Seat",
    ctaButtonHref = "#",
    badgeLabel = "New",
    badgeText = "First Commercial Flight to Mars 2026",
    title = "Journey Beyond Earth",
    titleLine2 = "Into the Cosmos",
    description = "Experience the cosmos like never before. Our advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable.",
    primaryButtonText = "Book Your Journey",
    primaryButtonHref = "#",
    secondaryButtonText = "Watch Launch",
    secondaryButtonHref = "#",
    partnersTitle = "Partnering with leading space agencies worldwide",
    partners = [
        { logoUrl: "https://cdn.21st.dev/assets/mirror/96/964eca0b0415aebc2718799b530b39d6f552b39634f3fb2072e769df17c6668f.png", href: "#" },
        { logoUrl: "https://cdn.21st.dev/assets/mirror/90/900ad16bdb8bd723836996d2283c47420e719ba8c9a4f7d24ff67e59056e88fe.png", href: "#" },
        { logoUrl: "https://cdn.21st.dev/assets/mirror/1b/1b66b155997cb81da3bdabeb8da22771b07f4ac5273d6a19d629c77cf75a861f.png", href: "#" },
        { logoUrl: "https://cdn.21st.dev/assets/mirror/cb/cb112906d9fa8a57380201b1385c5534075020542dab48d5f29f2e35a3e19bc1.png", href: "#" },
        { logoUrl: "https://cdn.21st.dev/assets/mirror/f6/f68e2933c2f24ef4b28fb81328350831eb56bf42244dee50e2b7f6efd7497783.png", href: "#" }
    ]
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <section className="w-full isolate min-h-[100svh] overflow-hidden relative">
            {!transparent && (
                <img
                    src={backgroundImageUrl}
                    alt=""
                    className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0"
                />
            )}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />

            <header className="z-10 xl:top-4 relative">
                <div className="mx-4 sm:mx-6">
                    <div className="flex items-center justify-between pt-4">
                        <a
                            href="#"
                            className="inline-flex items-center justify-start h-[44px] max-w-[200px]"
                        >
                            <img
                                src={logoUrl}
                                alt="Logo"
                                className="h-full w-auto max-w-[180px] object-contain"
                            />
                        </a>

                        <nav className="hidden md:flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className={`px-3 py-2 text-sm font-medium hover:text-white font-sans transition-colors ${link.isActive ? 'text-white/90' : 'text-white/80'
                                            }`}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <a
                                    href={ctaButtonHref}
                                    className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 font-sans transition-colors"
                                >
                                    {ctaButtonText}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                        <path d="M7 7h10v10" />
                                        <path d="M7 17 17 7" />
                                    </svg>
                                </a>
                            </div>
                        </nav>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur"
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/90">
                                <path d="M4 5h16" />
                                <path d="M4 12h16" />
                                <path d="M4 19h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden mt-3 mx-4 sm:mx-6 rounded-2xl bg-black/70 backdrop-blur-xl ring-1 ring-white/10 p-3 animate-fade-slide-in-1">
                        <nav className="flex flex-col gap-1">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-4 py-3 rounded-xl text-sm font-medium font-sans transition-colors ${link.isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5'}`}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href={ctaButtonHref}
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium text-neutral-900 font-sans"
                            >
                                {ctaButtonText}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                </svg>
                            </a>
                        </nav>
                    </div>
                )}
            </header>

            <div className="z-10 relative">
                <div className="pt-28 sm:pt-32 md:pt-36 lg:pt-40 max-w-7xl mx-auto px-5 sm:px-6 pb-16 md:pb-24">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur animate-fade-slide-in-1">
                            <span className="inline-flex items-center text-xs font-medium text-neutral-900 bg-white/90 rounded-full py-0.5 px-2 font-sans">
                                {badgeLabel}
                            </span>
                            <span className="text-sm font-medium text-white/90 font-sans">
                                {badgeText}
                            </span>
                        </div>

                        <h1 className="text-[clamp(2.25rem,5.5vw,5.5rem)] leading-[1.05] text-white tracking-tight font-instrument-serif font-normal animate-fade-slide-in-2">
                            {title}
                            <br className="hidden sm:block" />
                            {titleLine2}
                        </h1>

                        <p className="text-[clamp(0.95rem,1.1vw,1.15rem)] text-white/80 max-w-2xl mt-6 mx-auto animate-fade-slide-in-3">
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-center justify-center animate-fade-slide-in-4">
                            <a
                                href={primaryButtonHref}
                                className="inline-flex items-center gap-2 hover:bg-white/15 text-sm font-medium text-white bg-white/10 ring-white/15 ring-1 rounded-full py-3 px-5 font-sans transition-colors"
                            >
                                {primaryButtonText}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                            <a
                                href={secondaryButtonHref}
                                className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 text-sm font-medium text-white/90 hover:text-white font-sans transition-colors"
                            >
                                {secondaryButtonText}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="mx-auto mt-16 md:mt-24 max-w-5xl text-center">
                        <p className="animate-fade-slide-in-1 text-sm text-white/70 text-center">
                            {partnersTitle}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 animate-fade-slide-in-2">
                            {partners.map((partner, index) => (
                                <a
                                    key={index}
                                    href={partner.href}
                                    target={partner.href.startsWith('http') ? '_blank' : undefined}
                                    rel={partner.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className={
                                        partner.name
                                            ? "inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all shadow-md group cursor-pointer"
                                            : "inline-flex items-center justify-center bg-center bg-contain bg-no-repeat w-[140px] h-[38px] opacity-80 hover:opacity-100 transition-opacity"
                                    }
                                    style={!partner.name ? { backgroundImage: `url(${partner.logoUrl})` } : undefined}
                                >
                                    {partner.name && (
                                        <>
                                            <span className="w-8 h-8 rounded-full bg-white p-0.5 inline-flex items-center justify-center shrink-0 shadow-sm overflow-hidden border border-white/20">
                                                <img src={partner.logoUrl} alt={partner.name} className="w-full h-full object-contain rounded-full" />
                                            </span>
                                            <span className="text-left font-sans">
                                                <span className="block text-xs font-semibold text-white/90 group-hover:text-white flex items-center gap-1">
                                                    {partner.name}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
                                                        <path d="M7 7h10v10" />
                                                        <path d="M7 17 17 7" />
                                                    </svg>
                                                </span>
                                                {partner.sublabel && (
                                                    <span className="block text-[10px] text-white/60">
                                                        {partner.sublabel}
                                                    </span>
                                                )}
                                            </span>
                                        </>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResponsiveHeroBanner;
