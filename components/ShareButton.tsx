import React, { useState } from 'react';

interface ShareButtonProps {
  elementId: string;
  title: string;
  text: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ elementId, title, text }) => {
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    const element = document.getElementById(elementId);
    if (!element || sharing) return;

    setSharing(true);
    try {
      // Use html2canvas from window
      const html2canvas = (window as any).html2canvas;
      if (!html2canvas) throw new Error("Screenshot library not loaded");

      const canvas = await html2canvas(element, {
        backgroundColor: '#000',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true
      });

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error("Failed to create image");

      const file = new File([blob], 'jonathan-reading.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: title,
          text: text,
          files: [file],
          url: window.location.origin
        });
      } else if (navigator.share) {
        // Fallback to text-only share if file sharing isn't supported
        await navigator.share({
          title: title,
          text: text,
          url: window.location.origin
        });
      } else {
        alert("Sharing is not supported on this browser. Try on mobile!");
      }
    } catch (err) {
      console.error('Share failed:', err);
    } finally {
      setSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={sharing}
      className="flex items-center justify-center gap-2 p-4 bg-purple-900/20 border border-purple-500/20 rounded-2xl hover:bg-purple-800/30 transition-all active:scale-95 disabled:opacity-50"
      title="Share Result"
    >
      {sharing ? (
        <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-300"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      )}
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-purple-200">
        {sharing ? 'Capturing...' : 'Share Discovery'}
      </span>
    </button>
  );
};

export default ShareButton;