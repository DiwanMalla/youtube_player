'use client';

import { VideoDetails } from '@/types/youtube';
import Image from 'next/image';

interface VideoListProps {
  videos: VideoDetails[];
  onVideoSelect: (video: VideoDetails) => void;
  selectedVideoId?: string;
}

export default function VideoList({ videos, onVideoSelect, selectedVideoId }: VideoListProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600 dark:text-gray-400">
        <p className="text-lg">No videos found. Try searching for something!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Search Results</h2>
      {videos.map((video) => (
        <div
          key={video.id}
          onClick={() => onVideoSelect(video)}
          className={`cursor-pointer rounded-2xl overflow-hidden transition-all duration-300
                     hover:shadow-xl hover:scale-[1.02] border-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm
                     ${selectedVideoId === video.id 
                       ? 'border-purple-400 dark:border-purple-500 shadow-lg shadow-purple-200/50 dark:shadow-purple-500/50 bg-white/50 dark:bg-gray-800/50' 
                       : 'border-white/40 dark:border-gray-700/40 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-white/40 dark:hover:bg-gray-800/40'
                     }`}
        >
          <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority={false}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
              {video.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{video.channelTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
