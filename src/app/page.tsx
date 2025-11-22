// 2. /src/app/page.tsx (UPDATED for Cinematic Style)

"use client"; 

import React from 'react';
import { useAudio } from '../context/AudioContext';
import { EnterWorldButton } from '../components/EnterWorldButton';
import novelData from '../data/novel-data.json';

// --- Placeholder for your cinematic visual content ---
const MainContent = () => {
    return (
        <div className="main-content-area">
            <h1>The God's Rank Awakening</h1>
            <p style={{ color: 'var(--color-secondary-text)', fontSize: '1.2rem', marginBottom: '30px' }}>
                {novelData.synopsis}
            </p>
            
            <h2 style={{ color: 'white', borderBottom: '1px solid var(--color-accent)', paddingBottom: '10px' }}>
                Start Your Journey
            </h2>
            
            {/* You would build your Chapter Index links here */}
            <p style={{ marginTop: '20px' }}>
                <a href="/chapters/the-first-spark" style={{ color: 'lightblue', fontWeight: 'bold' }}>
                    Continue to Chapter I &rarr;
                </a>
            </p>
        </div>
    );
};
// -------------------------------------------------------------------------


export default function HomePage() {
    const { isMusicPlaying } = useAudio();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500); 
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'black', color: 'white' }}>Loading Cinematic Experience...</div>;
    }

    return (
        <div className="homepage-container"> {/* <--- NEW CLASS ADDED HERE */}
            {isMusicPlaying ? (
                // 2. Full cinematic content view
                <MainContent />
            ) : (
                // 3. Landing page gate (The dark screen with the button)
                <div className="landing-page-gate"> {/* <--- NEW CLASS ADDED HERE */}
                    <EnterWorldButton />
                    <p style={{ marginTop: '20px', color: '#aaa' }}>
                        * Tap to begin the experience and load the background score.
                    </p>
                </div>
            )}
        </div>
    );
}
