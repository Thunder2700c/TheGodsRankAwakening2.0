// 4. /src/components/MusicPlayer.tsx

"use client"; // Needs to be client-side to handle clicks

import React from 'react';
import { useAudio } from '../context/AudioContext';

// Define the icons for the Mute and Unmute states
const UnmuteIcon = () => <span>&#x1F50A;</span>; // Volume/Speaker Icon
const MuteIcon = () => <span>&#x1F507;</span>;   // Mute/No Volume Icon

export const MusicPlayer: React.FC = () => {
    // Get the necessary state and function from our context
    const { isMuted, isMusicPlaying, toggleMute } = useAudio();

    // The player should only be visible and functional once the music has been unlocked
    // by the EnterWorldButton click.
    if (!isMusicPlaying) {
        return null; // Don't render the controls until the audio is active/unlocked
    }

    return (
        <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute Soundtrack" : "Mute Soundtrack"}
            // Apply simple styling for a visible control on the screen
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 1000, // Ensure it sits above all other content
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.5rem',
                backdropFilter: 'blur(5px)' // Modern cinematic blur effect
            }}
            className="music-toggle-button" // Placeholder for your CSS class
        >
            {/* Display the correct icon based on the current state */}
            {isMuted ? <MuteIcon /> : <UnmuteIcon />}
        </button>
    );
};
