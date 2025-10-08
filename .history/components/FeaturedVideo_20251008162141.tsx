"use client";

import { VideoDetails } from "@/types/youtube";
import Image from "next/image";

interface FeaturedVideoProps {
  video: VideoDetails | null;
  recommendations?: VideoDetails[];
  onRecommendationClick?: (video: VideoDetails) => void;
}

export default function FeaturedVideo({
  video,
  recommendations = [],
  onRecommendationClick,
}: FeaturedVideoProps) {
  if (!video) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl border border-white/40 dark:border-gray-700/40">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-purple-400 dark:text-purple-500"
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
      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/40">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=0&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      {/* Video Info */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
        <p className="text-gray-700 font-medium">{video.channelTitle}</p>
        <div className="pt-4 border-t border-white/40">
          <p className="text-gray-700 whitespace-pre-wrap">
            {video.description}
          </p>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="pt-6 border-t border-white/40">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            More from {video.channelTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => onRecommendationClick?.(rec)}
                className="cursor-pointer rounded-2xl overflow-hidden transition-all duration-300
                         hover:shadow-lg hover:scale-[1.02] border border-white/40 bg-white/30 backdrop-blur-sm
                         hover:bg-white/40"
              >
                <div className="relative aspect-video bg-gray-200">
                  <Image
                    src={rec.thumbnail}
                    alt={rec.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3 bg-white">
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
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
