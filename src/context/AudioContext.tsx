// 5. /src/context/AudioContext.tsx

"use client"; // Must be a Client Component to use state and refs

import React, { 
    createContext, 
    useContext, 
    useState, 
    useRef, 
    useEffect, 
    ReactNode 
} from 'react';

// --- Types for Context State ---
interface AudioContextType {
    isMuted: boolean;
    isMusicPlaying: boolean;
    toggleMute: () => void;
    startPlayback: () => void; // Function called by the 'Enter World' button
}

// --- Initial Context Value ---
const AudioContext = createContext<AudioContextType | undefined>(undefined);

// --- The Provider Component ---
interface AudioProviderProps {
    children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
    // State to track if the music is currently muted
    const [isMuted, setIsMuted] = useState(true); 
    
    // State to track if playback has been explicitly started by a user gesture
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);

    // Ref to directly access the hidden HTML <audio> element
    const audioRef = useRef<HTMLAudioElement>(null);

    // URL of your cloud-streamed background music (PLACEHOLDER)
    // You should place your actual cloud stream URL here, or use /public/audio/file.mp3
    const MUSIC_URL = "/audio/theme-song.mp3"; 

    // 1. Function to toggle the mute state
    const toggleMute = () => {
        setIsMuted(prev => {
            const newMutedState = !prev;
            if (audioRef.current) {
                audioRef.current.muted = newMutedState;
            }
            return newMutedState;
        });
    };

    // 2. Function to START playback (called by the EnterWorldButton)
    const startPlayback = () => {
        if (!isMusicPlaying && audioRef.current) {
            // Attempt to play, resolving the mobile browser autoplay restriction
            audioRef.current.play().then(() => {
                setIsMusicPlaying(true);
                // Ensure it's not muted if the user clicks play
                if (isMuted) {
                    setIsMuted(false);
                    audioRef.current!.muted = false; 
                }
            }).catch(error => {
                console.error("Autoplay prevented or failed:", error);
                // Handle the case where the browser still blocks it
            });
        }
    };

    // 3. Effect to set up the initial audio element properties
    useEffect(() => {
        if (audioRef.current) {
            // Set the audio source and loop it
            audioRef.current.src = MUSIC_URL;
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5; // Start at half volume
            audioRef.current.muted = isMuted; // Reflect initial state
        }
    }, []);

    // --- Context Value to be Shared ---
    const contextValue: AudioContextType = {
        isMuted,
        isMusicPlaying,
        toggleMute,
        startPlayback,
    };

    return (
        <AudioContext.Provider value={contextValue}>
            {/* The hidden persistent audio element */}
            <audio ref={audioRef} /> 
            {children}
        </AudioContext.Provider>
    );
};

// --- Custom Hook to Use the Audio Context ---
export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};

