"use client";

import { VideoDetails } from "@/types/youtube";
import { YouTubeService } from "@/lib/youtube";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with react-player
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-900 animate-pulse flex items-center justify-center">
      <div className="text-white">Loading player...</div>
    </div>
  ),
});

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
      <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-lg">
        <div className="text-center text-gray-500">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-gray-400"
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
          <p className="text-lg">Search for videos to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
        <ReactPlayer
          url={YouTubeService.getVideoUrl(video.id)}
          width="100%"
          height="100%"
          controls={true}
          playing={false}
        />
      </div>

      {/* Video Info */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
        <p className="text-gray-600 font-medium">{video.channelTitle}</p>
        <div className="pt-4 border-t border-gray-200">
          <p className="text-gray-700 whitespace-pre-wrap">
            {video.description}
          </p>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="pt-6 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            More from {video.channelTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => onRecommendationClick?.(rec)}
                className="cursor-pointer rounded-lg overflow-hidden transition-all duration-200
                         hover:shadow-lg hover:scale-[1.02] border border-gray-200
                         hover:border-gray-300"
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
