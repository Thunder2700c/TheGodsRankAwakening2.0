// 1. /src/app/layout.tsx (UPDATED)

import type { Metadata } from 'next';
import './globals.css'; 
import { AudioProvider } from '../context/AudioContext';
import { MusicPlayer } from '../components/MusicPlayer'; // <-- IMPORT THE NEW COMPONENT

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
            {/* The main content of the current page (Hub or Chapter) */}
            {children}
            
            {/* PERSISTENT COMPONENT: 
              This MusicPlayer will stay mounted and visible on every single page
              because it is placed inside the RootLayout.
            */}
            <MusicPlayer /> 

            {/* If you had a persistent NavHeader, it would also go here */}
            {/* <NavHeader /> */} 
          </main>
        </AudioProvider>
      </body>
    </html>
  );
}
