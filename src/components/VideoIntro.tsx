import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShopNowButton } from './ShopNowButton';
import introDesktop from './videos/IntroVideo_web.mp4';

interface VideoIntroProps {
  onComplete: (result: 'ended' | 'skipped') => void;
}

const FADE_DURATION_MS = 180;

export function VideoIntro({ onComplete }: VideoIntroProps) {
  // Use the available desktop cut for both sizes; drop in a mobile cut later if you have one.
  const mp4MobileSrc = introDesktop;
  const mp4DesktopSrc = introDesktop;

  const [variant, setVariant] = useState<'mobile' | 'desktop'>(() => {
    if (typeof window === 'undefined') return 'desktop';
    return window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop';
  });

  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = useMemo(
    () => (variant === 'mobile' ? mp4MobileSrc : mp4DesktopSrc),
    [variant, mp4DesktopSrc, mp4MobileSrc]
  );

  useEffect(() => {
    // Keep variant in sync if the viewport changes (but don't interrupt playback).
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = () => {
      if (isPlaying) return;
      setVariant(mql.matches ? 'mobile' : 'desktop');
    };
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      videoRef.current?.pause();
    };
  }, []);

  const closeIntro = (result: 'ended' | 'skipped') => {
    setIsVisible(false);
    window.setTimeout(() => onComplete(result), FADE_DURATION_MS);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    closeIntro('ended');
  };

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasVideoError(false);
    // Immediately transition UI to "playing" (even if buffering)
    setIsPlaying(true);

    // User gesture: attempt to play with sound
    video.muted = false;
    setIsMuted(false);
    video.currentTime = 0;

    video.play().catch(() => {
      // Fallback: some environments still require muted playback
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {
        setHasVideoError(true);
        setIsPlaying(false);
      });
    });
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    closeIntro('skipped');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION_MS / 1000 }}
          // Keep header accessible: header is fixed h-16, so start the intro under it on mobile.
          className="fixed left-0 right-0 bottom-0 top-0 md:top-16 z-40 bg-black flex items-start justify-start md:items-center md:justify-center"
        >
          {/* Video - visible from start showing first frame */}
          <video
            key={variant}
            ref={videoRef}
            className="block w-full h-full object-cover object-center md:object-cover md:object-center filter blur-[6px] brightness-75"
            onEnded={handleVideoEnd}
            onPlay={() => {
              setIsPlaying(true);
              setHasVideoError(false);
            }}
            onError={(e) => {
              console.error('Video error:', e);
              // If mobile version fails, automatically fall back to desktop file.
              if (variant === 'mobile') {
                setVariant('desktop');
                setHasVideoError(false);
                setIsPlaying(false);
                return;
              }
              setHasVideoError(true);
              setIsPlaying(false);
            }}
            playsInline
            muted={isMuted}
            preload="auto"
            src={videoSrc}
          >
            Your browser does not support the video tag.
          </video>

          {/* Prompt overlay (shown before video plays) */}
          {!isPlaying && !hasVideoError && (
            <div className="absolute inset-0 z-10 px-4 md:px-6">
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/80" />
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.2),rgba(0,0,0,0.65)_40%,rgba(0,0,0,0.9)_70%)]" />
              <div className="relative h-full flex items-center justify-center text-center">
                <div className="w-full max-w-lg md:max-w-xl">
                  <h5 className="text-white/90 text-[11px] md:text-xs tracking-[0.16em] md:tracking-[0.28em] uppercase">
                    ASPENOVA CLUB
                  </h5>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mt-10 flex justify-center relative"
                  >
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="h-24 w-64 rounded-full bg-white/20 blur-3xl" />
                      <div className="absolute h-16 w-44 rounded-full bg-white/20 blur-2xl" />
                    </div>
                    <ShopNowButton label="Preview the Drop" onClick={handlePlay} />
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {/* Codec/support error overlay */}
          {hasVideoError && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 px-6 text-center">
              <div className="max-w-lg space-y-4">
                <p className="text-white tracking-widest text-sm">
                  This browser can’t play the intro video.
                </p>
                <p className="text-white/80 text-sm">
                  Make sure this file exists and is H.264 encoded:
                  <br />
                  <code className="text-white/90">src/components/videos/IntroVideo_web.mp4</code>
                </p>
                <button
                  onClick={handleSkip}
                  className="px-8 py-3 bg-white text-black hover:bg-zinc-100 transition-all duration-300 tracking-widest shadow-xl hover:shadow-2xl"
                >
                  Continue to shop
                </button>
              </div>
            </div>
          )}

          {/* Skip Button (shown during video playback) */}
          {isPlaying && !hasVideoError && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={handleSkip}
              className="absolute top-6 right-6 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-all duration-300 group"
              aria-label="Skip intro"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
