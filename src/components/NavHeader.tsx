// /src/components/NavHeader.tsx

"use client"; // Needs to be client-side to use Next's Link component

import React from 'react';
import Link from 'next/link';
// Optional: If you want to access the music state to adjust layout
import { useAudio } from '../context/AudioContext'; 

export const NavHeader: React.FC = () => {
    // You can use the audio state here if, for example, you wanted the header
    // to change color or hide if the music hasn't been unlocked yet.
    // const { isMusicPlaying } = useAudio();
    
    return (
        <header 
            // Apply dramatic, fixed styling for a cinematic feel
            style={{
                position: 'sticky', // sticky header that stays at the top
                top: 0,
                zIndex: 900, // Below the MusicPlayer (1000) but above content
                background: 'rgba(13, 13, 13, 0.9)', // Semi-transparent dark background
                backdropFilter: 'blur(8px)', // Modern blur effect
                padding: '20px 40px',
                borderBottom: '1px solid rgba(229, 0, 0, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            className="nav-header" // For custom styling in globals.css
        >
            {/* Left Side: Novel Title/Logo */}
            <div className="logo">
                <Link href="/" style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: '900', 
                    color: 'var(--color-accent)', // Dark Red accent color
                    letterSpacing: '3px',
                    textTransform: 'uppercase'
                }}>
                    TGR A
                </Link>
            </div>

            {/* Right Side: Navigation Links */}
            <nav>
                <Link href="/" className="nav-link" style={{ marginRight: '30px' }}>
                    Home (Preview)
                </Link>
                <Link href="/chapters/the-first-spark" className="nav-link">
                    Start Reading
                </Link>
                {/* Add more links later (e.g., /lore, /characters) */}
            </nav>
        </header>
    );
};
