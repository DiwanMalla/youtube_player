"use client";

import { VideoDetails } from "@/types/youtube";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface FeaturedVideoProps {
  video: VideoDetails | null;
  recommendations?: VideoDetails[];
  onRecommendationClick?: (video: VideoDetails) => void;
}

// Extend Window interface to include YouTube IFrame API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function FeaturedVideo({
  video,
  recommendations = [],
  onRecommendationClick,
}: FeaturedVideoProps) {
  const playerRef = useRef<any>(null);
  const [showEndScreen, setShowEndScreen] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (video && !playerRef.current) {
        playerRef.current = new window.YT.Player('youtube-player', {
          events: {
            onStateChange: onPlayerStateChange,
          },
        });
      }
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Reset end screen when video changes
    setShowEndScreen(false);
  }, [video?.id]);

  const onPlayerStateChange = (event: any) => {
    // YT.PlayerState.ENDED = 0
    if (event.data === 0) {
      setShowEndScreen(true);
    } else if (event.data === 1) {
      // Playing - hide end screen
      setShowEndScreen(false);
    }
  };

  const handleRecommendationClick = (rec: VideoDetails) => {
    setShowEndScreen(false);
    onRecommendationClick?.(rec);
  };
  if (!video) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-white/30 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl border border-white/40 dark:border-gray-600/40">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-purple-400 dark:text-cyan-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-medium">Search for videos to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/40 dark:border-gray-600/40">
        <iframe
          id="youtube-player"
          src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&autoplay=0&rel=0&color=white&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
        
        {/* Custom End Screen with Recommendations */}
        {showEndScreen && recommendations.length > 0 && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-10">
            <h3 className="text-2xl font-bold text-white mb-6">Watch Next</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
              {recommendations.slice(0, 4).map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => handleRecommendationClick(rec)}
                  className="cursor-pointer group"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-white/20 group-hover:border-cyan-500 transition-all">
                    <Image
                      src={rec.thumbnail}
                      alt={rec.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-white font-semibold mt-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {rec.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{video.title}</h1>
        <p className="text-gray-700 dark:text-gray-300 font-medium">{video.channelTitle}</p>
        <div className="pt-4 border-t border-white/40 dark:border-gray-600/40">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {video.description}
          </p>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="pt-6 border-t border-white/40 dark:border-gray-600/40">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            More from {video.channelTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => onRecommendationClick?.(rec)}
                className="cursor-pointer rounded-2xl overflow-hidden transition-all duration-300
                         hover:shadow-lg hover:scale-[1.02] border border-white/40 dark:border-gray-600/40 
                         bg-white/30 dark:bg-gray-800/40 backdrop-blur-sm
                         hover:bg-white/40 dark:hover:bg-gray-800/50"
              >
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={rec.thumbnail}
                    alt={rec.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3 bg-white dark:bg-gray-800">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">
                    {rec.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
