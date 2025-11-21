// 3. /src/app/chapters/[chapterId]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Import all novel data (ideally, this would be a fetch function in a real app)
import novelData from '../../../data/novel-data.json'; 

// Define the expected structure for the page parameters
interface ChapterPageProps {
  params: {
    chapterId: string; // This will hold the slug from the URL (e.g., 'the-first-spark')
  };
}

// Function to find the chapter based on the slug
const getChapterBySlug = (slug: string) => {
  return novelData.chapters.find(chapter => chapter.slug === slug);
};

// Function to get the previous/next chapter links for navigation
const getNavigationLinks = (currentId: number) => {
    const chapters = novelData.chapters;
    
    // Find index of the current chapter
    const currentIndex = chapters.findIndex(c => c.id === currentId);
    
    const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

    return { prevChapter, nextChapter };
};


// The main component that renders the Chapter Sub-Page
export default function ChapterPage({ params }: ChapterPageProps) {
  const currentChapter = getChapterBySlug(params.chapterId);

  // If the URL slug doesn't match any chapter, show a 404 error
  if (!currentChapter) {
    notFound(); 
  }

  const { prevChapter, nextChapter } = getNavigationLinks(currentChapter.id);

  return (
    <article className="chapter-page-container" style={{ padding: '80px 10%', maxWidth: '900px', margin: '0 auto', color: 'white' }}>
      
      {/* Chapter Title */}
      <h1 style={{ fontSize: '2.5rem', borderBottom: '2px solid darkred', paddingBottom: '10px' }}>
        {currentChapter.title}
      </h1>
      
      {/* Chapter Image/Art */}
      {/* In a real app, you would use Next's Image component here for optimization */}
      <div 
        style={{ 
          height: '400px', 
          backgroundImage: `url(${currentChapter.imageAsset})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          margin: '30px 0',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)'
        }}
      />

      {/* Chapter Content (The actual text of your novel) */}
      <p style={{ lineHeight: 1.8, fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
        {currentChapter.content}
      </p>

      {/* Navigation Links (Previous / Next) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px', padding: '20px 0' }}>
        {prevChapter ? (
          <Link href={`/chapters/${prevChapter.slug}`} style={{ color: 'lightblue', textDecoration: 'none', fontWeight: 'bold' }}>
            &larr; Previous: {prevChapter.title}
          </Link>
        ) : (
          <span /> // Spacer
        )}

        {nextChapter ? (
          <Link href={`/chapters/${nextChapter.slug}`} style={{ color: 'lightblue', textDecoration: 'none', fontWeight: 'bold' }}>
            Next: {nextChapter.title} &rarr;
          </Link>
        ) : (
          <span /> // Spacer
        )}
      </div>
    </article>
  );
}


// --- REQUIRED NEXT.JS FUNCTION FOR STATIC GENERATION (Highly Recommended for SEO) ---
// This tells Next.js which chapter URLs to pre-build during the build process.
export async function generateStaticParams() {
    return novelData.chapters.map(chapter => ({
        chapterId: chapter.slug,
    }));
}
