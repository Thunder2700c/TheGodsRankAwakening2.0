// 1. /src/app/layout.tsx

import type { Metadata } from 'next';
import './globals.css'; // Import your global styles
import { AudioProvider } from '../context/AudioContext'; // Import the provider

export const metadata: Metadata = {
  title: 'The God\'s Rank Awakening 2.0 - Cinematic Novel Hub',
  description: 'A high-fidelity web experience for the novel The God\'s Rank Awakening.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/*
          Wrap the entire application in the AudioProvider.
          This ensures the audio element and its state are available globally
          and persist across page navigations.
        */}
        <AudioProvider>
          <main>
            {/* NavHeader and MusicPlayer controls will go around this later */}
            {children}
          </main>
        </AudioProvider>
      </body>
    </html>
  );
}
