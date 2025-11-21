// /src/components/EnterWorldButton.tsx

"use client"; // Needs to be client-side to handle clicks

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAudio } from '../context/AudioContext';

// Define the component's props if you want to pass custom text
interface EnterWorldButtonProps {
    buttonText?: string;
}

export const EnterWorldButton: React.FC<EnterWorldButtonProps> = ({ 
    buttonText = "ENTER THE WORLD OF THE GOD'S RANK AWAKENING" 
}) => {
    // Get the audio functions from our custom hook
    const { startPlayback } = useAudio();
    const router = useRouter();

    const handleClick = () => {
        // 1. CRITICAL STEP: Call the function that attempts to play the music.
        // This single user gesture satisfies mobile browser autoplay policy.
        startPlayback(); 

        // 2. Navigate the user to the full site content (e.g., the main preview page)
        // We'll just reload the page for now, but in a real app, you'd navigate
        // router.push('/main-preview'); // or just refresh the page content state
        
        // --- For the sake of this test, we'll just log and let the parent page handle navigation ---
        console.log("Audio unlock attempted. Proceeding to main content.");
    };

    return (
        // Apply your "Rockstar" cinematic styling here!
        <button 
            onClick={handleClick}
            className="cinematic-button" // Placeholder for your CSS class
            style={{ 
                padding: '20px 40px', 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                // Add temporary styling for visibility
                background: 'darkred',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
            }}
        >
            {buttonText}
        </button>
    );
};

// Next, you'll use this component inside /src/app/page.tsx
