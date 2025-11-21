// 1. /src/app/layout.tsx (FINAL STRUCTURE)

import type { Metadata } from 'next';
import './globals.css'; 
import { AudioProvider } from '../context/AudioContext';
import { MusicPlayer } from '../components/MusicPlayer';
import { NavHeader } from '../components/NavHeader'; // <-- IMPORT THE NEW COMPONENT

export const metadata: Metadata = {
  title: 'The God\'s Rank Awakening 2.0 - Cinematic Novel Hub',
  description: 'A high-fidelity web experience for the novel The novel The God\'s Rank Awakening.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AudioProvider>
          <main>
            {/* PERSISTENT COMPONENT: Header */}
            <NavHeader /> 

            {/* The main content of the current page (Hub or Chapter) */}
            {children}
            
            {/* PERSISTENT COMPONENT: Music Player Control */}
            <MusicPlayer /> 
          </main>
        </AudioProvider>
      </body>
    </html>
  );
}
