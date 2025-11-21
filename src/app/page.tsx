// 2. /src/app/page.tsx

"use client"; // Needs to be client-side to use the custom hook

import React from 'react';
import { useAudio } from '../context/AudioContext';
import { EnterWorldButton } from '../components/EnterWorldButton';

// --- Placeholder for your cinematic visual content ---
const MainContent = () => {
    return (
        // *****************************************************************
        // THIS IS WHERE YOUR CINEMATIC NOVEL PREVIEW CONTENT GOES
        // (Parallax backgrounds, high-res synopsis, chapter index, etc.)
        // *****************************************************************
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Welcome to The God's Rank Awakening</h1>
            <p>A new era begins. Scroll down to start Chapter I...</p>
            {/* The actual cinematic visuals and chapter index links go here */}
        </div>
    );
};
// -------------------------------------------------------------------------


export default function HomePage() {
    // Get the state that tracks if the music has been successfully started
    const { isMusicPlaying } = useAudio();

    // While your app is hydrating (setting up the initial state), you might show a loader
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        // Simple delay to prevent flashing or awkward loading
        const timer = setTimeout(() => setIsLoading(false), 500); 
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        // 1. Initial loading screen
        return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'black', color: 'white' }}>Loading Cinematic Experience...</div>;
    }

    return (
        <div className="homepage-container">
            {isMusicPlaying ? (
                // 2. If music is playing (or unlocked), show the full cinematic content
                <MainContent />
            ) : (
                // 3. If music is NOT playing (due to mobile block), show the button
                <div style={{ 
                    minHeight: '100vh', 
                    display: 'grid', 
                    placeItems: 'center', 
                    background: '#111', // Dark, cinematic background
                    color: 'white'
                }}>
                    {/* The critical button that unlocks the mobile audio stream */}
                    <EnterWorldButton />
                    <p style={{ marginTop: '20px', color: '#888' }}>
                        * Tap to begin the experience and load the background score.
                    </p>
                </div>
            )}
        </div>
    );
}
