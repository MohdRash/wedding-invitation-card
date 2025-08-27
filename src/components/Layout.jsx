import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, PauseCircle, PlayCircle } from 'lucide-react';
import config from '@/config/config';
import BottomBar from '@/components/BottomBar';

const Layout = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef(null);
  const wasPlayingRef = useRef(false);

  // First useEffect to handle initial setup and auto-play attempt
  useEffect(() => {
    audioRef.current = new Audio(config.data.audio.src);
    if (config.data.audio.loop) {
      audioRef.current.setAttribute('loop', '');
    } else {
      audioRef.current.removeAttribute('loop');
    }

    const attemptAutoplay = async () => {
      try {
        if (config.data.audio.autoplay) {
          audioRef.current.setAttribute('autoplay', '');
          await audioRef.current.play();
          setIsPlaying(true);
          wasPlayingRef.current = true;
          setShowToast(true);
          setTimeout(() => setShowToast(false), config.data.audio.toastDuration);
        }
      } catch (error) {
        console.log('Autoplay failed, waiting for user interaction:', error);
      }
    };

    attemptAutoplay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Second useEffect to handle visibility and focus changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        wasPlayingRef.current = isPlaying;
        if (audioRef.current && isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (audioRef.current && wasPlayingRef.current) {
          audioRef.current.play().catch(console.error);
          setIsPlaying(true);
        }
      }
    };

    const handleWindowBlur = () => {
      wasPlayingRef.current = isPlaying;
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleWindowFocus = () => {
      if (audioRef.current && wasPlayingRef.current) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    };

    // Audio event listeners
    const handlePlay = () => {
      setIsPlaying(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), config.data.audio.toastDuration);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowToast(false);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);

      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
      }
    };
  }, [isPlaying]);

  // Toggle music function
  const toggleMusic = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          wasPlayingRef.current = false;
        } else {
          await audioRef.current.play();
          wasPlayingRef.current = true;
        }
      } catch (error) {
        console.error('Playback error:', error);
      }
    }
  };

  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 grayscale">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="flowerGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#f0f0f0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#flowerGradient)" />
          <g stroke="#000" strokeWidth="0.1" fill="none">
            <path d="M50 20 Q60 30 50 40 Q40 30 50 20Z" />
            <path d="M50 20 Q40 30 50 40 Q60 30 50 20Z" transform="rotate(45 50 50)" />
            <path d="M50 20 Q40 30 50 40 Q60 30 50 20Z" transform="rotate(90 50 50)" />
            <path d="M50 20 Q40 30 50 40 Q60 30 50 20Z" transform="rotate(135 50 50)" />
            <path d="M50 20 Q40 30 50 40 Q60 30 50 20Z" transform="rotate(180 50 50)" />
            <path d="M50 20 Q40 30 50 40 Q60 30 50 20Z" transform="rotate(225 50 50)" />
            <path d="M50 20 Q40 30 50 40 Q60 30 50 20Z" transform="rotate(270 50 50)" />
            <path d="M50 20 Q40 30 50 40 Q60 30 50 20Z" transform="rotate(315 50 50)" />
          </g>
        </svg>
      </div>
      <motion.div
        className="mx-auto w-full max-w-[430px] min-h-screen bg-white relative overflow-hidden border border-gray-200 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Music Control Button with Status Indicator */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-rose-100/50"
        >
          {isPlaying ? (
            <div className="relative">
              <PauseCircle className="w-6 h-6 text-rose-500" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          ) : (
            <PlayCircle className="w-6 h-6 text-rose-500" />
          )}
        </motion.button>

        <main className="relative z-10 h-full w-full pb-[100px]">
          {children}
        </main>
        <BottomBar />
        {/* Music Info Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-black/80 text-white transform -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-sm flex items-center space-x-2">
                <Music className="w-4 h-4 animate-pulse" />
                <span className="text-sm whitespace-nowrap">
                  {config.data.audio.title}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Layout;